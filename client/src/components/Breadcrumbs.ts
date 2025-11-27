interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function renderBreadcrumbs(items: BreadcrumbItem[]): HTMLElement {
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'flex items-center space-x-2 text-sm mb-6';
  
  const breadcrumbItems = items.map((item, index) => {
    const isLast = index === items.length - 1;
    
    if (isLast) {
      return `<span class="text-neon-blue font-medium">${item.label}</span>`;
    } else {
      return `
        <a href="${item.href || '#'}" data-link class="text-gray-400 hover:text-white transition-colors">
          ${item.label}
        </a>
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      `;
    }
  }).join('');
  
  breadcrumbs.innerHTML = breadcrumbItems;
  return breadcrumbs;
}