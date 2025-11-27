# Coders Constellation 🌟

**Connect. Collaborate. Create.**

A collaborative platform for African developers to discover teammates, share project ideas, and build together.

## 🎯 Problem Statement

African developers struggle to find meaningful collaboration. Without a structured platform, they resort to generic "Looking for collaborators" posts on WhatsApp, LinkedIn, or Twitter—with little to no response. This leads to:

- **Professional isolation** - No systematic way to find like-minded developers
- **Missed opportunities** - Talent hidden in closed networks
- **Fragmented tools** - Scattered across multiple disconnected platforms

## 💡 Solution

Coders Constellation provides a dedicated space where African developers can:

- ✅ Browse and discover projects across the continent
- ✅ Post project ideas with clear tech stacks and requirements
- ✅ Connect directly with project owners via GitHub
- ✅ Search and filter by technology, country, or keywords
- ✅ Showcase their skills and find collaboration opportunities

## 🚀 Features

### Core Features (MVP)
- **Project Discovery** - Browse all projects without authentication
- **Advanced Search** - Filter by tech stack, country, or keywords
- **Project Details** - View full project information and owner profiles
- **Post Projects** - Share your project ideas and find collaborators
- **GitHub Integration** - Direct links to repositories and owner profiles
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

### Tech Stack
- **Frontend**: Vanilla TypeScript + Vite + Tailwind CSS
- **Styling**: Modern, sleek UI with Slate/Gray base and Blue accents
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel (frontend)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Step 1: Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/coders-constellation.git
cd coders-constellation
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
\`\`\`

### Step 3: Run Development Server
\`\`\`bash
npm run dev
\`\`\`

The application will open automatically at `http://localhost:5173`

### Step 4: Build for Production
\`\`\`bash
npm run build
\`\`\`

The production build will be in `client/dist/`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
\`\`\`bash
npm install -g vercel
\`\`\`

2. **Deploy**
\`\`\`bash
cd client
vercel
\`\`\`

3. **Follow the prompts**:
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: coders-constellation
   - Directory: ./
   - Override settings: No

4. **Production Deployment**
\`\`\`bash
vercel --prod
\`\`\`

Your app will be live at: `https://coders-constellation.vercel.app`

### Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set root directory to `client`
5. Click "Deploy"

## 📁 Project Structure

\`\`\`
coders-constellation/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.ts
│   │   │   └── ProjectCard.ts
│   │   ├── pages/            # Page components
│   │   │   ├── Home.ts
│   │   │   ├── Dashboard.ts
│   │   │   ├── ProjectDetail.ts
│   │   │   └── CreateProject.ts
│   │   ├── data/             # Sample data
│   │   │   └── sampleProjects.ts
│   │   ├── styles/           # CSS styles
│   │   │   └── main.css
│   │   ├── router.ts         # Client-side routing
│   │   └── main.ts           # Application entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── .kiro/                     # Spec documents
│   └── specs/
│       └── devmatch-platform/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── package.json
└── README.md
\`\`\`

## 🎨 Design Principles

- **Modern & Sleek** - Clean interface with subtle shadows and smooth transitions
- **Mobile-First** - Responsive design that works on all devices
- **Lightweight** - Fast loading times optimized for African internet speeds
- **Accessible** - WCAG 2.1 AA compliant with keyboard navigation support

## 🔧 Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
\`\`\`

### Adding New Projects

Projects are currently stored in `client/src/data/sampleProjects.ts`. To add a new project:

1. Open `client/src/data/sampleProjects.ts`
2. Add a new project object to the `sampleProjects` array
3. Follow the `Project` interface structure

## 🌍 Mission Alignment

This project aligns with African Leadership University's (ALU) mission:

- **Economic Inclusion** - Expanding access to opportunities for African developers
- **Technology & Innovation** - Leveraging digital tools to unlock Africa's tech potential
- **Leadership Development** - Empowering young African leaders through collaboration

## 📊 Success Metrics

Within the first 6 months, we aim for:
- 500+ developers posting collaboration requests
- 30% of active users forming teams
- 40%+ user retention at 30 days

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💻 Author

**Elvin Cyubahiro**
- GitHub: [@elvincyubahiro](https://github.com/elvincyubahiro)
- Organization: African Leadership University (ALU)

## 🙏 Acknowledgments

- ALU Tech Clubs for inspiration and feedback
- African developer communities across the continent
- All contributors and collaborators

---

**Built with ❤️ for African developers, by African developers**
