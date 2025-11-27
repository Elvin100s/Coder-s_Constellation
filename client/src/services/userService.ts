import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type User = Database['public']['Tables']['users']['Row']
type UserInsert = Database['public']['Tables']['users']['Insert']

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('joined_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch users:', error)
      return []
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Failed to fetch user:', error)
      return null
    }
  }

  static async getUserByGithubUsername(username: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('github_username', username)
        .single()

      if (error) {
        console.error('Error fetching user by GitHub username:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Failed to fetch user by GitHub username:', error)
      return null
    }
  }

  static async searchUsers(query: string): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .or(`name.ilike.%${query}%,bio.ilike.%${query}%,country.ilike.%${query}%`)
        .order('joined_at', { ascending: false })

      if (error) {
        console.error('Error searching users:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to search users:', error)
      return []
    }
  }

  static async getUsersByCountry(country: string): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('country', country)
        .order('joined_at', { ascending: false })

      if (error) {
        console.error('Error fetching users by country:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch users by country:', error)
      return []
    }
  }

  static async getUsersBySkill(skill: string): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .contains('skills', [skill])
        .order('joined_at', { ascending: false })

      if (error) {
        console.error('Error fetching users by skill:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch users by skill:', error)
      return []
    }
  }

  static async getActiveUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('is_active', true)
        .order('joined_at', { ascending: false })

      if (error) {
        console.error('Error fetching active users:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch active users:', error)
      return []
    }
  }

  static async createUser(user: UserInsert): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single()

      if (error) {
        console.error('Error creating user:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to create user:', error)
      return null
    }
  }

  static async updateUser(id: string, updates: Partial<UserInsert>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to update user:', error)
      return null
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting user:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Failed to delete user:', error)
      return false
    }
  }

  // Convert Supabase user to frontend format
  static convertToFrontendFormat(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      githubUsername: user.github_username,
      avatar: user.avatar,
      country: user.country,
      bio: user.bio,
      skills: user.skills,
      joinedAt: user.joined_at,
      projectsCount: user.projects_count,
      isActive: user.is_active
    }
  }
}