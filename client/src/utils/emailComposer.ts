export interface EmailOptions {
  to: string;
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
}

export class EmailComposer {
  static openEmailClient(options: EmailOptions): void {
    const { to, subject = '', body = '', cc = '', bcc = '' } = options;
    
    // Create mailto URL with parameters
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    if (cc) params.append('cc', cc);
    if (bcc) params.append('bcc', bcc);
    
    const mailtoUrl = `mailto:${to}${params.toString() ? '?' + params.toString() : ''}`;
    
    console.log('Opening email client with URL:', mailtoUrl);
    
    // Try multiple methods to ensure email client opens
    try {
      // Method 1: Create a temporary link and click it
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Method 2: Fallback to window.open
      setTimeout(() => {
        window.open(mailtoUrl, '_blank');
      }, 100);
      
    } catch (error) {
      console.error('Error opening email client:', error);
      
      // Method 3: Final fallback to window.location
      window.location.href = mailtoUrl;
    }
  }

  static showEmailModal(recipientEmail: string, recipientName: string): void {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 email-modal';
    
    modal.innerHTML = `
      <div class="bg-dark-800 rounded-xl p-6 max-w-2xl w-full mx-4 border border-neon-blue/20 max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white flex items-center space-x-2">
            <svg class="w-6 h-6 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact ${recipientName}</span>
          </h3>
          <button class="text-gray-400 hover:text-white close-email-modal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neon-blue mb-2">To:</label>
            <input type="email" value="${recipientEmail}" readonly 
                   class="input bg-dark-700 text-gray-300 cursor-not-allowed" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-neon-blue mb-2">Subject:</label>
            <input type="text" id="emailSubject" placeholder="Enter email subject..." 
                   class="input" value="Collaboration Opportunity - Coders Constellation" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-neon-blue mb-2">Message:</label>
            <textarea id="emailBody" rows="8" placeholder="Write your message..." 
                      class="input resize-none">Hi ${recipientName},

I found your profile on Coders Constellation and I'm interested in connecting with you for potential collaboration opportunities.

I'd love to discuss:
- Your current projects and interests
- Potential collaboration opportunities
- Sharing knowledge and experiences

Looking forward to hearing from you!

Best regards</textarea>
          </div>
        </div>
        
        <div class="space-y-3 mt-6">
          <div class="flex space-x-3">
            <button id="openEmailClient" class="btn btn-primary flex-1 flex items-center justify-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Open Default Email</span>
            </button>
            <button id="copyEmailInfo" class="btn btn-secondary flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy Info</span>
            </button>
          </div>
          
          <div class="flex space-x-2">
            <button id="openGmail" class="btn btn-ghost flex-1 text-xs flex items-center justify-center space-x-1">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
              <span>Gmail</span>
            </button>
            <button id="openOutlook" class="btn btn-ghost flex-1 text-xs flex items-center justify-center space-x-1">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.87-.2q-.36-.19-.58-.52-.22-.33-.33-.74-.1-.42-.1-.87t.1-.87q.11-.41.33-.74.22-.33.58-.52.36-.19.87-.19t.87.19q.37.19.58.52.22.33.33.74.11.42.11.87zM21.5 9v10.5q0 .75-.37 1.35-.38.6-1.02.95-.65.35-1.49.35H5.4q-.75 0-1.35-.35-.6-.35-.95-.95Q3 20.25 3 19.5V9q0-.75.35-1.35.35-.6.95-.95.6-.35 1.35-.35h13.4q.75 0 1.35.35.6.35.95.95.35.6.35 1.35z"/>
              </svg>
              <span>Outlook</span>
            </button>
            <button id="openYahoo" class="btn btn-ghost flex-1 text-xs flex items-center justify-center space-x-1">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 7.34l-5.568 8.926V24h-2.4v-7.734L3.432 7.34h2.784l4.32 6.936 4.32-6.936h2.712z"/>
              </svg>
              <span>Yahoo</span>
            </button>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-dark-700 rounded-lg">
          <p class="text-xs text-gray-400">
            💡 <strong>Tip:</strong> Choose "Open Default Email" for your system's email app, or click Gmail/Outlook/Yahoo to open directly in your browser. 
            You can also copy the information and paste it anywhere.
          </p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-email-modal');
    const openEmailBtn = modal.querySelector('#openEmailClient');
    const copyInfoBtn = modal.querySelector('#copyEmailInfo');
    const openGmailBtn = modal.querySelector('#openGmail');
    const openOutlookBtn = modal.querySelector('#openOutlook');
    const openYahooBtn = modal.querySelector('#openYahoo');
    const subjectInput = modal.querySelector('#emailSubject') as HTMLInputElement;
    const bodyTextarea = modal.querySelector('#emailBody') as HTMLTextAreaElement;
    
    // Close modal
    const closeModal = () => {
      modal.remove();
    };
    
    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    
    // Open email client
    openEmailBtn?.addEventListener('click', () => {
      const subject = subjectInput.value;
      const body = bodyTextarea.value;
      
      EmailComposer.openEmailClient({
        to: recipientEmail,
        subject,
        body
      });
      
      // Show success message
      import('../components/Toast').then(({ toast }) => {
        toast.show('Opening email client...', 'info');
      });
      
      closeModal();
    });
    
    // Copy email info
    copyInfoBtn?.addEventListener('click', async () => {
      const subject = subjectInput.value;
      const body = bodyTextarea.value;
      
      const emailInfo = `To: ${recipientEmail}
Subject: ${subject}

${body}`;
      
      try {
        await navigator.clipboard.writeText(emailInfo);
        import('../components/Toast').then(({ toast }) => {
          toast.show('Email information copied to clipboard!', 'success');
        });
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = emailInfo;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        import('../components/Toast').then(({ toast }) => {
          toast.show('Email information copied to clipboard!', 'success');
        });
      }
    });

    // Open Gmail
    openGmailBtn?.addEventListener('click', () => {
      const subject = encodeURIComponent(subjectInput.value);
      const body = encodeURIComponent(bodyTextarea.value);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${subject}&body=${body}`;
      
      window.open(gmailUrl, '_blank');
      
      import('../components/Toast').then(({ toast }) => {
        toast.show('Opening Gmail...', 'info');
      });
      
      closeModal();
    });

    // Open Outlook
    openOutlookBtn?.addEventListener('click', () => {
      const subject = encodeURIComponent(subjectInput.value);
      const body = encodeURIComponent(bodyTextarea.value);
      const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${recipientEmail}&subject=${subject}&body=${body}`;
      
      window.open(outlookUrl, '_blank');
      
      import('../components/Toast').then(({ toast }) => {
        toast.show('Opening Outlook...', 'info');
      });
      
      closeModal();
    });

    // Open Yahoo Mail
    openYahooBtn?.addEventListener('click', () => {
      const subject = encodeURIComponent(subjectInput.value);
      const body = encodeURIComponent(bodyTextarea.value);
      const yahooUrl = `https://compose.mail.yahoo.com/?to=${recipientEmail}&subject=${subject}&body=${body}`;
      
      window.open(yahooUrl, '_blank');
      
      import('../components/Toast').then(({ toast }) => {
        toast.show('Opening Yahoo Mail...', 'info');
      });
      
      closeModal();
    });
    
    // Focus on subject input
    setTimeout(() => {
      subjectInput.focus();
      subjectInput.select();
    }, 100);
  }
}

// Global function for easy access
(window as any).openEmailComposer = (email: string, name: string) => {
  EmailComposer.showEmailModal(email, name);
};

// Global function for quick email
(window as any).openQuickEmail = (email: string, name: string) => {
  const subject = 'Collaboration Opportunity - Coders Constellation';
  const body = `Hi ${name},

I found your profile on Coders Constellation and would love to connect!

Best regards`;

  EmailComposer.openEmailClient({
    to: email,
    subject,
    body
  });
  
  // Show feedback
  import('../components/Toast').then(({ toast }) => {
    toast.show(`Opening email to ${name}...`, 'info');
  });
};