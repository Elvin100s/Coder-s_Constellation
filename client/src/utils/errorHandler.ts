import { toast } from '../components/Toast';

export class ErrorHandler {
  static handle(error: Error, context?: string) {
    console.error(`Error ${context ? `in ${context}` : ''}:`, error);
    
    // Show user-friendly error message
    const message = this.getUserFriendlyMessage(error);
    toast.show(message, 'error');
  }
  
  static handleNetworkError(error: any, context?: string) {
    console.error(`Network error ${context ? `in ${context}` : ''}:`, error);
    
    if (!navigator.onLine) {
      toast.show('You appear to be offline. Please check your connection.', 'warning');
    } else {
      toast.show('Network error. Please try again.', 'error');
    }
  }
  
  private static getUserFriendlyMessage(error: Error): string {
    if (error.message.includes('fetch')) {
      return 'Connection error. Please check your internet and try again.';
    }
    
    if (error.message.includes('404')) {
      return 'The requested resource was not found.';
    }
    
    if (error.message.includes('500')) {
      return 'Server error. Please try again later.';
    }
    
    return 'Something went wrong. Please try again.';
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  ErrorHandler.handle(event.error, 'Global');
});

window.addEventListener('unhandledrejection', (event) => {
  ErrorHandler.handle(new Error(event.reason), 'Promise rejection');
});