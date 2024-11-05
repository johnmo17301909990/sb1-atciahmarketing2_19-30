import { createClient } from '@supabase/supabase-js';

// 使用模拟凭据以便开发
const supabaseUrl = 'https://mock.supabase.co';
const supabaseAnonKey = 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);