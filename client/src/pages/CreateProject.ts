import { ProjectService } from '../services/projectService'
import { supabase } from '../lib/supabase'
import { showToast } from '../components/Toast'

// Available technologies for selection
const availableTechnologies = [
  'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte',
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP',
  'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails',
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Vercel', 'Netlify',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV',
  'Solidity', 'Ethereum', 'Web3.js', 'Hardhat',
  'Unity', 'Unreal Engine', 'Godot',
  'Figma', 'Adobe XD', 'Sketch',
  'Git', 'GitHub', 'GitLab', 'Bitbucket',
  'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Chakra UI',
  'GraphQL', 'REST API', 'Socket.io', 'WebRTC',
  'Jest', 'Cypress', 'Selenium', 'Playwright'
];

function setupTechStackSelector() {
  const selector = document.getElementById('techStackSelector');
  const dropdown = document.getElementById('techStackDropdown');
  const placeholder = document.getElementById('techStackPlaceholder');
  const hiddenInput = document.getElementById('techStack') as HTMLInputElement;
  const searchInput = document.getElementById('techStackSearch') as HTMLInputElement;
  const optionsContainer = document.getElementById('techStackOptions');
  
  let selectedTechs: string[] = [];
  
  // Populate options
  function populateOptions(filter = '') {
    if (!optionsContainer) return;
    
    const filteredTechs = availableTechnologies.filter(tech => 
      tech.toLowerCase().includes(filter.toLowerCase()) && !selectedTechs.includes(tech)
    );
    
    optionsContainer.innerHTML = filteredTechs.map(tech => `
      <div class="px-3 py-2 hover:bg-dark-600 cursor-pointer text-white text-sm tech-option" data-tech="${tech}">
        ${tech}
      </div>
    `).join('');
    
    // Add click handlers
    optionsContainer.querySelectorAll('.tech-option').forEach(option => {
      option.addEventListener('click', () => {
        const tech = option.getAttribute('data-tech');
        if (tech) addTech(tech);
      });
    });
  }
  
  // Add technology
  function addTech(tech: string) {
    if (!selectedTechs.includes(tech)) {
      selectedTechs.push(tech);
      updateDisplay();
      populateOptions(searchInput?.value || '');
      if (searchInput) searchInput.value = '';
    }
  }
  
  // Remove technology
  function removeTech(tech: string) {
    selectedTechs = selectedTechs.filter(t => t !== tech);
    updateDisplay();
    populateOptions(searchInput?.value || '');
  }
  
  // Update display
  function updateDisplay() {
    if (!selector || !placeholder || !hiddenInput) return;
    
    if (selectedTechs.length === 0) {
      selector.innerHTML = '<span id="techStackPlaceholder" class="text-gray-400">Select technologies...</span>';
    } else {
      selector.innerHTML = selectedTechs.map(tech => `
        <span class="inline-flex items-center px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full">
          ${tech}
          <button type="button" class="ml-1 text-neon-blue/70 hover:text-neon-blue remove-tech" data-tech="${tech}">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      `).join('');
      
      // Add remove handlers
      selector.querySelectorAll('.remove-tech').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const tech = btn.getAttribute('data-tech');
          if (tech) removeTech(tech);
        });
      });
    }
    
    // Update hidden input
    hiddenInput.value = selectedTechs.join(',');
  }
  
  // Event listeners
  selector?.addEventListener('click', () => {
    dropdown?.classList.toggle('hidden');
    if (!dropdown?.classList.contains('hidden')) {
      populateOptions();
      searchInput?.focus();
    }
  });
  
  searchInput?.addEventListener('input', (e) => {
    const filter = (e.target as HTMLInputElement).value;
    populateOptions(filter);
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!selector?.contains(e.target as Node) && !dropdown?.contains(e.target as Node)) {
      dropdown?.classList.add('hidden');
    }
  });
  
  // Initial setup
  populateOptions();
}

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
            <label class="block text-sm font-medium text-neon-blue mb-2">
              Tech Stack * <span class="text-gray-400 text-xs">(Select multiple)</span>
            </label>
            <div class="relative">
              <div id="techStackSelector" class="input min-h-[42px] cursor-pointer flex flex-wrap gap-2 items-center">
                <span id="techStackPlaceholder" class="text-gray-400">Select technologies...</span>
              </div>
              <div id="techStackDropdown" class="absolute top-full left-0 right-0 bg-dark-700 border border-dark-600 rounded-lg mt-1 shadow-lg z-50 hidden max-h-60 overflow-y-auto">
                <div class="p-2">
                  <input type="text" id="techStackSearch" placeholder="Search technologies..." class="w-full px-3 py-2 bg-dark-800 border border-dark-600 rounded text-white text-sm focus:outline-none focus:border-neon-blue">
                </div>
                <div id="techStackOptions" class="max-h-48 overflow-y-auto">
                  <!-- Options will be populated by JavaScript -->
                </div>
              </div>
            </div>
            <input type="hidden" id="techStack" name="techStack" required />
            <p class="text-sm text-gray-400 mt-1">Choose the technologies your project uses</p>
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
    setupTechStackSelector();
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
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        showToast('Please log in to post a project', 'error');
        return;
      }
      
      // Show loading state
      submitButton.disabled = true;
      submitText!.textContent = 'Posting...';
      submitSpinner?.classList.remove('hidden');
      
      try {
        const formData = new FormData(form);
        const techStackValue = formData.get('techStack') as string;
        const techStack = techStackValue ? techStackValue.split(',').map(t => t.trim()).filter(t => t) : [];
        
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
        
        // Create project in database
        const result = await ProjectService.createProject(projectData);
        
        if (!result) {
          throw new Error('Failed to create project');
        }
        
        // Show success message
        showToast('Project posted successfully!', 'success');
        
        // Reset form
        form.reset();
        
        // Redirect to dashboard to see the new project
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
