import { create } from "zustand"
import { supabase } from "../lib/supabase"
import { sync_user_data } from "../lib/api"
import type { User, Session } from "@supabase/supabase-js"

type AuthState = {
  user: User | null
  session: Session | null
  userName: string | null
  isLoading: boolean
  isAuthenticated: boolean
  initialize: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  userName: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    set({ isLoading: true })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    set({
      session,
      user: session?.user ?? null,
      userName: session?.user?.user_metadata?.userName ?? null,
      isAuthenticated: !!session,
      isLoading: false,
    })

    supabase.auth.onAuthStateChange((event, session) => {
      set({
        session,
        user: session?.user ?? null,
        userName: session?.user?.user_metadata?.userName ?? null,
        isAuthenticated: !!session,
        isLoading: false,
      })

      if (event === "SIGNED_IN") {
        sync_user_data().catch(console.error)
      }
    })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({
      user: null,
      session: null,
      userName: null,
      isAuthenticated: false,
    })
  },
}))