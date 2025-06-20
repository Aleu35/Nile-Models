
# Pre-Deployment Test Script

## Manual Testing Checklist

### 1. Core Functionality
- [ ] Homepage loads and displays correctly
- [ ] Video background plays (if applicable)
- [ ] Navigation menu works on all devices
- [ ] All links navigate to correct pages

### 2. Model Pages
- [ ] `/men` - loads without errors
- [ ] `/women` - loads without errors  
- [ ] `/new-faces` - loads without errors
- [ ] `/talent` - loads without errors

### 3. Forms
- [ ] Application form at `/apply` submits successfully
- [ ] Contact form works properly
- [ ] Admin login form functions

### 4. Admin Dashboard
- [ ] Admin can login at `/admin`
- [ ] All admin tabs load and function
- [ ] Content editing works properly

### 5. Responsive Design
- [ ] Mobile view (320px-768px)
- [ ] Tablet view (768px-1024px)
- [ ] Desktop view (1024px+)

### 6. Performance
- [ ] Page load times under 3 seconds
- [ ] Images load properly
- [ ] No console errors

### 7. SEO & Meta
- [ ] Page titles are descriptive
- [ ] Meta descriptions exist
- [ ] Open Graph tags present

### 8. Error Handling
- [ ] 404 page displays for invalid URLs
- [ ] Error messages show for failed form submissions
- [ ] Graceful handling of network issues

## Automated Tests
Run these commands before deployment:

```bash
# Build the project
npm run build

# Check for build errors
npm run build 2>&1 | grep -i error

# Verify no TypeScript errors
npx tsc --noEmit
```

## Post-Deployment Verification
After deploying to Vercel:

1. Visit the live URL
2. Test all critical user journeys
3. Check browser console for errors
4. Verify all environment variables are set
5. Test admin functionality
6. Confirm database connections work

## Performance Monitoring
Monitor these metrics post-launch:
- Core Web Vitals
- Page load speeds
- Error rates
- Database query performance
