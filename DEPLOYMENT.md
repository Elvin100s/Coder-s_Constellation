# Deployment Guide 🚀

## Quick Deploy to Vercel (5 minutes)

### Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**
\`\`\`bash
npm install -g vercel
\`\`\`

2. **Navigate to client folder**
\`\`\`bash
cd client
\`\`\`

3. **Login to Vercel**
\`\`\`bash
vercel login
\`\`\`

4. **Deploy**
\`\`\`bash
vercel
\`\`\`

5. **Deploy to Production**
\`\`\`bash
vercel --prod
\`\`\`

Your app will be live at: `https://your-project-name.vercel.app`

### Option 2: Vercel Dashboard (No CLI needed)

1. **Push to GitHub**
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/coders-constellation.git
git push -u origin main
\`\`\`

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your app is live!

## Environment Variables (If needed later)

If you add a backend, set these in Vercel Dashboard:

\`\`\`
VITE_API_URL=your-api-url
\`\`\`

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Make sure you're deploying from the `client` folder
- Check that all dependencies are in `package.json`
- Run `npm run build` locally to test

### 404 on Routes
- Vercel.json is configured for SPA routing
- All routes redirect to index.html

### Slow Loading
- Images are optimized
- Bundle size is < 200KB
- Uses CDN for fonts

## Monitoring

- View deployment logs in Vercel Dashboard
- Check analytics in Vercel Analytics (free)
- Monitor performance with Vercel Speed Insights

## Updates

To update your deployed app:

\`\`\`bash
git add .
git commit -m "Update message"
git push
\`\`\`

Vercel will automatically redeploy!

---

**Need help?** Check [Vercel Documentation](https://vercel.com/docs)
