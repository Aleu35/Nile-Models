
# Vercel Launch Guide - NILES Models

## Pre-Launch Checklist

### 1. Environment Variables Setup
In Vercel Dashboard → Project Settings → Environment Variables, add:

```
VITE_SUPABASE_URL=https://mbdnovnvxotkntxybgce.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZG5vdm52eG90a250eHliZ2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Mjg5ODAsImV4cCI6MjA2NTUwNDk4MH0.dh92Ms4oxn9zw68pLKNdi8ZIlCrZyTkLjfOwp2jxrXg
NODE_ENV=production
```

### 2. Supabase Configuration for Production

#### A. Update Auth Settings
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel domain to:
   - **Site URL**: `https://your-domain.vercel.app` (or custom domain)
   - **Redirect URLs**: 
     - `https://your-domain.vercel.app/**`
     - `https://your-custom-domain.com/**` (if using custom domain)

#### B. Update RLS Policies
Ensure all Row Level Security policies are properly configured for production.

### 3. Testing Checklist

Before going live, test these features:

#### Frontend Testing
- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Model pages (Men, Women, New Faces, Talent) display properly
- [ ] Application form submission works
- [ ] Contact form works
- [ ] Responsive design on mobile/tablet
- [ ] All images and media load correctly

#### Admin Testing
- [ ] Admin login at `/admin` works
- [ ] All admin dashboard sections function:
  - [ ] Models Manager
  - [ ] Applications Manager  
  - [ ] News & Blog Manager
  - [ ] Page Content Manager
  - [ ] Navigation Manager
  - [ ] Media Manager
  - [ ] Site Settings Manager
  - [ ] Security Manager
  - [ ] Database Manager

#### Database Testing
- [ ] Model applications save to database
- [ ] Admin can view and manage applications
- [ ] User authentication works
- [ ] File uploads work (if implemented)

### 4. Performance Optimization

The project is already optimized with:
- ✅ Vite build optimization
- ✅ Image compression ready
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Asset caching headers

### 5. Launch Steps

1. **Connect to Vercel**:
   ```bash
   # If using Vercel CLI
   npm i -g vercel
   vercel
   ```

2. **Or deploy via GitHub**:
   - Connect GitHub repo to Vercel
   - Auto-deploy on push to main branch

3. **Custom Domain Setup** (when ready):
   - Add domain in Vercel Dashboard
   - Update DNS records
   - Update Supabase auth URLs

### 6. Post-Launch Monitoring

Monitor these after launch:
- [ ] Check Vercel function logs
- [ ] Monitor Supabase usage
- [ ] Test all forms and submissions
- [ ] Verify email notifications work
- [ ] Check mobile performance

### 7. SEO & Analytics (Optional)

Consider adding:
- Google Analytics
- Meta tags for social sharing
- Sitemap generation
- SEO optimization

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Project GitHub: [Your repo URL]

## Emergency Contacts

- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
