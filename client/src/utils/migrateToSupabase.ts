// Migration utility to test Supabase integration
// Run this in browser console after setting up Supabase

import { ProjectService } from '../services/projectService'
import { UserService } from '../services/userService'
import { sampleProjects } from '../data/sampleProjects'
import { sampleUsers } from '../data/sampleUsers'

export async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...')
  
  try {
    // Test fetching projects
    const projects = await ProjectService.getAllProjects()
    console.log('✅ Projects fetched:', projects.length)
    
    // Test fetching users
    const users = await UserService.getAllUsers()
    console.log('✅ Users fetched:', users.length)
    
    // Test search
    const searchResults = await ProjectService.searchProjects('AI')
    console.log('✅ Search works:', searchResults.length, 'AI projects found')
    
    console.log('🎉 Supabase connection successful!')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return false
  }
}

export async function compareDataSources() {
  console.log('📊 Comparing mock data vs Supabase data...')
  
  try {
    // Get data from both sources
    const supabaseProjects = await ProjectService.getAllProjects()
    const supabaseUsers = await UserService.getAllUsers()
    
    console.log('Mock Projects:', sampleProjects.length)
    console.log('Supabase Projects:', supabaseProjects.length)
    console.log('Mock Users:', sampleUsers.length)
    console.log('Supabase Users:', supabaseUsers.length)
    
    // Show first project from each source
    if (sampleProjects.length > 0) {
      console.log('First Mock Project:', sampleProjects[0].title)
    }
    if (supabaseProjects.length > 0) {
      console.log('First Supabase Project:', supabaseProjects[0].title)
    }
    
    return {
      mockProjects: sampleProjects.length,
      supabaseProjects: supabaseProjects.length,
      mockUsers: sampleUsers.length,
      supabaseUsers: supabaseUsers.length
    }
  } catch (error) {
    console.error('❌ Comparison failed:', error)
    return null
  }
}

// Global functions for testing
(window as any).testSupabase = testSupabaseConnection
// (window as any).compareData = compareDataSources