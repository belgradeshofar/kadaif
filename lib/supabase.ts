import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL ili KEY nije definisan u .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
