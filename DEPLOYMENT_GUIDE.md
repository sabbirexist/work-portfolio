# Netlify Deployment Guide

## Quick Deployment Steps

### Option 1: Drag & Drop (Easiest)
1. Open [Netlify](https://netlify.com) and sign up/login
2. Go to your dashboard
3. Drag and drop the `dist` folder directly onto the deployment area
4. Your site will be live instantly with a random URL
5. You can change the site name in Site Settings

### Option 2: Git Integration (Recommended for updates)
1. Push your project to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build settings:
   - **Build command**: `pnpm run build`
   - **Publish directory**: `dist`
4. Deploy automatically on every push

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project root
netlify deploy --prod --dir=dist
```

## Custom Domain Setup
1. Go to Site Settings → Domain Management
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned

## Environment Variables (if needed)
- Go to Site Settings → Environment Variables
- Add any required environment variables
- Redeploy to apply changes

## Netlify Configuration File
Create `netlify.toml` in project root for advanced configuration:

```toml
[build]
  publish = "dist"
  command = "pnpm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Performance Optimization
- Enable asset optimization in Site Settings
- Configure caching headers
- Use Netlify's CDN for global distribution

## Troubleshooting
- **Build fails**: Check Node.js version compatibility
- **404 errors**: Ensure redirects are configured for SPA
- **Slow loading**: Optimize images and enable compression

Your portfolio will be live at: `https://your-site-name.netlify.app`

