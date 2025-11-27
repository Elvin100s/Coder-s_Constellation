# Design Document

## Overview

DevMatch is a lightweight developer collaboration platform built with a modern, minimal tech stack. The architecture follows a clear separation between frontend and backend, with the frontend being a Single Page Application (SPA) built in Vanilla TypeScript using Vite, and the backend being a RESTful API built with Hono. The system uses GitHub OAuth for authentication, SQLite for data persistence, and emphasizes performance and simplicity.

The platform enables developers to:
- Authenticate using their GitHub account
- Create and manage project postings
- Browse and search for projects
- Connect with project owners via GitHub

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Browser                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   Vanilla TypeScript SPA (Vite + Tailwind CSS)        │  │
│  │   - Client-side Router                                │  │
│  │   - Page Components                                   │  │
│  │   - API Client                                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Hono Backend Server                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   API Routes                                          │  │
│  │   - Auth Routes (GitHub OAuth)                        │  │
│  │   - Project Routes (CRUD)                             │  │
│  │   - Session Middleware                                │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │   Data Layer (Drizzle ORM)                            │  │
│  │   - User Schema                                       │  │
│  │   - Project Schema                                    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  SQLite DB    │
                    └───────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  GitHub API   │
                    │  (OAuth)      │
                    └───────────────┘
```

### Technology Stack Rationale

- **Vanilla TypeScript + Vite**: Provides type safety and modern development experience without framework overhead, keeping the bundle size minimal
- **Hono**: Lightweight web framework with excellent TypeScript support and minimal dependencies
- **SQLite + Drizzle ORM**: Simple, file-based database perfect for MVPs with type-safe query building
- **Tailwind CSS**: Utility-first CSS framework that produces minimal CSS bundles and enables rapid UI development
- **GitHub OAuth**: Leverages existing developer accounts, eliminating registration friction

## Components and Interfaces

### Frontend Components

#### 1. Router (`router.ts`)
A simple client-side router that handles navigation without page reloads.

```typescript
interface Route {
  path: string;
  handler: () => void;
}

class Router {
  navigate(path: string): void;
  addRoute(path: string, handler: () => void): void;
  init(): void;
}
```

#### 2. API Client (`api/client.ts`)
Centralized HTTP client for backend communication.

```typescript
interface ApiClient {
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, data: unknown): Promise<T>;
  delete<T>(endpoint: string): Promise<T>;
}
```

#### 3. Page Components

**Navbar Component** (`components/Navbar.ts`)
```typescript
interface NavbarProps {
  isAuthenticated: boolean;
  user?: User;
}

function renderNavbar(props: NavbarProps): HTMLElement;
```

**ProjectCard Component** (`components/ProjectCard.ts`)
```typescript
interface ProjectCardProps {
  project: Project;
  owner: User;
}

function renderProjectCard(props: ProjectCardProps): HTMLElement;
```

**Button Component** (`components/Button.ts`)
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  text: string;
  variant: ButtonVariant;
  onClick: () => void;
}

function renderButton(props: ButtonProps): HTMLElement;
```

#### 4. Pages

Each page exports a `render()` function that returns an HTMLElement:

- **Home** (`pages/Home.ts`): Landing page with hero section and sign-in button
- **Dashboard** (`pages/Dashboard.ts`): Project grid with search functionality
- **ProjectDetail** (`pages/ProjectDetail.ts`): Full project information with contact button
- **CreateProject** (`pages/CreateProject.ts`): Project creation form
- **MyProjects** (`pages/MyProjects.ts`): User's project management page

### Backend Components

#### 1. Authentication Routes (`routes/auth.ts`)

```typescript
// GET /api/auth/github
// Initiates GitHub OAuth flow
function initiateGitHubAuth(c: Context): Response;

// GET /api/auth/github/callback
// Handles OAuth callback, creates/updates user session
function handleGitHubCallback(c: Context): Promise<Response>;

// GET /api/auth/me
// Returns current authenticated user
function getCurrentUser(c: Context): Response;

// POST /api/auth/logout
// Clears user session
function logout(c: Context): Response;
```

#### 2. Project Routes (`routes/projects.ts`)

```typescript
// GET /api/projects?search=query
// Lists all projects with optional search filter
function listProjects(c: Context): Promise<Response>;

// GET /api/projects/:id
// Gets single project with owner details
function getProject(c: Context): Promise<Response>;

// POST /api/projects
// Creates new project (authenticated only)
function createProject(c: Context): Promise<Response>;

// DELETE /api/projects/:id
// Deletes project (owner only)
function deleteProject(c: Context): Promise<Response>;
```

#### 3. Authentication Middleware (`middleware/auth.ts`)

```typescript
// Verifies session and attaches user to context
function authMiddleware(c: Context, next: Next): Promise<void>;

// Requires authentication, returns 401 if not authenticated
function requireAuth(c: Context, next: Next): Promise<Response | void>;
```

## Data Models

### User Schema

```typescript
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // GitHub user ID
  githubUsername: text('github_username').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  githubUrl: text('github_url').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

### Project Schema

```typescript
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey().default(sql`(lower(hex(randomblob(16))))`),
  ownerId: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  techStack: text('tech_stack').notNull(), // JSON array: ["React", "Node.js"]
  githubRepo: text('github_repo'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
```

### Relationships

- One User can have many Projects (one-to-many)
- When a User is deleted, all their Projects are cascade deleted
- Projects always have exactly one owner (User)


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Authentication Properties

**Property 1: OAuth initialization generates valid redirect**
*For any* OAuth initiation request, the generated GitHub OAuth URL should contain the correct client ID, redirect URI, and state parameter
**Validates: Requirements 1.1**

**Property 2: User data round-trip consistency**
*For any* successful GitHub OAuth response with profile data, creating or updating a user record and then retrieving it should preserve all profile fields (name, avatar URL, username, bio, GitHub URL)
**Validates: Requirements 1.2, 1.3**

**Property 3: Session creation after authentication**
*For any* successful authentication, a valid session should exist and the user should be redirected to the dashboard
**Validates: Requirements 1.4**

**Property 4: Logout clears session**
*For any* authenticated user, performing logout should result in no valid session existing
**Validates: Requirements 1.5**

### Project Creation Properties

**Property 5: Project creation associates with user**
*For any* authenticated user and valid project data (title and description), creating a project should result in a project record that references the user as owner
**Validates: Requirements 2.1**

**Property 6: Tech stack serialization round-trip**
*For any* array of tech stack tags, storing them as JSON in a project and retrieving the project should return the same array of tags
**Validates: Requirements 2.2**

**Property 7: GitHub URL validation**
*For any* GitHub repository URL matching the pattern `https://github.com/{owner}/{repo}`, the validation should accept it; for any URL not matching this pattern, validation should reject it
**Validates: Requirements 2.3**

**Property 8: Project timestamp exists**
*For any* created project, the project record should have a creation timestamp that is not null
**Validates: Requirements 2.5**

### Project Browsing Properties

**Property 9: Project list includes owner information**
*For any* request to list projects, each returned project should include the associated owner's name, avatar URL, and GitHub username
**Validates: Requirements 3.1**

**Property 10: Project card rendering completeness**
*For any* project with owner information, the rendered project card HTML should contain the project title, owner name, owner avatar URL, and all tech stack tags
**Validates: Requirements 3.2**

**Property 11: Projects ordered by creation time**
*For any* list of projects, the projects should be ordered such that for each adjacent pair, the earlier project in the list has a creation timestamp greater than or equal to the later project
**Validates: Requirements 3.3**

### Search and Filter Properties

**Property 12: Search matches across fields**
*For any* search query and project, if the query appears in the project title, description, or any tech stack tag (case-insensitive), then the project should be included in search results
**Validates: Requirements 4.1**

**Property 13: Search preserves ordering**
*For any* search query and filtered results, the relative order of projects by creation timestamp should be the same as in the unfiltered list
**Validates: Requirements 4.3**

### Contact Flow Properties

**Property 14: Contact redirect without repo**
*For any* project without a GitHub repository link, the contact button should redirect to the owner's GitHub profile URL
**Validates: Requirements 5.1**

**Property 15: Contact redirect with repo**
*For any* project with a GitHub repository link, the contact button should redirect to `{repo_url}/issues`
**Validates: Requirements 5.2**

**Property 16: Contact button exists**
*For any* project detail page, the rendered HTML should contain a contact button element
**Validates: Requirements 5.3**

### Project Management Properties

**Property 17: Owner sees action buttons**
*For any* project detail page where the viewing user is the project owner, the rendered HTML should contain edit and delete buttons
**Validates: Requirements 6.1**

**Property 18: Non-owner doesn't see action buttons**
*For any* project detail page where the viewing user is not the project owner, the rendered HTML should not contain edit or delete buttons
**Validates: Requirements 6.2**

**Property 19: Deletion removes project**
*For any* project, after a successful deletion by the owner, querying for that project should return not found
**Validates: Requirements 6.3**

**Property 20: Ownership verified before deletion**
*For any* deletion request, the system should verify that the requesting user's ID matches the project's owner ID before performing the deletion
**Validates: Requirements 6.4**

### Project Detail Properties

**Property 21: Detail page shows all project fields**
*For any* project, the detail page HTML should contain the project title, full description, and all tech stack tags
**Validates: Requirements 7.1**

**Property 22: Detail page shows owner profile**
*For any* project detail page, the rendered HTML should contain the owner's avatar, name, and bio
**Validates: Requirements 7.2**

**Property 23: Repo link displayed when present**
*For any* project with a GitHub repository link, the detail page HTML should contain the repository URL
**Validates: Requirements 7.3**

### User Projects Properties

**Property 24: User projects filtered by ownership**
*For any* authenticated user requesting their projects, all returned projects should have an owner ID matching the user's ID
**Validates: Requirements 8.1**

**Property 25: User projects show action buttons**
*For any* project in a user's projects list, the rendered HTML should contain edit and delete action buttons
**Validates: Requirements 8.2**

### UI Styling Properties

**Property 26: Button variants have correct classes**
*For any* button with variant 'primary', 'secondary', or 'ghost', the rendered button element should have the corresponding CSS classes for that variant
**Validates: Requirements 9.5**

### Data Persistence Properties

**Property 27: Project persistence**
*For any* project creation or update, immediately querying the database for that project should return the project with the correct data
**Validates: Requirements 11.1**

**Property 28: User persistence**
*For any* user authentication, immediately querying the database for that user should return the user record with GitHub profile data
**Validates: Requirements 11.2**

**Property 29: Cascade deletion**
*For any* user with associated projects, deleting the user should result in all their projects also being deleted from the database
**Validates: Requirements 11.4**

## Error Handling

### Authentication Errors

1. **OAuth Failure**: If GitHub OAuth fails or is cancelled, redirect user to home page with an error message
2. **Invalid Session**: If a session is invalid or expired, return 401 Unauthorized and clear the session cookie
3. **Missing OAuth Credentials**: If GitHub client ID or secret is not configured, log error and return 500 Internal Server Error

### Project Errors

1. **Unauthorized Project Creation**: If an unauthenticated user attempts to create a project, return 401 Unauthorized
2. **Invalid Project Data**: If required fields (title, description) are missing, return 400 Bad Request with validation errors
3. **Invalid GitHub URL**: If the GitHub repository URL doesn't match the expected pattern, return 400 Bad Request
4. **Project Not Found**: If a requested project doesn't exist, return 404 Not Found
5. **Unauthorized Deletion**: If a user attempts to delete a project they don't own, return 403 Forbidden

### Database Errors

1. **Connection Failure**: If SQLite database cannot be accessed, log error and return 500 Internal Server Error
2. **Constraint Violation**: If a database constraint is violated (e.g., duplicate GitHub username), return 409 Conflict
3. **Transaction Failure**: If a database transaction fails, rollback and return 500 Internal Server Error

### Client-Side Errors

1. **Network Failure**: Display user-friendly error message and provide retry option
2. **Invalid Route**: Redirect to 404 page for unknown routes
3. **Form Validation**: Show inline validation errors before submitting to backend

## Testing Strategy

### Unit Testing

We will use **Vitest** as the testing framework for both frontend and backend code, as it provides excellent TypeScript support and fast execution.

**Backend Unit Tests:**
- Test individual route handlers with mocked database calls
- Test middleware functions (authentication, error handling)
- Test database schema and query functions
- Test GitHub OAuth URL generation and callback handling
- Test input validation functions

**Frontend Unit Tests:**
- Test component rendering functions with sample data
- Test router navigation logic
- Test API client request formatting
- Test form validation logic
- Test utility functions (date formatting, URL building)

### Property-Based Testing

We will use **fast-check** for property-based testing in TypeScript. Each property-based test should run a minimum of 100 iterations.

**Property Test Requirements:**
- Each property-based test MUST include a comment with the format: `// Feature: devmatch-platform, Property {number}: {property_text}`
- Each correctness property MUST be implemented by a SINGLE property-based test
- Tests should use smart generators that constrain inputs to valid ranges

**Key Property Tests:**
- Property 2: Generate random GitHub profile data and test user data round-trip
- Property 6: Generate random tech stack arrays and test JSON serialization round-trip
- Property 7: Generate valid and invalid GitHub URLs and test validation
- Property 11: Generate projects with random timestamps and test ordering
- Property 12: Generate random search queries and projects and test search matching
- Property 13: Generate random projects and search queries and verify ordering is preserved
- Property 24: Generate users with multiple projects and test ownership filtering
- Property 29: Generate users with projects and test cascade deletion

### Integration Testing

- Test complete OAuth flow from initiation to callback to session creation
- Test complete project creation flow from form submission to database persistence
- Test complete search flow from query input to filtered results display
- Test complete contact flow from button click to GitHub redirect

### End-to-End Testing

While not part of the initial MVP, future E2E tests could use Playwright to test:
- Complete user journey from sign-in to project creation to browsing
- Mobile responsive behavior
- Cross-browser compatibility

## Performance Considerations

### Frontend Optimization

1. **Code Splitting**: Use Vite's dynamic imports to split code by route
2. **Lazy Loading**: Load images lazily using Intersection Observer
3. **Minimal Dependencies**: Avoid heavy libraries; use vanilla JavaScript where possible
4. **Efficient DOM Updates**: Minimize DOM manipulation; batch updates when possible
5. **CSS Optimization**: Use Tailwind's purge feature to remove unused styles

### Backend Optimization

1. **Database Indexing**: Add indexes on frequently queried fields (github_username, owner_id, created_at)
2. **Connection Pooling**: Reuse database connections instead of creating new ones
3. **Query Optimization**: Use Drizzle's query builder to generate efficient SQL
4. **Caching**: Consider adding Redis for session storage in production
5. **Response Compression**: Enable gzip compression for API responses

### Bundle Size Targets

- Initial JavaScript bundle: < 200 KB
- Initial CSS bundle: < 50 KB
- Total initial load: < 250 KB (excluding images)

## Security Considerations

1. **Session Security**: Use httpOnly, secure, and sameSite cookies for session management
2. **CSRF Protection**: Implement CSRF tokens for state-changing operations
3. **Input Validation**: Validate and sanitize all user inputs on both client and server
4. **SQL Injection Prevention**: Use Drizzle's parameterized queries (never string concatenation)
5. **XSS Prevention**: Escape all user-generated content before rendering
6. **Rate Limiting**: Implement rate limiting on API endpoints to prevent abuse
7. **OAuth State Parameter**: Use cryptographically random state parameter to prevent CSRF in OAuth flow
8. **Environment Variables**: Never commit secrets; use .env files and environment variables

## Deployment Considerations

### Development Environment

- Frontend dev server: Vite on port 5173
- Backend dev server: Hono on port 3000
- Database: SQLite file in `server/database.db`
- Environment variables in `.env` file

### Production Environment

- Frontend: Build static assets with `vite build` and serve via CDN or static hosting
- Backend: Deploy Hono server to Node.js hosting (e.g., Railway, Fly.io, or VPS)
- Database: SQLite file on server filesystem (or migrate to PostgreSQL for scale)
- Environment variables: Set via hosting platform's environment configuration
- HTTPS: Required for OAuth callback and secure cookies

## Future Enhancements

While not part of the MVP, potential future features include:

1. **Project Updates**: Allow owners to edit project details
2. **User Profiles**: Dedicated user profile pages showing all their projects
3. **Project Categories**: Add predefined categories (Web, Mobile, AI, etc.)
4. **Favorites**: Allow users to bookmark interesting projects
5. **Notifications**: Email notifications for project updates
6. **Advanced Search**: Filter by multiple criteria, date ranges, etc.
7. **Project Status**: Mark projects as "Looking for collaborators" or "Team complete"
8. **Analytics**: Track project views and interest levels
