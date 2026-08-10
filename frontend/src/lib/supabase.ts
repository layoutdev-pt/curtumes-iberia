import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As variáveis de ambiente do Supabase estão em falta.');
}

// Cria a instância do cliente para comunicarmos com a Base de Dados e a Autenticação
export const supabase = createClient(supabaseUrl, supabaseAnonKey);