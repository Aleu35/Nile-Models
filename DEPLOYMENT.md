
# Vercel Deployment Guide

## Quick Deploy Steps

1. **Push to GitHub** (if not already done):
   - Use the GitHub button in Lovable to connect and push your code

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository

3. **Environment Variables**:
   Add these in Vercel's project settings:
   ```
   VITE_SUPABASE_URL=https://mbdnovnvxotkntxybgce.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZG5vdm52eG90a250eHliZ2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Mjg5ODAsImV4cCI6MjA2NTUwNDk4MH0.dh92Ms4oxn9zw68pLKNdi8ZIlCrZyTkLjfOwp2jxrXg
   ```

4. **Deploy**: 
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

## Supabase Configuration

Your Supabase project is already configured and ready to go! You can manage everything through the Supabase dashboard:

- **Database**: View and edit your tables
- **Authentication**: Manage users and auth settings  
- **Storage**: Handle file uploads
- **API**: All endpoints are automatically available

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Domains" 
3. Add your custom domain
4. Follow DNS configuration instructions

## Content Management

You can edit your site content through:
- **Supabase Dashboard**: Direct database access
- **Your deployed site**: If you add admin features later
- **Lovable**: Continue editing and changes will auto-deploy

## Free Tier Limits

**Vercel Free:**
- 100GB bandwidth/month
- Unlimited personal projects
- Custom domains included

**Supabase Free:**
- 500MB database storage
- 50,000 monthly active users
- 5GB bandwidth/month
- 1GB file storage

Both are very generous for most projects!
