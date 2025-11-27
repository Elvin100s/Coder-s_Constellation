import { Project } from '../data/sampleProjects';

export function renderProjectCard(project: Project): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card p-6 cursor-pointer transform hover:scale-[1.02] transition-all duration-300 group';
  
  card.innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <img src="${project.owner.avatar}" alt="${project.owner.name}" class="w-10 h-10 rounded-full border-2 border-neon-blue/30 group-hover:border-neon-pink/50 transition-colors" />
        <div>
          <h3 class="font-semibold text-white group-hover:text-neon-blue transition-colors">${project.owner.name}</h3>
          <p class="text-sm text-gray-400">${project.owner.country}</p>
        </div>
      </div>
      ${project.githubRepo ? `
        <a href="${project.githubRepo}" target="_blank" rel="noopener noreferrer" 
           class="text-gray-400 hover:text-neon-blue transition-colors"
           onclick="event.stopPropagation()">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </a>
      ` : ''}
    </div>
    
    <h2 class="text-lg font-bold text-white mb-2 group-hover:text-neon-pink transition-colors">${project.title}</h2>
    <p class="text-gray-300 text-sm mb-4 line-clamp-2">${project.description}</p>
    
    <div class="flex flex-wrap gap-2 mb-4">
      ${project.techStack.map((tech, index) => {
        const colors = ['bg-neon-pink/20 text-neon-pink border-neon-pink/30', 'bg-neon-blue/20 text-neon-blue border-neon-blue/30', 'bg-neon-purple/20 text-neon-purple border-neon-purple/30'];
        const colorClass = colors[index % colors.length];
        return `
          <span class="px-3 py-1 ${colorClass} text-xs font-medium rounded-full border">
            ${tech}
          </span>
        `;
      }).join('')}
    </div>
    
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm border-t border-dark-600 pt-4 space-y-2 sm:space-y-0">
      <div class="flex items-center space-x-2 sm:space-x-4 text-gray-400 text-xs sm:text-sm">
        <span class="truncate">${formatDate(project.createdAt)}</span>
        <span class="flex items-center space-x-1 whitespace-nowrap">
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>${Math.floor(Math.random() * 50) + 10} views</span>
        </span>
      </div>
      <span class="text-neon-blue font-medium group-hover:text-neon-pink transition-colors flex items-center space-x-1 text-xs sm:text-sm">
        <span>View Details</span>
        <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  `;
  
  card.addEventListener('click', () => {
    window.history.pushState({}, '', `/projects/${project.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  
  return card;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
