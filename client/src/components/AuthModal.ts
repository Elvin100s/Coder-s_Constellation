import { AuthService } from '../services/authService'

export class AuthModal {
  static show(mode: 'login' | 'signup' = 'login') {
    // Remove existing modal if any
    const existing = document.querySelector('.auth-modal')
    if (existing) existing.remove()

    // Create modal
    const modal = document.createElement('div')
    modal.className = 'auth-modal fixed inset-0 bg-black/80 flex items-center justify-center z-50'
    
    modal.innerHTML = `
      <div class="bg-dark-800 rounded-xl p-8 max-w-md w-full mx-4 border border-neon-blue/20">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-white" id="authTitle">
            ${mode === 'login' ? 'Welcome Back' : 'Join Coders Constellation'}
          </h2>
          <button class="text-gray-400 hover:text-white close-auth-modal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- GitHub Sign In -->
        <button id="githubSignIn" type="button" class="w-full btn btn-primary flex items-center justify-center space-x-3 py-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
          <span class="text-lg font-semibold">Continue with GitHub</span>
        </button>

        <div class="mt-6 text-center">
          <p class="text-gray-400 text-sm">
            Join the community of African developers building the future of tech
          </p>
        </div>

        <!-- Loading State -->
        <div id="authLoading" class="hidden mt-4 text-center">
          <div class="inline-flex items-center space-x-2 text-neon-blue">
            <div class="w-4 h-4 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        </div>

        <!-- Error Message -->
        <div id="authError" class="hidden mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p class="text-red-300 text-sm"></p>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    // Setup event listeners
    AuthModal.setupEventListeners(modal, mode)
  }

  static setupEventListeners(modal: HTMLElement, _initialMode: 'login' | 'signup') {
    // let currentMode = initialMode

    // Close modal
    const closeBtn = modal.querySelector('.close-auth-modal')
    closeBtn?.addEventListener('click', () => modal.remove())
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove()
    })

    // GitHub sign in
    const githubBtn = modal.querySelector('#githubSignIn')
    githubBtn?.addEventListener('click', async (e) => {
      e.preventDefault() // Prevent any default button behavior
      AuthModal.showLoading(modal, true)
      
      try {
        const { error } = await AuthService.signInWithGitHub()
        
        if (error) {
          AuthModal.showError(modal, error.message)
          AuthModal.showLoading(modal, false)
        }
        // If successful, Supabase will handle the redirect
      } catch (err) {
        console.error('OAuth error:', err)
        AuthModal.showError(modal, 'Authentication failed. Please try again.')
        AuthModal.showLoading(modal, false)
      }
    })
  }



  static showLoading(modal: HTMLElement, show: boolean) {
    const loading = modal.querySelector('#authLoading')
    const githubBtn = modal.querySelector('#githubSignIn')

    if (show) {
      loading?.classList.remove('hidden')
      githubBtn?.classList.add('opacity-50', 'pointer-events-none')
    } else {
      loading?.classList.add('hidden')
      githubBtn?.classList.remove('opacity-50', 'pointer-events-none')
    }
  }

  static showError(modal: HTMLElement, message: string) {
    const error = modal.querySelector('#authError')
    const errorText = error?.querySelector('p')
    
    if (errorText) errorText.textContent = message
    error?.classList.remove('hidden')
  }

  static hideError(modal: HTMLElement) {
    const error = modal.querySelector('#authError')
    error?.classList.add('hidden')
  }
}

// Global function
(window as any).showAuthModal = (mode: 'login' | 'signup' = 'login') => {
  AuthModal.show(mode)
}