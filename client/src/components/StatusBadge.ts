type StatusType = 'active' | 'recruiting' | 'completed' | 'paused';

export function renderStatusBadge(status: StatusType): HTMLElement {
  const badge = document.createElement('span');
  
  const statusConfig = {
    active: {
      text: 'Active',
      classes: 'bg-green-500/20 text-green-400 border-green-500/30',
      icon: '●'
    },
    recruiting: {
      text: 'Recruiting',
      classes: 'bg-neon-blue/20 text-neon-blue border-neon-blue/30',
      icon: '👥'
    },
    completed: {
      text: 'Completed',
      classes: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      icon: '✓'
    },
    paused: {
      text: 'Paused',
      classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      icon: '⏸'
    }
  };
  
  const config = statusConfig[status];
  badge.className = `inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config.classes}`;
  badge.innerHTML = `
    <span>${config.icon}</span>
    <span>${config.text}</span>
  `;
  
  return badge;
}