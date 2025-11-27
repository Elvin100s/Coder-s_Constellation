export function renderLoadingSpinner(): HTMLElement {
  const spinner = document.createElement('div');
  spinner.className = 'flex items-center justify-center py-16';
  
  spinner.innerHTML = `
    <div class="relative">
      <div class="w-12 h-12 border-4 border-dark-600 border-t-neon-pink rounded-full animate-spin"></div>
      <div class="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-neon-blue rounded-full animate-spin" style="animation-delay: -0.15s; animation-direction: reverse;"></div>
    </div>
  `;
  
  return spinner;
}

export function renderProjectCardSkeleton(): HTMLElement {
  const skeleton = document.createElement('div');
  skeleton.className = 'card p-6 animate-pulse';
  
  skeleton.innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-dark-600 rounded-full"></div>
        <div>
          <div class="h-4 bg-dark-600 rounded w-24 mb-2"></div>
          <div class="h-3 bg-dark-600 rounded w-16"></div>
        </div>
      </div>
      <div class="w-5 h-5 bg-dark-600 rounded"></div>
    </div>
    
    <div class="h-5 bg-dark-600 rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-dark-600 rounded w-full mb-1"></div>
    <div class="h-4 bg-dark-600 rounded w-2/3 mb-4"></div>
    
    <div class="flex flex-wrap gap-2 mb-4">
      <div class="h-6 bg-dark-600 rounded-full w-16"></div>
      <div class="h-6 bg-dark-600 rounded-full w-20"></div>
      <div class="h-6 bg-dark-600 rounded-full w-14"></div>
    </div>
    
    <div class="flex items-center justify-between">
      <div class="h-3 bg-dark-600 rounded w-20"></div>
      <div class="h-3 bg-dark-600 rounded w-24"></div>
    </div>
  `;
  
  return skeleton;
}