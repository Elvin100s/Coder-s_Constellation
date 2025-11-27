import { sampleProjects } from '../data/sampleProjects';
import { renderProjectCard } from '../components/ProjectCard';

// Using sample projects instead of database

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
          
          <button id="advancedFilters" class="btn btn-ghost whitespace-nowrap">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Advanced
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
    
    <!-- Advanced Filters Modal -->
    <div id="advancedFiltersModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden">
      <div class="bg-dark-800 rounded-xl p-6 max-w-2xl w-full mx-4 border border-neon-blue/20 max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">Advanced Filters</h3>
          <button id="closeAdvancedFilters" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Date Range -->
          <div>
            <label class="block text-sm font-medium text-neon-blue mb-2">Date Range</label>
            <select id="dateRangeFilter" class="input">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">Last 3 Months</option>
            </select>
          </div>
          
          <!-- Project Complexity -->
          <div>
            <label class="block text-sm font-medium text-neon-blue mb-2">Project Complexity</label>
            <select id="complexityFilter" class="input">
              <option value="">Any Complexity</option>
              <option value="beginner">Beginner Friendly</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <!-- Team Size -->
          <div>
            <label class="block text-sm font-medium text-neon-blue mb-2">Looking For</label>
            <select id="teamSizeFilter" class="input">
              <option value="">Any Team Size</option>
              <option value="solo">Solo Developer</option>
              <option value="small">Small Team (2-3)</option>
              <option value="large">Large Team (4+)</option>
            </select>
          </div>
          
          <!-- Has GitHub Repo -->
          <div>
            <label class="block text-sm font-medium text-neon-blue mb-2">Repository</label>
            <select id="repoFilter" class="input">
              <option value="">Any</option>
              <option value="has-repo">Has GitHub Repo</option>
              <option value="no-repo">No Repo Yet</option>
            </select>
          </div>
        </div>
        
        <div class="flex space-x-3 mt-6">
          <button id="applyAdvancedFilters" class="btn btn-primary flex-1">
            Apply Filters
          </button>
          <button id="resetAdvancedFilters" class="btn btn-secondary">
            Reset
          </button>
        </div>
      </div>
    </div>
  `;
  
  container.appendChild(content);
  
  // Render projects after DOM is ready
  requestAnimationFrame(() => {
    setTimeout(() => {
      console.log('Dashboard DOM ready, rendering projects...');
      // Using sample projects
      renderProjects(sampleProjects);
      setupFilters();
    }, 50);
  });
  
  return container;
}

// Using sample projects from frontend data

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
    if (projects.length === sampleProjects.length) {
      resultsCounter.textContent = `Showing all ${projects.length} projects`;
    } else {
      resultsCounter.textContent = `Found ${projects.length} of ${sampleProjects.length} projects`;
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
  const advancedFiltersBtn = document.getElementById('advancedFilters');
  const advancedFiltersModal = document.getElementById('advancedFiltersModal');
  const closeAdvancedFiltersBtn = document.getElementById('closeAdvancedFilters');
  const applyAdvancedFiltersBtn = document.getElementById('applyAdvancedFilters');
  const resetAdvancedFiltersBtn = document.getElementById('resetAdvancedFilters');
  
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
    
    let filtered = [...sampleProjects];
    
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
    renderProjects(sampleProjects);
  };
  
  // Advanced filters modal handlers
  advancedFiltersBtn?.addEventListener('click', () => {
    advancedFiltersModal?.classList.remove('hidden');
  });
  
  closeAdvancedFiltersBtn?.addEventListener('click', () => {
    advancedFiltersModal?.classList.add('hidden');
  });
  
  applyAdvancedFiltersBtn?.addEventListener('click', () => {
    // Apply advanced filters logic here
    advancedFiltersModal?.classList.add('hidden');
    applyFilters();
  });
  
  resetAdvancedFiltersBtn?.addEventListener('click', () => {
    // Reset advanced filters
    const advancedInputs = advancedFiltersModal?.querySelectorAll('select');
    advancedInputs?.forEach(input => input.value = '');
  });
  
  clearAllFiltersBtn?.addEventListener('click', clearAllFilters);
  clearFiltersBtn?.addEventListener('click', clearAllFilters);
}
