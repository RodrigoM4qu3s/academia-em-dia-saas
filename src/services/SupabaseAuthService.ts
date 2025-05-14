
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseAuthService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
    const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';
    
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  async verificarToken(token: string): Promise<any> {
    try {
      // Verificar o JWT com o Supabase
      const { data, error } = await this.supabase.auth.getUser(token);
      
      if (error) {
        throw new Error('Token inválido');
      }
      
      // Retorna o usuário se o token for válido
      return data.user;
    } catch (error) {
      throw new Error('Erro ao verificar token');
    }
  }

  async obterPerfilUsuario(userId: string): Promise<any> {
    try {
      // Buscar os dados do perfil do usuário
      const { data, error } = await this.supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw new Error('Erro ao buscar perfil');
      }
      
      return data;
    } catch (error) {
      throw new Error('Erro ao obter perfil do usuário');
    }
  }

  async atualizarPerfilUsuario(userId: string, dados: any): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from('usuarios')
        .update(dados)
        .eq('id', userId)
        .select()
        .single();
        
      if (error) {
        throw new Error('Erro ao atualizar perfil');
      }
      
      return data;
    } catch (error) {
      throw new Error('Erro ao atualizar perfil do usuário');
    }
  }
}
