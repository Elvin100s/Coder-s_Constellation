import { createClient } from '@supabase/supabase-js'

// These will be your actual Supabase credentials
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          tech_stack: string[]
          github_repo: string | null
          owner_name: string
          owner_avatar: string
          owner_github_username: string
          owner_country: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          tech_stack: string[]
          github_repo?: string | null
          owner_name: string
          owner_avatar: string
          owner_github_username: string
          owner_country: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          tech_stack?: string[]
          github_repo?: string | null
          owner_name?: string
          owner_avatar?: string
          owner_github_username?: string
          owner_country?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string
          email: string
          github_username: string
          avatar: string
          country: string
          bio: string
          skills: string[]
          joined_at: string
          projects_count: number
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          github_username: string
          avatar: string
          country: string
          bio: string
          skills: string[]
          joined_at?: string
          projects_count?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          github_username?: string
          avatar?: string
          country?: string
          bio?: string
          skills?: string[]
          joined_at?: string
          projects_count?: number
          is_active?: boolean
        }
      }
    }
  }
}