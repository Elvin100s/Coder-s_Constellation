import './styles/main.css';
import { router } from './router';
import { renderNavbar } from './components/Navbar';
import { renderFooter } from './components/Footer';

import { renderDashboard } from './pages/Dashboard';
import { renderProjectDetail } from './pages/ProjectDetail';
import { renderCreateProject } from './pages/CreateProject';
import { renderUsers } from './pages/Users';
import './components/Toast'; // Initialize toast system
import { loadingScreen } from './components/LoadingScreen';
// Contact functionality uses direct mailto links

// Show initial loading screen
loadingScreen.show('Initializing...');

// Get app container
const app = document.getElementById('app');
if (!app) throw new Error('App container not found');

// Render navbar
const navbar = renderNavbar();
app.appendChild(navbar);

// Create main content container
const main = document.createElement('main');
main.id = 'main-content';
main.className = 'min-h-screen';
app.appendChild(main);

// Render footer
const footer = renderFooter();
app.appendChild(footer);

// Define routes
router.addRoute('/', () => {
  const content = window.location.pathname === '/' && window.location.hash === '' 
    ? renderDashboard() 
    : renderDashboard();
  renderPage(content);
});

router.addRoute('/create', () => {
  renderPage(renderCreateProject());
});

router.addRoute('/users', () => {
  renderPage(renderUsers());
});

router.addRoute('/projects/:id', () => {
  renderPage(renderProjectDetail());
});

// Helper function to render pages
function renderPage(content: HTMLElement) {
  // Hide any existing loading screen first
  loadingScreen.hide();
  
  // Render content immediately
  main.innerHTML = '';
  main.appendChild(content);
  window.scrollTo(0, 0);
}

// Initialize router
router.init();

// Hide loading screen after initialization (increased time to see animation)
setTimeout(() => {
  loadingScreen.hide();
}, 3000);

console.log('🌟 Coders Constellation initialized!');

// Debug function to check projects
(window as any).checkProjects = () => {
  const grid = document.getElementById('projectsGrid');
  console.log('Projects grid found:', !!grid);
  console.log('Number of project cards:', grid?.children.length || 0);
  
  // Import and log sample projects
  import('./data/sampleProjects').then(({ sampleProjects }) => {
    console.log('Sample projects loaded:', sampleProjects.length);
  });
};

// Force render projects function
(window as any).forceRenderProjects = () => {
  import('./data/sampleProjects').then(({ sampleProjects }) => {
    import('./components/ProjectCard').then(({ renderProjectCard }) => {
      const grid = document.getElementById('projectsGrid');
      if (grid) {
        grid.innerHTML = '';
        sampleProjects.forEach(project => {
          grid.appendChild(renderProjectCard(project));
        });
        console.log('Force rendered', sampleProjects.length, 'projects');
      } else {
        console.error('Projects grid not found');
      }
    });
  });
};

// Force render users function
(window as any).forceRenderUsers = () => {
  import('./data/sampleUsers').then(({ sampleUsers }) => {
    import('./components/UserCard').then(({ renderUserCard }) => {
      const grid = document.getElementById('usersGrid');
      if (grid) {
        grid.innerHTML = '';
        sampleUsers.forEach(user => {
          grid.appendChild(renderUserCard(user));
        });
        console.log('Force rendered', sampleUsers.length, 'users');
      } else {
        console.error('Users grid not found');
      }
    });
  });
};

// Comprehensive test function
(window as any).testEverything = () => {
  console.log('=== TESTING EVERYTHING ===');
  
  // Test data loading
  Promise.all([
    import('./data/sampleProjects'),
    import('./data/sampleUsers')
  ]).then(([{ sampleProjects }, { sampleUsers }]) => {
    console.log('✅ Data loaded:', sampleProjects.length, 'projects,', sampleUsers.length, 'users');
    
    // Test DOM elements
    const projectsGrid = document.getElementById('projectsGrid');
    const usersGrid = document.getElementById('usersGrid');
    
    console.log('✅ DOM elements:');
    console.log('  - Projects grid:', !!projectsGrid, '(', projectsGrid?.children.length || 0, 'children)');
    console.log('  - Users grid:', !!usersGrid, '(', usersGrid?.children.length || 0, 'children)');
    
    // Test email functionality
    const emailButtons = document.querySelectorAll('.email-btn');
    console.log('✅ Email buttons found:', emailButtons.length);
    
    // Test current page
    const currentPath = window.location.pathname;
    console.log('✅ Current page:', currentPath);
    
    if (currentPath === '/' && projectsGrid?.children.length === 0) {
      console.log('🔧 Projects not rendered, forcing render...');
      (window as any).forceRenderProjects();
    }
    
    if (currentPath === '/users' && usersGrid?.children.length === 0) {
      console.log('🔧 Users not rendered, forcing render...');
      (window as any).forceRenderUsers();
    }
  });
};

// Test email composer function
(window as any).testEmailComposer = () => {
  console.log('Testing email composer...');
  (window as any).openEmailComposer('test@example.com', 'Test User');
};

// Test quick email function
(window as any).testQuickEmail = () => {
  console.log('Testing quick email...');
  (window as any).openQuickEmail('test@example.com', 'Test User');
};

// Test GitHub auth
(window as any).testGitHubAuth = async () => {
  const { AuthService } = await import('./services/authService');
  const user = await AuthService.getCurrentUser();
  console.log('Current user:', user);
  console.log('Formatted user:', user ? AuthService.formatUser(user) : 'Not logged in');
};

// Test loading screen
(window as any).testLoadingScreen = () => {
  console.log('Testing loading screen...');
  loadingScreen.show('Testing loading animation...');
  setTimeout(() => {
    loadingScreen.hide();
    console.log('Loading screen test complete!');
  }, 5000);
};

// Show loading screen on demand
(window as any).showLoading = (message = 'Loading...', duration = 3000) => {
  loadingScreen.show(message);
  setTimeout(() => loadingScreen.hide(), duration);
};

// Import Supabase testing utilities
import './utils/migrateToSupabase';
import './components/AuthModal'; // Initialize auth modal
import './utils/emailHelper'; // Initialize email helper
