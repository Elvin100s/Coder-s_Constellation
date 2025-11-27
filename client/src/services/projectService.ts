import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']

export class ProjectService {
  static async getAllProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      return []
    }
  }

  static async getProjectById(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching project:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Failed to fetch project:', error)
      return null
    }
  }

  static async searchProjects(query: string): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,owner_name.ilike.%${query}%`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error searching projects:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to search projects:', error)
      return []
    }
  }

  static async getProjectsByCountry(country: string): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_country', country)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects by country:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch projects by country:', error)
      return []
    }
  }

  static async getProjectsByTech(tech: string): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .contains('tech_stack', [tech])
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects by tech:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch projects by tech:', error)
      return []
    }
  }

  static async createProject(project: ProjectInsert): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single()

      if (error) {
        console.error('Error creating project:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to create project:', error)
      return null
    }
  }

  static async updateProject(id: string, updates: Partial<ProjectInsert>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating project:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to update project:', error)
      return null
    }
  }

  static async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting project:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Failed to delete project:', error)
      return false
    }
  }

  // Convert Supabase project to frontend format
  static convertToFrontendFormat(project: Project) {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      techStack: project.tech_stack,
      githubRepo: project.github_repo,
      owner: {
        name: project.owner_name,
        avatar: project.owner_avatar,
        githubUsername: project.owner_github_username,
        country: project.owner_country
      },
      createdAt: project.created_at
    }
  }
}