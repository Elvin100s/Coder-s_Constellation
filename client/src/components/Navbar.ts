import { router } from '../router';
import { AuthService } from '../services/authService';
import { AuthModal } from './AuthModal';

// Initialize auth state listener
AuthService.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session?.user?.email);
  updateAuthUI();
  
  // Show welcome message for new sign-ins
  if (event === 'SIGNED_IN' && session?.user) {
    const user = AuthService.formatUser(session.user);
    import('./Toast').then(({ toast }) => {
      toast.show(`Welcome, ${user.name}! 🎉`, 'success');
    });
  }
});

// Global function for testing signin
(window as any).testSignIn = async () => {
  console.log('Testing signin...');
  try {
    const user = await AuthService.signInWithGitHub();
    updateAuthUI();
    console.log('Signin successful:', user);
  } catch (error) {
    console.error('Signin failed:', error);
  }
};

// Global function for testing loading screen
(window as any).testLoading = async () => {
  const { loadingScreen } = await import('./LoadingScreen');
  await loadingScreen.showWithProgress('Testing loading animation...', 3000);
  console.log('Loading test complete!');
};

// Global function for debugging projects
(window as any).debugProjects = () => {
  const { sampleProjects } = require('../data/sampleProjects');
  console.log('Sample projects count:', sampleProjects.length);
  console.log('First project:', sampleProjects[0]);
  
  const grid = document.getElementById('projectsGrid');
  console.log('Projects grid element:', grid);
  console.log('Grid children count:', grid?.children.length);
};

export function renderNavbar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'bg-dark-800 border-b border-neon-blue/20 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95';
  
  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-8">
          <a href="/" data-link class="flex items-center space-x-3 group">
            <img src="/cc.png" alt="Coders Constellation" class="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200" />
            <span class="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">Coders Constellation</span>
          </a>
          
          <div class="hidden md:flex space-x-4">
            <a href="/" data-link class="text-gray-300 hover:text-neon-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Discover
            </a>
            <a href="/users" data-link class="text-gray-300 hover:text-neon-purple px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Developers
            </a>
            <a href="/create" data-link class="text-gray-300 hover:text-neon-pink px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Post Project
            </a>
          </div>
        </div>
        
        <div class="flex items-center space-x-4" id="navbarAuth">
          <!-- Auth buttons will be inserted here -->
        </div>
      </div>
    </div>
  `;
  
  // Setup authentication UI
  setTimeout(() => {
    updateAuthUI();
  }, 100);
  
  return nav;
}

export async function updateAuthUI() {
  const authContainer = document.getElementById('navbarAuth');
  if (!authContainer) {
    console.error('Auth container not found!');
    return;
  }
  
  console.log('Updating auth UI...');
  
  const user = await AuthService.getCurrentUser();
  
  if (user) {
    const formattedUser = AuthService.formatUser(user);
    
    // Authenticated state
    authContainer.innerHTML = `
      <div class="flex items-center space-x-3">
        <img src="${formattedUser.avatar_url}" alt="${formattedUser.name}" class="w-8 h-8 rounded-full border border-neon-blue/30" />
        <span class="text-white font-medium hidden sm:block">${formattedUser.name}</span>
        <button id="logoutBtn" class="btn btn-ghost text-sm">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    `;
    
    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
      await AuthService.signOut();
      updateAuthUI();
      // Redirect to home
      router.navigate('/');
    });
  } else {
    // Unauthenticated state
    authContainer.innerHTML = `
      <button id="signInBtn" class="btn btn-primary text-sm flex items-center space-x-2">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
        </svg>
        <span>Sign in with GitHub</span>
      </button>
    `;
    
    // Sign In button
    const signInBtn = document.getElementById('signInBtn');
    signInBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      AuthModal.show('login');
    });
  }
}
