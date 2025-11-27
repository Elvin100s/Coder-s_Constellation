import { sampleProjects } from '../data/sampleProjects';
import { renderProjectCard } from '../components/ProjectCard';
import { ProjectService } from '../services/projectService';

// Load projects from Supabase with fallback to sample data

export function renderDashboard(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-dark-900';
  
  const content = document.createElement('div');
  content.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8';
  
  content.innerHTML = `
    <div class="mb-8">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-2">Discover Projects</h1>
      <p class="text-gray-300">Find your next collaboration opportunity across Africa</p>
      <div id="resultsCounter" class="text-sm text-neon-blue mt-2"></div>
    </div>

    <!-- Search and Filter -->
    <div class="mb-8">
      <div class="flex flex-col gap-4">
        <!-- Search Bar -->
        <div class="flex-1 relative">
          <div class="relative">
            <input 
              type="text" 
              id="searchInput"
              placeholder="Search by project name, description, or owner..." 
              class="input pl-10"
              autocomplete="off"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div id="searchSuggestions" class="absolute top-full left-0 right-0 bg-dark-700 border border-dark-600 rounded-lg mt-1 shadow-lg z-50 hidden max-h-60 overflow-y-auto"></div>
        </div>
        
        <!-- Filter Row -->
        <div class="flex flex-col md:flex-row gap-4">
          <select id="techFilter" class="input md:w-48">
            <option value="">All Technologies</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Node.js">Node.js</option>
            <option value="Flutter">Flutter</option>
            <option value="Django">Django</option>
            <option value="React Native">React Native</option>
            <option value="Vue.js">Vue.js</option>
            <option value="Angular">Angular</option>
            <option value="Solidity">Solidity</option>
            <option value="Go">Go</option>
            <option value="Rust">Rust</option>
            <option value="Unity">Unity</option>
            <option value="TensorFlow">TensorFlow</option>
            <option value="Firebase">Firebase</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="MongoDB">MongoDB</option>
          </select>
          
          <select id="countryFilter" class="input md:w-48">
            <option value="">All Countries</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Kenya">Kenya</option>
            <option value="Ghana">Ghana</option>
            <option value="South Africa">South Africa</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Egypt">Egypt</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Senegal">Senegal</option>
            <option value="Mali">Mali</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
            <option value="Botswana">Botswana</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Ivory Coast">Ivory Coast</option>
          </select>
          
          <select id="categoryFilter" class="input md:w-48">
            <option value="">All Categories</option>
            <option value="AI/ML">AI & Machine Learning</option>
            <option value="Web">Web Development</option>
            <option value="Mobile">Mobile Apps</option>
            <option value="Blockchain">Blockchain & Crypto</option>
            <option value="IoT">IoT & Hardware</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Fintech">Fintech</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Social">Social Impact</option>
            <option value="Gaming">Gaming & VR</option>
            <option value="API">APIs & Tools</option>
          </select>
          
          <select id="sortFilter" class="input md:w-48">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">A-Z</option>
            <option value="most-viewed">Most Viewed</option>
          </select>
          
          <button id="clearAllFilters" class="btn btn-secondary whitespace-nowrap">
            Clear All
          </button>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <div id="projectsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Projects will be inserted here -->
    </div>

    <!-- Empty State -->
    <div id="emptyState" class="hidden text-center py-16">
      <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-semibold text-white mb-2">No projects found</h3>
      <p class="text-gray-400 mb-6">Try adjusting your search or filters</p>
      <button id="clearFilters" class="btn btn-primary">Clear Filters</button>
    </div>
    

  `;
  
  container.appendChild(content);
  
  // Load and render projects after DOM is ready
  requestAnimationFrame(() => {
    setTimeout(async () => {
      console.log('Dashboard DOM ready, loading projects...');
      await loadAndRenderProjects();
      setupFilters();
    }, 50);
  });
  
  return container;
}

// Global variable to store current projects
let currentProjects: any[] = [];

// Export function to refresh projects (useful after creating new projects)
export async function refreshProjects() {
  await loadAndRenderProjects();
}

// Debug function to check project count
(window as any).checkProjectCount = () => {
  console.log('=== PROJECT COUNT DEBUG ===');
  console.log('Sample projects:', sampleProjects.length);
  console.log('Current projects:', currentProjects.length);
  console.log('Projects in grid:', document.getElementById('projectsGrid')?.children.length || 0);
  return {
    sampleCount: sampleProjects.length,
    currentCount: currentProjects.length,
    renderedCount: document.getElementById('projectsGrid')?.children.length || 0
  };
};

// Load projects - prioritize sample data for demo, with Supabase integration for new projects
async function loadAndRenderProjects() {
  try {
    console.log('Loading projects...');
    
    // Start with sample projects for demo
    currentProjects = [...sampleProjects];
    
    // Try to load additional projects from Supabase and merge them
    try {
      const supabaseProjects = await ProjectService.getAllProjects();
      
      if (supabaseProjects && supabaseProjects.length > 0) {
        console.log('Found', supabaseProjects.length, 'additional projects from Supabase');
        // Convert Supabase format to frontend format
        const formattedSupabaseProjects = supabaseProjects.map(project => ProjectService.convertToFrontendFormat(project));
        
        // Add Supabase projects to the beginning (newest first)
        currentProjects = [...formattedSupabaseProjects, ...sampleProjects];
        console.log('Total projects:', currentProjects.length);
      } else {
        console.log('No additional projects in Supabase, using sample data only');
      }
    } catch (supabaseError) {
      console.log('Supabase not available, using sample data only:', supabaseError);
    }
    
    renderProjects(currentProjects);
  } catch (error) {
    console.error('Error loading projects:', error);
    // Final fallback to sample data
    currentProjects = [...sampleProjects];
    renderProjects(currentProjects);
  }
}

function renderProjects(projects: any[]) {
  console.log('renderProjects called with', projects.length, 'projects');
  
  const grid = document.getElementById('projectsGrid');
  const emptyState = document.getElementById('emptyState');
  const resultsCounter = document.getElementById('resultsCounter');
  
  console.log('Grid element:', grid);
  console.log('EmptyState element:', emptyState);
  
  if (!grid || !emptyState) {
    console.error('Required DOM elements not found!');
    return;
  }
  
  grid.innerHTML = '';
  
  // Update results counter
  if (resultsCounter) {
    if (projects.length === currentProjects.length) {
      resultsCounter.textContent = `Showing all ${projects.length} projects`;
    } else {
      resultsCounter.textContent = `Found ${projects.length} of ${currentProjects.length} projects`;
    }
  }
  
  if (projects.length === 0) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    projects.forEach(project => {
      grid.appendChild(renderProjectCard(project));
    });
    
    console.log('Successfully rendered', projects.length, 'project cards');
  }
}

function setupFilters() {
  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  const searchSuggestions = document.getElementById('searchSuggestions') as HTMLElement;
  const techFilter = document.getElementById('techFilter') as HTMLSelectElement;
  const countryFilter = document.getElementById('countryFilter') as HTMLSelectElement;
  const categoryFilter = document.getElementById('categoryFilter') as HTMLSelectElement;
  const sortFilter = document.getElementById('sortFilter') as HTMLSelectElement;
  const clearAllFiltersBtn = document.getElementById('clearAllFilters');
  const clearFiltersBtn = document.getElementById('clearFilters');
  
  // Search suggestions data
  const searchTerms = [
    'AI', 'Machine Learning', 'React', 'Vue', 'Angular', 'Python', 'JavaScript',
    'Mobile', 'Web', 'Blockchain', 'Healthcare', 'Education', 'Fintech',
    'Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Rwanda', 'Ethiopia'
  ];
  
  let searchHistory: string[] = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  
  // Map projects to categories
  const getProjectCategory = (project: any): string => {
    const title = project.title.toLowerCase();
    const description = project.description.toLowerCase();
    const techStack = project.techStack.join(' ').toLowerCase();
    
    if (title.includes('ai') || title.includes('ml') || description.includes('machine learning') || description.includes('artificial intelligence') || techStack.includes('tensorflow') || techStack.includes('pytorch')) return 'AI/ML';
    if (techStack.includes('react') || techStack.includes('vue') || techStack.includes('angular') || techStack.includes('next.js') || techStack.includes('django') || techStack.includes('laravel')) return 'Web';
    if (techStack.includes('react native') || techStack.includes('flutter') || title.includes('mobile') || title.includes('app')) return 'Mobile';
    if (techStack.includes('solidity') || techStack.includes('ethereum') || techStack.includes('blockchain') || title.includes('blockchain') || title.includes('crypto')) return 'Blockchain';
    if (techStack.includes('iot') || techStack.includes('arduino') || title.includes('iot') || title.includes('sensor')) return 'IoT';
    if (title.includes('health') || title.includes('medical') || title.includes('telemedicine')) return 'Healthcare';
    if (title.includes('education') || title.includes('learning') || title.includes('school') || title.includes('bootcamp')) return 'Education';
    if (title.includes('payment') || title.includes('money') || title.includes('lending') || title.includes('fintech')) return 'Fintech';
    if (title.includes('agriculture') || title.includes('farm') || title.includes('crop')) return 'Agriculture';
    if (title.includes('social') || title.includes('community') || description.includes('social impact')) return 'Social';
    if (techStack.includes('unity') || title.includes('game') || title.includes('vr') || title.includes('gaming')) return 'Gaming';
    if (title.includes('api') || title.includes('tool') || description.includes('api')) return 'API';
    return 'Web';
  };
  
  // Search suggestions functionality
  function showSearchSuggestions(query: string) {
    if (!query.trim()) {
      searchSuggestions.innerHTML = `
        <div class="p-3">
          <div class="text-xs text-gray-400 mb-2">Recent Searches</div>
          ${searchHistory.slice(0, 5).map(term => `
            <div class="px-3 py-2 hover:bg-dark-600 rounded cursor-pointer text-sm text-white search-suggestion" data-term="${term}">
              <span class="text-gray-400">🕒</span> ${term}
            </div>
          `).join('')}
          ${searchHistory.length === 0 ? '<div class="text-gray-500 text-sm px-3">No recent searches</div>' : ''}
        </div>
      `;
    } else {
      const suggestions = searchTerms.filter(term => 
        term.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      
      searchSuggestions.innerHTML = `
        <div class="p-3">
          <div class="text-xs text-gray-400 mb-2">Suggestions</div>
          ${suggestions.map(term => `
            <div class="px-3 py-2 hover:bg-dark-600 rounded cursor-pointer text-sm text-white search-suggestion" data-term="${term}">
              <span class="text-neon-blue">🔍</span> ${term}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Add click handlers for suggestions
    searchSuggestions.querySelectorAll('.search-suggestion').forEach(suggestion => {
      suggestion.addEventListener('click', () => {
        const term = suggestion.getAttribute('data-term') || '';
        searchInput.value = term;
        addToSearchHistory(term);
        searchSuggestions.classList.add('hidden');
        applyFilters();
      });
    });
    
    searchSuggestions.classList.remove('hidden');
  }
  
  function addToSearchHistory(term: string) {
    if (term && !searchHistory.includes(term)) {
      searchHistory.unshift(term);
      searchHistory = searchHistory.slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }
  
  function applyFilters() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const selectedTech = techFilter?.value || '';
    const selectedCountry = countryFilter?.value || '';
    const selectedCategory = categoryFilter?.value || '';
    const selectedSort = sortFilter?.value || 'newest';
    
    let filtered = [...currentProjects];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.owner.name.toLowerCase().includes(searchTerm) ||
        project.owner.country.toLowerCase().includes(searchTerm) ||
        project.techStack.some((tech: string) => tech.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply technology filter
    if (selectedTech) {
      filtered = filtered.filter(project =>
        project.techStack.includes(selectedTech)
      );
    }
    
    // Apply country filter
    if (selectedCountry) {
      filtered = filtered.filter(project =>
        project.owner.country === selectedCountry
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(project =>
        getProjectCategory(project) === selectedCategory
      );
    }
    
    // Apply sorting
    switch (selectedSort) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'most-viewed':
        filtered.sort(() => Math.random() - 0.5); // Simulate view-based sorting
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    renderProjects(filtered);
  }
  
  // Search input handlers
  searchInput?.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value;
    showSearchSuggestions(query);
    applyFilters();
  });
  
  searchInput?.addEventListener('focus', () => {
    showSearchSuggestions(searchInput.value);
  });
  
  searchInput?.addEventListener('blur', () => {
    setTimeout(() => searchSuggestions.classList.add('hidden'), 200);
  });
  
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const term = searchInput.value.trim();
      if (term) addToSearchHistory(term);
      searchSuggestions.classList.add('hidden');
    }
  });
  
  // Filter event listeners
  techFilter?.addEventListener('change', applyFilters);
  countryFilter?.addEventListener('change', applyFilters);
  categoryFilter?.addEventListener('change', applyFilters);
  sortFilter?.addEventListener('change', applyFilters);
  
  // Clear all filters
  const clearAllFilters = () => {
    if (searchInput) searchInput.value = '';
    if (techFilter) techFilter.value = '';
    if (countryFilter) countryFilter.value = '';
    if (categoryFilter) categoryFilter.value = '';
    renderProjects(currentProjects);
  };
  
  clearAllFiltersBtn?.addEventListener('click', clearAllFilters);
  clearFiltersBtn?.addEventListener('click', clearAllFilters);
}
