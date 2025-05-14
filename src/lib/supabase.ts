
import { createClient } from '@supabase/supabase-js';

export type Usuario = {
  id: string;
  nome: string;
  role: string;
  academy_id: string;
  created_at: string;
};

// Valores padrão para desenvolvimento
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodWh5dHNweGh0bHZuY3drbmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODE1NDcsImV4cCI6MjAyNDk1NzU0N30.1A4LRp_XRZvHeZOX0nPLMVrqlIIaPm9KM_c0s-Q-nKQ';

// Aviso no console para ambiente de desenvolvimento
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('AVISO: Variáveis de ambiente VITE_SUPABASE_URL e/ou VITE_SUPABASE_ANON_KEY não encontradas. Utilizando valores padrão para desenvolvimento.');
  console.warn('Para usar o Supabase em produção, você precisará definir essas variáveis adequadamente.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
