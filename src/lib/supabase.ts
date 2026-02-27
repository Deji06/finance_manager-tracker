// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Optional but strongly recommended: runtime check
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Most React apps keep these as true (default) unless you have a very specific reason
    autoRefreshToken: true,     // Automatically refresh JWT before it expires (recommended)
    persistSession: true,       // Store session in localStorage so user stays logged in after refresh/close
    // storage: localStorage,   // explicit (default anyway)
    // detectSessionInUrl: true, // for OAuth flows (default)
  },
});

export type { Session, User } from '@supabase/supabase-js';