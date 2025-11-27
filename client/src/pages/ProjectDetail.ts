import { sampleProjects } from '../data/sampleProjects';
import { router } from '../router';

export function renderProjectDetail(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-dark-900';
  
  const projectId = router.getParam('id');
  const project = sampleProjects.find(p => p.id === projectId);
  
  if (!project) {
    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-2xl font-bold text-white mb-4">Project Not Found</h1>
        <p class="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
        <a href="/" data-link class="btn btn-primary">Back to Projects</a>
      </div>
    `;
    return container;
  }
  container.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <a href="/" data-link class="inline-flex items-center text-gray-400 hover:text-neon-blue mb-6 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Projects
      </a>

      <!-- Project Header -->
      <div class="card p-8 mb-6">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-2">${project.title}</h1>
            <p class="text-gray-400">Posted ${formatDate(project.createdAt)}</p>
          </div>
          ${project.githubRepo ? `
            <a href="${project.githubRepo}" target="_blank" rel="noopener noreferrer" 
               class="btn btn-secondary flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              <span>View on GitHub</span>
            </a>
          ` : ''}
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-neon-blue mb-3">About This Project</h2>
          <p class="text-gray-300 leading-relaxed">${project.description}</p>
        </div>

        <!-- Tech Stack -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-neon-blue mb-3">Tech Stack</h2>
          <div class="flex flex-wrap gap-2">
            ${project.techStack.map((tech: string, index: number) => {
              const colors = ['bg-neon-pink/20 text-neon-pink border-neon-pink/30', 'bg-neon-blue/20 text-neon-blue border-neon-blue/30', 'bg-neon-purple/20 text-neon-purple border-neon-purple/30'];
              const colorClass = colors[index % colors.length];
              return `
                <span class="px-4 py-2 ${colorClass} font-medium rounded-lg border">
                  ${tech}
                </span>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Contact Button -->
        <div class="pt-6 border-t border-neon-blue/20">
          <button id="contactBtn" class="btn btn-primary w-full md:w-auto px-8 py-3 text-lg">
            Contact Project Owner
          </button>
        </div>
      </div>

      <!-- Owner Profile Card -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-neon-pink mb-4">Project Owner</h2>
        <div class="flex items-center space-x-4">
          <img src="${project.owner.avatar}" alt="${project.owner.name}" 
               class="w-16 h-16 rounded-full border-2 border-neon-blue/30" />
          <div class="flex-1">
            <h3 class="font-semibold text-white">${project.owner.name}</h3>
            <p class="text-neon-blue">@${project.owner.githubUsername}</p>
            <p class="text-sm text-gray-400">${project.owner.country}</p>
          </div>
          <a href="https://github.com/${project.owner.githubUsername}" 
             target="_blank" rel="noopener noreferrer"
             class="btn btn-secondary">
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  `;
  
  // Setup contact button
  setTimeout(() => {
    const contactBtn = document.getElementById('contactBtn');
    contactBtn?.addEventListener('click', () => {
      const url = project.githubRepo 
        ? `${project.githubRepo}/issues`
        : `https://github.com/${project.owner.githubUsername}`;
      window.open(url, '_blank');
    });
  }, 0);
  
  return container;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}
