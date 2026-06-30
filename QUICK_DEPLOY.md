# Quick Deployment Guide

Deploy the Georgian News Verifier to the web in 5 minutes!

## Option 1: Deploy to Vercel (Easiest - Recommended)

### Step 1: Create a GitHub Repository
```bash
# In your GitHub account, create a new repository called "georgian-news-verifier-web"

# Then push the code:
git remote add origin https://github.com/YOUR_USERNAME/georgian-news-verifier-web.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account and the "georgian-news-verifier-web" repository
4. Click "Import"
5. Vercel will auto-detect the Vite configuration
6. Click "Deploy"

### Step 3: Your App is Live! 🎉
Your app will be available at: `https://georgian-news-verifier-web.vercel.app`

**That's it!** Every time you push to GitHub, Vercel automatically redeploys.

---

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Connect to Netlify
1. Go to https://netlify.com
2. Click "New site from Git"
3. Select GitHub and your repository
4. Configure build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

### Step 3: Your App is Live! 🎉
Your app will be available at: `https://your-site-name.netlify.app`

---

## Option 3: Deploy to GitHub Pages

### Step 1: Update vite.config.ts
```typescript
export default defineConfig({
  base: '/georgian-news-verifier-web/',
  plugins: [react()],
})
```

### Step 2: Enable GitHub Pages
1. Go to your repository Settings
2. Scroll to "Pages"
3. Select "Deploy from a branch"
4. Choose "main" branch and "/root` folder
5. Save

### Step 3: GitHub Actions Deploys Automatically
The workflow file `.github/workflows/deploy.yml` will automatically build and deploy on every push.

Your app will be available at: `https://YOUR_USERNAME.github.io/georgian-news-verifier-web/`

---

## Verify Your Deployment

After deployment, check:
- [ ] App loads without errors
- [ ] Dark mode toggle works
- [ ] News stories display correctly
- [ ] Clicking stories shows comparison view
- [ ] Settings page is accessible
- [ ] Responsive design works on mobile

## Troubleshooting

### Build Fails
- Check that `pnpm install` completed successfully
- Verify Node.js version is 18+
- Check for TypeScript errors: `pnpm check`

### App Shows Blank Page
- Check browser console for errors (F12)
- Clear browser cache and reload
- Verify all dependencies installed: `pnpm install`

### Slow Performance
- The app is optimized (~122KB gzipped)
- First load may be slower on 3G
- Subsequent loads are cached

## Next Steps

1. **Share Your App**
   - Share the live URL with friends and colleagues
   - Get feedback on the news comparison feature

2. **Integrate Real News APIs**
   - Update `src/services/newsService.ts`
   - Add RSS feed parsers for Georgian news sources
   - Implement real-time news fetching

3. **Add More Features**
   - User authentication
   - Saved preferences
   - Advanced search
   - Fact-checking database

4. **Monitor Performance**
   - Set up analytics (Google Analytics, Plausible)
   - Monitor error logs
   - Track user engagement

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Pages Docs**: https://pages.github.com
- **Vite Docs**: https://vitejs.dev

---

**Your Georgian News Verifier is now live on the web! 🚀**
