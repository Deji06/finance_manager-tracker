// src/store/authStore.ts
import { create } from "zustand"
import { supabase } from "../lib/supabase"
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

let authListenerInitialized = false

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  userName: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    // Prevent multiple initializations
    if (authListenerInitialized) return
    authListenerInitialized = true

    set({ isLoading: true })

    try {
      // 1️⃣ Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      let currentUser: User | null = session?.user ?? null
      let userName: string | null = null

      // 2️⃣ Get fresh user (ensures metadata is current)
      if (currentUser) {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) console.error("getUser failed:", error)

        currentUser = user ?? currentUser
        userName = user?.user_metadata?.userName ?? null
      }

      set({
        session,
        user: currentUser,
        userName,
        isAuthenticated: !!session,
        isLoading: false,
      })

      // 3️⃣ Set up auth state listener (ONLY ONCE)
      supabase.auth.onAuthStateChange(async (_event, session) => {
        let updatedUser: User | null = session?.user ?? null
        let updatedUserName: string | null = null

        if (updatedUser) {
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser()

          if (error)
            console.error("Auth change getUser failed:", error)

          updatedUser = user ?? updatedUser
          updatedUserName =
            user?.user_metadata?.userName ?? null
        }

        set({
          session,
          user: updatedUser,
          userName: updatedUserName,
          isAuthenticated: !!session,
          isLoading: false,
        })
      })
    } catch (err) {
      console.error("Auth initialization failed:", err)
      set({ isLoading: false })
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    localStorage.clear()

    set({
      user: null,
      session: null,
      userName: null,
      isAuthenticated: false,
    })
  },
}))