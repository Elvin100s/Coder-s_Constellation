export function renderHome(): HTMLElement {
  const container = document.createElement('div');
  
  container.innerHTML = `
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent animate-pulse">
            Connect. Collaborate. Create.
          </h1>
          <p class="text-xl text-gray-300 mb-8 leading-relaxed">
            The platform where African developers discover teammates, share ideas, and build projects together.
            <span class="text-neon-blue font-semibold">No more scattered WhatsApp groups</span> or lost opportunities.
          </p>
          <div class="flex justify-center space-x-4">
            <a href="/create" data-link class="btn btn-primary px-8 py-3 text-lg shadow-neon-pink">
              Post a Project
            </a>
            <a href="#projects" class="btn btn-secondary px-8 py-3 text-lg">
              Explore Projects
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-dark-800 border-b border-neon-blue/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="group">
            <div class="text-5xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">500+</div>
            <div class="text-gray-400">Active Developers</div>
          </div>
          <div class="group">
            <div class="text-5xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">150+</div>
            <div class="text-gray-400">Projects Posted</div>
          </div>
          <div class="group">
            <div class="text-5xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">30+</div>
            <div class="text-gray-400">Countries</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Problem Statement -->
    <div class="bg-dark-800 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-6">
            The Problem We're Solving
          </h2>
          <p class="text-lg text-gray-300 mb-8">
            African developers struggle to find meaningful collaboration. Without a structured platform, 
            they resort to generic "Looking for collaborators" posts on WhatsApp, LinkedIn, or Twitter—with 
            little to no response. This leads to professional isolation, missed opportunities, and projects 
            that never materialize.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div class="card p-6 group">
              <div class="text-neon-pink mb-4 group-hover:text-neon-blue transition-colors">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="font-semibold text-white mb-2">Hard to Discover</h3>
              <p class="text-sm text-gray-400">No systematic way to find like-minded developers</p>
            </div>
            <div class="card p-6 group">
              <div class="text-neon-blue mb-4 group-hover:text-neon-purple transition-colors">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 class="font-semibold text-white mb-2">Limited Visibility</h3>
              <p class="text-sm text-gray-400">Talent hidden in closed networks and communities</p>
            </div>
            <div class="card p-6 group">
              <div class="text-neon-purple mb-4 group-hover:text-neon-pink transition-colors">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 class="font-semibold text-white mb-2">Fragmented Tools</h3>
              <p class="text-sm text-gray-400">Scattered across WhatsApp, Discord, and LinkedIn</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Projects Preview -->
    <div id="projects" class="bg-dark-900 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent mb-4">Featured Projects</h2>
          <p class="text-lg text-gray-300">Discover amazing projects from developers across Africa</p>
        </div>
        <div class="text-center">
          <a href="/" data-link class="btn btn-primary px-8 py-3 text-lg shadow-neon-pink">
            View All Projects
          </a>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-dark-800 to-dark-900 text-white py-16 border-t border-neon-blue/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-4">Ready to Start Collaborating?</h2>
        <p class="text-xl text-gray-300 mb-8">
          Join hundreds of African developers building the future together
        </p>
        <a href="/create" data-link class="btn btn-primary px-8 py-3 text-lg shadow-neon-pink">
          Post Your First Project
        </a>
      </div>
    </div>
  `;
  
  return container;
}
