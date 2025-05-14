
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, Usuario } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  usuario: Usuario | null;
  isLoading: boolean;
  signUp: (email: string, password: string, nome: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Obter a sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (session?.user) {
        fetchUsuarioProfile(session.user.id);
      }
    });

    // Escutar alterações de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        if (session?.user) {
          fetchUsuarioProfile(session.user.id);
        } else {
          setUsuario(null);
        }
      }
    );

    // Limpeza ao desmontar
    return () => subscription.unsubscribe();
  }, []);

  const fetchUsuarioProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        return;
      }

      setUsuario(data as Usuario);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
    }
  };

  const createDefaultAcademy = async (userId: string) => {
    try {
      // Criar uma academia padrão para o novo usuário
      const { data: academyData, error: academyError } = await supabase
        .from('academias')
        .insert([{ nome: 'Minha Academia' }])
        .select()
        .single();

      if (academyError) {
        console.error('Erro ao criar academia padrão:', academyError);
        return null;
      }

      // Atualizar o perfil do usuário com o ID da academia
      if (academyData?.id) {
        const { error: updateError } = await supabase
          .from('usuarios')
          .update({ academy_id: academyData.id })
          .eq('id', userId);

        if (updateError) {
          console.error('Erro ao atualizar perfil do usuário:', updateError);
          return null;
        }

        return academyData.id;
      }
    } catch (error) {
      console.error('Erro ao criar academia padrão:', error);
      return null;
    }
  };

  const signUp = async (email: string, password: string, nome: string) => {
    try {
      setIsLoading(true);
      
      // Registrar o usuário na autenticação do Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Erro ao criar usuário');
      }

      // Criar perfil do usuário
      const { error: profileError } = await supabase
        .from('usuarios')
        .insert([
          {
            id: data.user.id,
            nome,
            role: 'Administrador',
          }
        ]);

      if (profileError) {
        throw new Error(profileError.message);
      }

      // Criar academia padrão e associar ao usuário
      await createDefaultAcademy(data.user.id);

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu e-mail para confirmar o cadastro!",
      });
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Credenciais inválidas');
      }

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast({
        title: "Erro no login",
        description: error.message === 'Invalid login credentials' 
          ? 'Credenciais inválidas' 
          : error.message || "Ocorreu um erro ao fazer login.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Sessão encerrada",
        description: "Você saiu da sua conta com sucesso.",
      });
    } catch (error: any) {
      console.error('Erro ao sair:', error);
      toast({
        title: "Erro ao sair",
        description: error.message || "Ocorreu um erro ao sair da sua conta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        user, 
        usuario,
        isLoading, 
        signUp, 
        signIn, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
