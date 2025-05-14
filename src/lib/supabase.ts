
import { createClient } from "@supabase/supabase-js";

// Define the Usuario type for use throughout the application
export type Usuario = {
  id: string;
  nome: string;
  role: string;
  academy_id?: string;
  created_at?: string;
};

// Verify if the environment variables are provided, if not provide default values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "example-anon-key";

// Show warning in console for development
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("Variáveis de ambiente Supabase não configuradas. Usando valores padrão para desenvolvimento.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
