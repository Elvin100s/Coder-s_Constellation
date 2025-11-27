export class LoadingScreen {
  private overlay: HTMLElement | null = null;

  show(message: string = 'Loading...') {
    // Remove existing overlay if any
    this.hide();

    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'loading-overlay fixed inset-0 bg-dark-900/95 flex items-center justify-center z-[9999]';
    this.overlay.style.backdropFilter = 'blur(10px)';
    
    this.overlay.innerHTML = `
      <div class="text-center">
        <div class="loader mb-4">${message}</div>
        <div class="text-neon-blue/60 text-sm animate-pulse">Coders Constellation</div>
      </div>
    `;

    document.body.appendChild(this.overlay);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
  }

  hide() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
      // Restore scrolling
      document.body.style.overflow = '';
    }
  }

  showWithProgress(message: string = 'Loading...', duration: number = 2000) {
    this.show(message);
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.hide();
        resolve();
      }, duration);
    });
  }

  async wrapAsync<T>(promise: Promise<T>, message: string = 'Loading...'): Promise<T> {
    this.show(message);
    try {
      const result = await promise;
      this.hide();
      return result;
    } catch (error) {
      this.hide();
      throw error;
    }
  }
}

export const loadingScreen = new LoadingScreen();