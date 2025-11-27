# 🗄️ Supabase Setup Guide

## Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with GitHub
3. **Create New Project**:
   - Project Name: `coders-constellation`
   - Database Password: (choose a strong password - save it!)
   - Region: Choose closest to your users
4. **Wait 2-3 minutes** for project setup

## Step 2: Get Your Credentials

1. **Go to Project Settings** → **API**
2. **Copy these values**:
   - Project URL (looks like: `https://xyzcompany.supabase.co`)
   - Anon/Public Key (long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Create Environment File

1. **In the `client` folder**, create `.env` file:
```bash
# client/.env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Replace with your actual values** from Step 2

## Step 4: Set Up Database Schema

1. **Go to Supabase Dashboard** → **SQL Editor**
2. **Copy and paste** the entire content from `supabase-schema.sql`
3. **Click "Run"** to create tables and insert sample data
4. **Wait for success message**

## Step 5: Verify Setup

1. **Go to Table Editor** in Supabase Dashboard
2. **Check that you see**:
   - `projects` table with 5 sample projects
   - `users` table with 5 sample users

## Step 6: Update Your App (Optional - for later)

To switch from mock data to Supabase:

1. **Update Dashboard.ts**:
```typescript
// Replace this line:
import { sampleProjects } from '../data/sampleProjects';

// With this:
import { ProjectService } from '../services/projectService';

// Replace renderProjects call:
const projects = await ProjectService.getAllProjects();
const formattedProjects = projects.map(ProjectService.convertToFrontendFormat);
renderProjects(formattedProjects);
```

2. **Update Users.ts**:
```typescript
// Replace this line:
import { sampleUsers } from '../data/sampleUsers';

// With this:
import { UserService } from '../services/userService';

// Replace renderUsersList call:
const users = await UserService.getAllUsers();
const formattedUsers = users.map(UserService.convertToFrontendFormat);
renderUsersList(formattedUsers);
```

## Step 7: Test Everything

1. **Restart your dev server**: `npm run dev`
2. **Check browser console** for any errors
3. **Verify data loads** from Supabase instead of mock files

## 🎯 What You Get

✅ **Real Database**: PostgreSQL with your projects and users
✅ **Real-time Updates**: Changes sync across all users
✅ **Search & Filtering**: Database-powered search
✅ **Scalability**: Handles thousands of projects/users
✅ **Free Tier**: 500MB storage, 2GB bandwidth
✅ **Automatic Backups**: Daily backups included
✅ **API Ready**: REST and GraphQL APIs

## 🔧 Advanced Features (Later)

- **Authentication**: Real GitHub OAuth
- **File Storage**: Profile pictures, project images
- **Real-time**: Live chat, notifications
- **Edge Functions**: Custom backend logic

## 🚨 Important Notes

- **Keep your `.env` file secret** - don't commit it to Git
- **The anon key is safe** to use in frontend (it's public)
- **Row Level Security** is enabled for data protection
- **Sample data** includes your existing mock projects/users

## 🆘 Troubleshooting

**Can't connect?**
- Check your URL and key are correct
- Make sure `.env` file is in `client` folder
- Restart dev server after adding `.env`

**No data showing?**
- Check Supabase Table Editor to see if data was inserted
- Look at browser console for error messages
- Verify the SQL schema ran successfully

**Need help?**
- Check [Supabase Documentation](https://supabase.com/docs)
- Join [Supabase Discord](https://discord.supabase.com)

---

**Ready to go live?** Your Supabase database will work perfectly with Vercel deployment! 🚀