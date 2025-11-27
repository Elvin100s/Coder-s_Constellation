interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
}

export class MockAuthService {
  private static readonly STORAGE_KEY = 'github_user';
  
  static async loginWithGitHub(): Promise<GitHubUser> {
    // Import loading screen dynamically
    const { loadingScreen } = await import('../components/LoadingScreen');
    
    // Show authentication loading
    loadingScreen.show('Authenticating...');
    
    // Simulate OAuth redirect and loading
    return new Promise((resolve) => {
      // Show loading state for realism
      setTimeout(() => {
        const mockUser: GitHubUser = {
          id: 12345678,
          login: 'elvincyubahiro',
          name: 'Elvin Cyubahiro',
          email: 'elvin.cyubahiro@alu.edu',
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElvinAuth',
          bio: 'Full-stack developer and ALU student building Coders Constellation',
          location: 'Kigali, Rwanda',
          public_repos: 15,
          followers: 42,
          following: 38
        };
        
        // Store user data
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockUser));
        
        // Dispatch auth state change event
        window.dispatchEvent(new CustomEvent('authStateChanged'));
        
        // Hide loading screen
        loadingScreen.hide();
        
        resolve(mockUser);
      }, 1500); // Simulate network delay
    });
  }
  
  static getCurrentUser(): GitHubUser | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
  
  static logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    // Dispatch auth state change event
    window.dispatchEvent(new CustomEvent('authStateChanged'));
  }
  
  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
  
  static async simulateGitHubRedirect(): Promise<void> {
    // Import loading screen dynamically
    const { loadingScreen } = await import('../components/LoadingScreen');
    
    // Show GitHub redirect loading
    return loadingScreen.showWithProgress('Redirecting to GitHub...', 2000);
  }
}