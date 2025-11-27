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

          <!-- Success Message -->
          <div id="successMessage" class="hidden mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center space-x-2 text-green-800">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="font-medium">Project posted successfully!</span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex space-x-4">
            <button type="submit" class="btn btn-primary flex-1">
              Post Project
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
    const successMessage = document.getElementById('successMessage');
    
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const techStack = (formData.get('techStack') as string).split(',').map(t => t.trim());
      
      const newProject = {
        id: Date.now().toString(),
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        techStack,
        githubRepo: formData.get('githubRepo') as string || undefined,
        owner: {
          name: formData.get('ownerName') as string,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.get('ownerName')}`,
          githubUsername: formData.get('githubUsername') as string,
          country: formData.get('country') as string,
        },
        createdAt: new Date().toISOString()
      };
      
      // In a real app, this would POST to an API
      console.log('New project:', newProject);
      
      // Show success message
      successMessage?.classList.remove('hidden');
      form.reset();
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 2000);
    });
  }, 0);
  
  return container;
}
