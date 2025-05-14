
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupabaseAuthService {
  private supabase: SupabaseClient;

  constructor() {
    // Em produção, essas variáveis viriam do .env do servidor
    const supabaseUrl = process.env.SUPABASE_URL || 'https://xyzcompany.supabase.co';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'sua-chave-de-serviço';
    
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  async verificarToken(token: string) {
    try {
      const { data, error } = await this.supabase.auth.getUser(token);
      
      if (error) {
        throw new Error('Token inválido');
      }
      
      return data.user;
    } catch (error) {
      throw new Error('Erro ao verificar token');
    }
  }

  async obterPerfilUsuario(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        throw new Error('Erro ao buscar perfil do usuário');
      }
      
      return data;
    } catch (error) {
      throw new Error('Erro ao obter perfil do usuário');
    }
  }

  async criarUsuarioAcademia(userId: string, nome: string) {
    try {
      // Criar academia padrão
      const { data: academyData, error: academyError } = await this.supabase
        .from('academias')
        .insert([{ nome: 'Minha Academia' }])
        .select()
        .single();

      if (academyError) {
        throw new Error('Erro ao criar academia padrão');
      }

      // Criar perfil do usuário com a academia vinculada
      const { error: userError } = await this.supabase
        .from('usuarios')
        .insert([{
          id: userId,
          nome,
          role: 'Administrador',
          academy_id: academyData.id,
        }]);

      if (userError) {
        throw new Error('Erro ao criar perfil do usuário');
      }

      return {
        userId,
        academyId: academyData.id
      };
    } catch (error) {
      throw new Error('Erro ao criar usuário e academia');
    }
  }
}
