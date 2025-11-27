# Quick Start Guide 🚀

## Get Your App Running in 3 Minutes

### Step 1: Install Dependencies (1 minute)
\`\`\`bash
cd client
npm install
\`\`\`

### Step 2: Start Dev Server (30 seconds)
\`\`\`bash
npm run dev
\`\`\`

### Step 3: Open Browser
Go to: **http://localhost:5174/**

✅ **Done!** Your app is running!

---

## What You Should See

1. **Landing Page** - Hero section with "Connect. Collaborate. Create."
2. **Project Grid** - 10 sample projects from African developers
3. **Search Bar** - Filter projects by tech stack or keywords
4. **Navigation** - Links to "Discover" and "Post Project"

---

## Test the Features

### Browse Projects
- Scroll through the project grid
- Each card shows project title, owner, tech stack
- Click any card to see details

### Search & Filter
- Type "React" in search bar
- Use tech filter dropdown
- See results update instantly

### View Project Details
- Click on any project card
- See full description, tech stack, owner profile
- Click "Contact Project Owner" button
- Opens GitHub profile or repo issues

### Post a Project
- Click "Post Project" in navbar
- Fill out the form
- Submit
- See success message

---

## Deploy to Vercel (5 minutes)

### Option 1: CLI
\`\`\`bash
npm install -g vercel
cd client
vercel login
vercel --prod
\`\`\`

### Option 2: GitHub + Vercel Dashboard
1. Push to GitHub
2. Go to vercel.com
3. Import repository
4. Set root directory to `client`
5. Deploy!

---

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use 5174 or 5175.

### Build Errors
\`\`\`bash
cd client
rm -rf node_modules
npm install
npm run build
\`\`\`

### Blank Page
- Check browser console (F12)
- Make sure you're in the `client` folder
- Try `npm run dev` again

---

## File Structure

\`\`\`
client/
├── src/
│   ├── components/      # Navbar, ProjectCard
│   ├── pages/           # Home, Dashboard, ProjectDetail, CreateProject
│   ├── data/            # Sample projects
│   ├── styles/          # Tailwind CSS
│   ├── router.ts        # Client-side routing
│   └── main.ts          # Entry point
├── index.html
└── package.json
\`\`\`

---

## Next Steps

1. ✅ App is running locally
2. 📹 Record your video demo (use VIDEO_SCRIPT.md)
3. 🚀 Deploy to Vercel
4. 📝 Create Google Doc with all links
5. 🎯 Submit on Canvas

---

**Need help?** Check README.md for detailed instructions!
