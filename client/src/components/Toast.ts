type ToastType = 'success' | 'error' | 'info' | 'warning';

export class ToastManager {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(this.container);
  }

  show(message: string, type: ToastType = 'info', duration: number = 4000) {
    const toast = document.createElement('div');
    toast.className = `
      flex items-center p-4 rounded-lg shadow-lg transform translate-x-full transition-all duration-300 ease-out
      ${this.getToastStyles(type)}
    `;

    const icon = this.getIcon(type);
    toast.innerHTML = `
      <div class="flex items-center space-x-3">
        ${icon}
        <span class="text-white font-medium">${message}</span>
        <button class="ml-4 text-white/70 hover:text-white transition-colors" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;

    this.container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 10);

    // Auto remove
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  private getToastStyles(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'bg-green-600 border border-green-500';
      case 'error':
        return 'bg-red-600 border border-red-500';
      case 'warning':
        return 'bg-yellow-600 border border-yellow-500';
      default:
        return 'bg-dark-700 border border-neon-blue';
    }
  }

  private getIcon(type: ToastType): string {
    switch (type) {
      case 'success':
        return `<svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>`;
      case 'error':
        return `<svg class="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>`;
      case 'warning':
        return `<svg class="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>`;
      default:
        return `<svg class="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`;
    }
  }
}

export const toast = new ToastManager();