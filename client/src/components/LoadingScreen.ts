export class LoadingScreen {
  private overlay: HTMLElement | null = null;

  show(message: string = 'Loading...') {
    // Remove existing overlay if any
    this.hide();

    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'loading-overlay fixed inset-0 bg-dark-900/98 flex items-center justify-center';
    this.overlay.style.backdropFilter = 'blur(10px)';
    this.overlay.style.zIndex = '99999';
    this.overlay.style.position = 'fixed';
    this.overlay.style.top = '0';
    this.overlay.style.left = '0';
    this.overlay.style.width = '100%';
    this.overlay.style.height = '100%';
    
    this.overlay.innerHTML = `
      <div class="text-center">
        <div class="loader mb-4" style="animation: pulse 1.5s ease-in-out infinite;">${message}</div>
        <div class="text-neon-blue/60 text-sm" style="animation: pulse 2s ease-in-out infinite;">Coders Constellation</div>
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