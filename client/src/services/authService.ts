import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  name?: string
  avatar_url?: string
  github_username?: string
}

export class AuthService {


  // Sign in with GitHub
  static async signInWithGitHub(): Promise<{ error: any }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })

      if (error) {
        console.error('GitHub sign in error:', error)
        return { error }
      }

      return { error: null }
    } catch (error) {
      console.error('GitHub sign in failed:', error)
      return { error }
    }
  }

  // Sign out
  static async signOut(): Promise<{ error: any }> {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        return { error }
      }

      return { error: null }
    } catch (error) {
      console.error('Sign out failed:', error)
      return { error }
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Get current user failed:', error)
      return null
    }
  }

  // Get current session
  static async getCurrentSession(): Promise<Session | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    } catch (error) {
      console.error('Get current session failed:', error)
      return null
    }
  }

  // Listen to auth changes
  static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }

  // Convert Supabase user to our format
  static formatUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.full_name || user.user_metadata?.name || user.user_metadata?.user_name || 'Developer',
      avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      github_username: user.user_metadata?.user_name || user.user_metadata?.preferred_username || 'developer'
    }
  }
}