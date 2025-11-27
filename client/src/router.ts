type RouteHandler = () => void;

interface Route {
  path: string;
  handler: RouteHandler;
}

class Router {
  private routes: Route[] = [];
  private currentPath: string = '/';

  constructor() {
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('[data-link]')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) this.navigate(href);
      }
    });
  }

  addRoute(path: string, handler: RouteHandler) {
    this.routes.push({ path, handler });
  }

  navigate(path: string) {
    window.history.pushState({}, '', path);
    this.currentPath = path;
    this.handleRoute();
  }

  private handleRoute() {
    const path = window.location.pathname;
    this.currentPath = path;

    // Match exact routes first
    const exactRoute = this.routes.find(route => route.path === path);
    if (exactRoute) {
      exactRoute.handler();
      return;
    }

    // Match dynamic routes (e.g., /projects/:id)
    for (const route of this.routes) {
      const pattern = new RegExp('^' + route.path.replace(/:\w+/g, '([^/]+)') + '$');
      if (pattern.test(path)) {
        route.handler();
        return;
      }
    }

    // 404 - redirect to home
    this.navigate('/');
  }

  init() {
    this.handleRoute();
  }

  getParam(paramName: string): string | null {
    const path = this.currentPath;
    const route = this.routes.find(r => {
      const pattern = new RegExp('^' + r.path.replace(/:\w+/g, '([^/]+)') + '$');
      return pattern.test(path);
    });

    if (!route) return null;

    const pattern = new RegExp('^' + route.path.replace(/:\w+/g, '([^/]+)') + '$');
    const match = path.match(pattern);
    
    if (!match) return null;

    const paramNames = route.path.match(/:\w+/g)?.map(p => p.slice(1)) || [];
    const paramIndex = paramNames.indexOf(paramName);
    
    return paramIndex >= 0 ? match[paramIndex + 1] : null;
  }
}

export const router = new Router();