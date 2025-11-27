export function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'bg-dark-800 border-t border-neon-blue/20 mt-16';
  
  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <img src="/cc.png" alt="Coders Constellation" class="w-10 h-10 object-contain" />
            <span class="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">Coders Constellation</span>
          </div>
          <p class="text-gray-400 mb-4 max-w-md">
            Connecting African developers to build the future together. Find collaborators, share ideas, and create amazing projects across the continent.
          </p>
          <div class="flex space-x-4">
            <a href="https://github.com/elvincyubahiro" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-neon-pink transition-colors" title="GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/elvincyubahiro" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-neon-blue transition-colors" title="LinkedIn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:elvin.cyubahiro@alu.edu" class="text-gray-400 hover:text-neon-purple transition-colors" title="Email">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Navigation -->
        <div>
          <h3 class="text-white font-semibold mb-4">Explore</h3>
          <ul class="space-y-2">
            <li><a href="/" class="text-gray-400 hover:text-neon-blue transition-colors">Discover Projects</a></li>
            <li><a href="/users" class="text-gray-400 hover:text-neon-blue transition-colors">Find Developers</a></li>
            <li><a href="/create" class="text-gray-400 hover:text-neon-blue transition-colors">Post Project</a></li>
          </ul>
        </div>
        
        <!-- Tech Stack -->
        <div>
          <h3 class="text-white font-semibold mb-4">Built With</h3>
          <ul class="space-y-2">
            <li><span class="text-gray-400">TypeScript & Vite</span></li>
            <li><span class="text-gray-400">Supabase Database</span></li>
            <li><span class="text-gray-400">Tailwind CSS</span></li>
            <li><span class="text-gray-400">GitHub OAuth</span></li>
          </ul>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="border-t border-dark-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          © 2024 Coders Constellation. Built with ❤️ for African developers.
        </p>
        <div class="flex items-center space-x-6 mt-4 md:mt-0">
          <span class="text-gray-400 text-sm">Made by</span>
          <span class="text-neon-blue font-medium">Elvin Cyubahiro</span>
          <span class="text-gray-400">•</span>
          <span class="text-gray-400 text-sm">ALU Rwanda</span>
        </div>
      </div>
    </div>
  `;
  
  return footer;
}