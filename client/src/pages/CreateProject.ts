// import { ProjectService } from '../services/projectService'
// import { supabase } from '../lib/supabase'
import { showToast } from '../components/Toast'

export function renderCreateProject(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-dark-900';
  
  container.innerHTML = `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-2">Post a New Project</h1>
        <p class="text-gray-300">Share your project idea and find collaborators across Africa</p>
      </div>

      <div class="card p-8">
        <form id="createProjectForm">
          <!-- Project Title -->
          <div class="mb-6">
            <label for="title" class="block text-sm font-medium text-neon-blue mb-2">
              Project Title *
            </label>
            <input 
              type="text" 
              id="title" 
              name="title"
              required
              placeholder="e.g., AI-Powered Agriculture Platform"
              class="input"
            />
          </div>

          <!-- Description -->
          <div class="mb-6">
            <label for="description" class="block text-sm font-medium text-neon-blue mb-2">
              Description *
            </label>
            <textarea 
              id="description" 
              name="description"
              required
              rows="5"
              placeholder="Describe your project, what you're building, and what kind of collaborators you need..."
              class="input resize-none"
            ></textarea>
            <p class="text-sm text-gray-400 mt-1">Be specific about skills, roles, and time commitment</p>
          </div>

          <!-- Tech Stack -->
          <div class="mb-6">
            <label for="techStack" class="block text-sm font-medium text-neon-blue mb-2">
              Tech Stack *
            </label>
            <input 
              type="text" 
              id="techStack" 
              name="techStack"
              required
              placeholder="e.g., React, Node.js, PostgreSQL, Docker"
              class="input"
            />
            <p class="text-sm text-gray-400 mt-1">Separate technologies with commas</p>
          </div>

          <!-- GitHub Repository (Optional) -->
          <div class="mb-6">
            <label for="githubRepo" class="block text-sm font-medium text-neon-blue mb-2">
              GitHub Repository (Optional)
            </label>
            <input 
              type="url" 
              id="githubRepo" 
              name="githubRepo"
              placeholder="https://github.com/username/repo"
              class="input"
            />
            <p class="text-sm text-gray-400 mt-1">Link to your project repository if available</p>
          </div>

          <!-- Owner Info -->
          <div class="mb-6">
            <label for="ownerName" class="block text-sm font-medium text-neon-blue mb-2">
              Your Name *
            </label>
            <input 
              type="text" 
              id="ownerName" 
              name="ownerName"
              required
              placeholder="e.g., Elvin Cyubahiro"
              class="input"
            />
          </div>

          <div class="mb-6">
            <label for="githubUsername" class="block text-sm font-medium text-neon-blue mb-2">
              GitHub Username *
            </label>
            <input 
              type="text" 
              id="githubUsername" 
              name="githubUsername"
              required
              placeholder="e.g., elvincyubahiro"
              class="input"
            />
          </div>

          <div class="mb-8">
            <label for="country" class="block text-sm font-medium text-neon-blue mb-2">
              Country *
            </label>
            <select id="country" name="country" required class="input">
              <option value="">Select your country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
              <option value="Ghana">Ghana</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Uganda">Uganda</option>
              <option value="Senegal">Senegal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Error Message -->
          <div id="errorMessage" class="hidden mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div class="flex items-center space-x-2 text-red-400">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span class="font-medium" id="errorText">An error occurred</span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex space-x-4">
            <button type="submit" id="submitButton" class="btn btn-primary flex-1">
              <span id="submitText">Post Project</span>
              <div id="submitSpinner" class="hidden ml-2">
                <div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              </div>
            </button>
            <a href="/" data-link class="btn btn-secondary">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  `;
  
  // Setup form submission
  setTimeout(() => {
    const form = document.getElementById('createProjectForm') as HTMLFormElement;
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Hide any previous error messages
      errorMessage?.classList.add('hidden');
      
      // Temporarily disable authentication for demo
      // const { data: { user } } = await supabase.auth.getUser();
      // if (!user) {
      //   showToast('Please log in to post a project', 'error');
      //   return;
      // }
      
      // Show loading state
      submitButton.disabled = true;
      submitText!.textContent = 'Posting...';
      submitSpinner?.classList.remove('hidden');
      
      try {
        const formData = new FormData(form);
        const techStack = (formData.get('techStack') as string).split(',').map(t => t.trim());
        
        const projectData = {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          tech_stack: techStack,
          github_repo: (formData.get('githubRepo') as string) || null,
          owner_name: formData.get('ownerName') as string,
          owner_github_username: formData.get('githubUsername') as string,
          owner_country: formData.get('country') as string,
          owner_avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.get('ownerName')}`
        };
        
        // For demo: just show success message (no database save)
        console.log('Project data:', projectData);
        
        // Show success message
        showToast('Project posted successfully! (Demo mode)', 'success');
        
        // Reset form
        form.reset();
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 1500);
        
      } catch (error) {
        console.error('Error creating project:', error);
        
        // Show error message
        const errorMsg = error instanceof Error ? error.message : 'Failed to post project. Please try again.';
        errorText!.textContent = errorMsg;
        errorMessage?.classList.remove('hidden');
        showToast('Failed to post project', 'error');
        
      } finally {
        // Reset button state
        submitButton.disabled = false;
        submitText!.textContent = 'Post Project';
        submitSpinner?.classList.add('hidden');
      }
    });
  }, 0);
  
  return container;
}
