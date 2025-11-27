// Email helper functions for better mailto handling

export function createMailtoLink(
  email: string, 
  subject: string, 
  body: string
): string {
  const params = new URLSearchParams();
  params.append('subject', subject);
  params.append('body', body);
  
  return `mailto:${email}?${params.toString()}`;
}

export function openEmailClient(
  email: string, 
  subject: string, 
  body: string
): void {
  const mailtoLink = createMailtoLink(email, subject, body);
  
  // Try to open the mailto link
  try {
    window.location.href = mailtoLink;
  } catch (error) {
    console.error('Failed to open email client:', error);
    
    // Fallback: try using window.open
    try {
      window.open(mailtoLink, '_blank');
    } catch (fallbackError) {
      console.error('Fallback email opening failed:', fallbackError);
      
      // Final fallback: copy email to clipboard and show message
      navigator.clipboard.writeText(email).then(() => {
        alert(`Email address copied to clipboard: ${email}\n\nSubject: ${subject}\n\nBody: ${body}`);
      }).catch(() => {
        alert(`Please email: ${email}\n\nSubject: ${subject}\n\nBody: ${body}`);
      });
    }
  }
}

// Global function for easy access
(window as any).openEmail = openEmailClient;