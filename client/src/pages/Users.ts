import { sampleUsers } from '../data/sampleUsers';
import { renderUserCard } from '../components/UserCard';

export function renderUsers(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-dark-900';
  
  const content = document.createElement('div');
  content.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8';
  
  content.innerHTML = `
    <div class="mb-8">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-2">Developer Community</h1>
      <p class="text-gray-300">Connect with talented developers across Africa</p>
      <div id="userStats" class="text-sm text-neon-blue mt-2"></div>
    </div>

    <!-- Search and Filter -->
    <div class="mb-8">
      <div class="flex flex-col gap-4">
        <!-- Search Bar -->
        <div class="flex-1 relative">
          <div class="relative">
            <input 
              type="text" 
              id="userSearchInput"
              placeholder="Search developers by name, skills, or country..." 
              class="input pl-10"
              autocomplete="off"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <!-- Filter Row -->
        <div class="flex flex-col md:flex-row gap-4">
          <select id="skillFilter" class="input md:w-48">
            <option value="">All Skills</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="Node.js">Node.js</option>
            <option value="Flutter">Flutter</option>
            <option value="Django">Django</option>
            <option value="Vue.js">Vue.js</option>
            <option value="Angular">Angular</option>
            <option value="TensorFlow">TensorFlow</option>
            <option value="Solidity">Solidity</option>
          </select>
          
          <select id="userCountryFilter" class="input md:w-48">
            <option value="">All Countries</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Kenya">Kenya</option>
            <option value="Ghana">Ghana</option>
            <option value="South Africa">South Africa</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Senegal">Senegal</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Botswana">Botswana</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
          
          <select id="statusFilter" class="input md:w-48">
            <option value="">All Users</option>
            <option value="active">Online Users</option>
            <option value="inactive">Offline Users</option>
          </select>
          
          <select id="userSortFilter" class="input md:w-48">
            <option value="newest">Newest Members</option>
            <option value="oldest">Oldest Members</option>
            <option value="alphabetical">A-Z</option>
            <option value="most-projects">Most Projects</option>
          </select>
          
          <button id="clearUserFilters" class="btn btn-secondary whitespace-nowrap">
            Clear All
          </button>
        </div>
      </div>
    </div>

    <!-- Users Grid -->
    <div id="usersGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Users will be inserted here -->
    </div>

    <!-- Empty State -->
    <div id="userEmptyState" class="hidden text-center py-16">
      <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 class="text-xl font-semibold text-white mb-2">No developers found</h3>
      <p class="text-gray-400 mb-6">Try adjusting your search or filters</p>
      <button id="clearUserFiltersBtn" class="btn btn-primary">Clear Filters</button>
    </div>
  `;
  
  container.appendChild(content);
  
  // Render users and setup filters after DOM is ready
  requestAnimationFrame(() => {
    setTimeout(() => {
      console.log('Users DOM ready, rendering users...');
      renderUsersList(sampleUsers);
      setupUserFilters();
    }, 50);
  });
  
  return container;
}

function renderUsersList(users: typeof sampleUsers) {
  console.log('renderUsersList called with', users.length, 'users');
  
  const grid = document.getElementById('usersGrid');
  const emptyState = document.getElementById('userEmptyState');
  const userStats = document.getElementById('userStats');
  
  console.log('Users grid element:', grid);
  console.log('Users emptyState element:', emptyState);
  
  if (!grid || !emptyState) {
    console.error('Required user DOM elements not found!');
    return;
  }
  
  grid.innerHTML = '';
  
  // Update stats
  if (userStats) {
    const activeUsers = users.filter(u => u.isActive).length;
    if (users.length === sampleUsers.length) {
      userStats.textContent = `${users.length} developers • ${activeUsers} online`;
    } else {
      userStats.textContent = `Found ${users.length} of ${sampleUsers.length} developers • ${activeUsers} online`;
    }
  }
  
  if (users.length === 0) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    users.forEach(user => {
      grid.appendChild(renderUserCard(user));
    });
    
    console.log('Successfully rendered', users.length, 'user cards');
  }
}

function setupUserFilters() {
  const searchInput = document.getElementById('userSearchInput') as HTMLInputElement;
  const skillFilter = document.getElementById('skillFilter') as HTMLSelectElement;
  const countryFilter = document.getElementById('userCountryFilter') as HTMLSelectElement;
  const statusFilter = document.getElementById('statusFilter') as HTMLSelectElement;
  const sortFilter = document.getElementById('userSortFilter') as HTMLSelectElement;
  const clearFiltersBtn = document.getElementById('clearUserFilters');
  const clearFiltersBtn2 = document.getElementById('clearUserFiltersBtn');
  
  function applyUserFilters() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const selectedSkill = skillFilter?.value || '';
    const selectedCountry = countryFilter?.value || '';
    const selectedStatus = statusFilter?.value || '';
    const selectedSort = sortFilter?.value || 'newest';
    
    let filtered = [...sampleUsers];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.country.toLowerCase().includes(searchTerm) ||
        user.bio.toLowerCase().includes(searchTerm) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply skill filter
    if (selectedSkill) {
      filtered = filtered.filter(user =>
        user.skills.includes(selectedSkill)
      );
    }
    
    // Apply country filter
    if (selectedCountry) {
      filtered = filtered.filter(user =>
        user.country === selectedCountry
      );
    }
    
    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(user =>
        selectedStatus === 'active' ? user.isActive : !user.isActive
      );
    }
    
    // Apply sorting
    switch (selectedSort) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'most-projects':
        filtered.sort((a, b) => b.projectsCount - a.projectsCount);
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
    }
    
    renderUsersList(filtered);
  }
  
  // Add event listeners
  searchInput?.addEventListener('input', applyUserFilters);
  skillFilter?.addEventListener('change', applyUserFilters);
  countryFilter?.addEventListener('change', applyUserFilters);
  statusFilter?.addEventListener('change', applyUserFilters);
  sortFilter?.addEventListener('change', applyUserFilters);
  
  // Clear filters
  const clearAllFilters = () => {
    if (searchInput) searchInput.value = '';
    if (skillFilter) skillFilter.value = '';
    if (countryFilter) countryFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (sortFilter) sortFilter.value = 'newest';
    renderUsersList(sampleUsers);
  };
  
  clearFiltersBtn?.addEventListener('click', clearAllFilters);
  clearFiltersBtn2?.addEventListener('click', clearAllFilters);
}