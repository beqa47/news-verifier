# Georgian News Verifier - Deployment Guide

This document provides instructions for deploying the Georgian News Verifier web app to production.

## Quick Deploy to Vercel (Recommended)

Vercel offers free hosting for web apps and makes deployment extremely simple.

### Steps:

1. **Create a Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push Code to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Georgian News Verifier web app"
   git remote add origin https://github.com/YOUR_USERNAME/georgian-news-verifier-web.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Choose your repository
   - Vercel will auto-detect the Vite configuration
   - Click "Deploy"

4. **Your app will be live at**: `https://your-project-name.vercel.app`

## Alternative: Deploy to Netlify

1. **Create a Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Connect Your Repository**
   - Click "New site from Git"
   - Select your GitHub repository
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Click "Deploy"

## Alternative: Deploy to GitHub Pages

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/georgian-news-verifier-web/',
     // ... rest of config
   })
   ```

2. **Add GitHub Pages Deploy Workflow**
   - Create `.github/workflows/deploy.yml`
   - Use the provided workflow file

3. **Push to GitHub**
   - GitHub Actions will automatically build and deploy

## Environment Variables

The app doesn't require any environment variables for basic functionality. If you add backend integration later, you can set:

- `VITE_API_URL`: Backend API endpoint

## Production Considerations

1. **News Source Integration**
   - Currently uses mock data
   - To integrate real news sources, update `src/services/newsService.ts`
   - Add RSS feed parsers or API integrations

2. **Performance**
   - The built app is optimized and gzipped (~122KB)
   - Loads quickly on all devices

3. **SEO**
   - Add meta tags in `src/main.tsx` for better SEO
   - Consider adding sitemap.xml

4. **Analytics**
   - Add Google Analytics or similar tracking
   - Monitor user engagement

## Monitoring

After deployment:
- Monitor error logs in your hosting provider's dashboard
- Set up alerts for deployment failures
- Track performance metrics

## Support

For issues with deployment:
- Vercel: https://vercel.com/support
- Netlify: https://docs.netlify.com
- GitHub Pages: https://docs.github.com/en/pages

## Next Steps

1. Deploy to your chosen platform
2. Share the live URL with users
3. Integrate real Georgian news APIs
4. Add user authentication if needed
5. Implement analytics tracking
