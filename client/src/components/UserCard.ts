import { User } from '../data/sampleUsers';

export function renderUserCard(user: User): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card p-6 cursor-pointer transform hover:scale-[1.02] transition-all duration-300 group';
  
  // Build Gmail URL properly outside template string
  const gmailUrl = (() => {
    const to = encodeURIComponent(user.email);
    const subject = encodeURIComponent('Collaboration Opportunity - Coders Constellation');
    const body = encodeURIComponent(`Hi ${user.name},\n\nI found your profile on Coders Constellation and I'm interested in collaborating on a project.\n\nBest regards`);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
  })();
  
  card.innerHTML = `
    <div class="flex items-start space-x-4 mb-4">
      <div class="relative">
        <img src="${user.avatar}" alt="${user.name}" 
             class="w-16 h-16 rounded-full border-2 border-neon-blue/30 group-hover:border-neon-pink/50 transition-colors" />
        <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-dark-800 ${user.isActive ? 'bg-green-500' : 'bg-gray-500'}"></div>
      </div>
      
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-bold text-white group-hover:text-neon-blue transition-colors truncate">${user.name}</h3>
          <span class="text-xs px-2 py-1 rounded-full ${user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}">
            ${user.isActive ? '● Online' : '○ Offline'}
          </span>
        </div>
        
        <div class="flex items-center space-x-2 mb-2">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-sm text-gray-400">${user.country}</span>
        </div>
        
        <p class="text-gray-300 text-sm mb-4 line-clamp-2">${user.bio}</p>
      </div>
    </div>
    
    <!-- Skills -->
    <div class="flex flex-wrap gap-2 mb-4">
      ${user.skills.slice(0, 4).map((skill, index) => {
        const colors = ['bg-neon-pink/20 text-neon-pink border-neon-pink/30', 'bg-neon-blue/20 text-neon-blue border-neon-blue/30', 'bg-neon-purple/20 text-neon-purple border-neon-purple/30'];
        const colorClass = colors[index % colors.length];
        return `
          <span class="px-2 py-1 ${colorClass} text-xs font-medium rounded-full border">
            ${skill}
          </span>
        `;
      }).join('')}
      ${user.skills.length > 4 ? `<span class="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full border border-gray-500/30">+${user.skills.length - 4} more</span>` : ''}
    </div>
    
    <!-- Stats and Actions -->
    <div class="flex items-center justify-between border-t border-dark-600 pt-4">
      <div class="flex items-center space-x-4 text-sm text-gray-400">
        <span class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>${user.projectsCount} projects</span>
        </span>
        <span>Joined ${formatDate(user.joinedAt)}</span>
      </div>
      
      <div class="flex items-center space-x-2">
        <a 
           href="${gmailUrl}"
           target="_blank"
           rel="noopener noreferrer"
           class="btn btn-primary text-sm px-4 py-2"
           title="Send Email to ${user.name}"
           onclick="event.stopPropagation()">
          Contact
        </a>
        
        <a href="https://github.com/${user.githubUsername}" 
           target="_blank" rel="noopener noreferrer"
           class="p-2 text-gray-400 hover:text-neon-pink transition-all duration-200 rounded-lg hover:bg-dark-700 hover:scale-110"
           title="View GitHub Profile"
           onclick="event.stopPropagation()">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  `;
  
  return card;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}