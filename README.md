# Video Editor Portfolio Website

A stunning, minimalistic video editing portfolio website with a glossy black navy blue theme, built with React and optimized for Netlify deployment.

## ✨ Features

- **Glossy Glass Morphism Design**: Beautiful black navy blue theme with glass-like finishes
- **Dark/Light Mode Toggle**: Seamless theme switching with enhanced visual effects
- **JSON-Based Content Management**: Easy content updates without touching code
- **Video Platform Support**: Embed videos from YouTube, Vimeo, and other platforms
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Animations**: Smooth hover effects and transitions
- **Filter System**: Categorize and filter video projects
- **Testimonials Section**: Client feedback with star ratings
- **Contact Integration**: Direct email links and social media integration

## 🚀 Quick Start

### 1. Update Your Content

Edit the `public/content.json` file to customize your portfolio:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Video Editor & Creative Storyteller",
    "bio": "Your professional bio...",
    "email": "your.email@example.com",
    "social": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourusername",
      "instagram": "https://instagram.com/yourusername",
      "twitter": "https://twitter.com/yourusername"
    }
  },
  "videos": [
    {
      "id": 1,
      "title": "Your Video Title",
      "description": "Video description...",
      "embedUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
      "thumbnail": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
      "client": "Client Name",
      "role": "Your Role",
      "tools": "Software Used",
      "duration": "Video Length",
      "year": "2024",
      "category": "Commercial",
      "featured": true
    }
  ]
}
```

### 2. Supported Video Platforms

The website automatically handles embed URLs for:
- **YouTube**: `https://www.youtube.com/watch?v=VIDEO_ID` or `https://youtu.be/VIDEO_ID`
- **Vimeo**: `https://vimeo.com/VIDEO_ID`
- **Direct Embed URLs**: Already formatted embed URLs

### 3. Adding/Removing Videos

To add a new video:
1. Open `public/content.json`
2. Add a new video object to the `videos` array
3. Set `featured: true` to highlight important projects
4. Choose appropriate `category` for filtering

To remove a video:
1. Delete the video object from the `videos` array in `content.json`

### 4. Customizing Sections

You can enable/disable sections by modifying the `settings` object in `content.json`:

```json
"settings": {
  "showTestimonials": true,
  "showSkills": true,
  "videosPerPage": 6,
  "defaultTheme": "dark",
  "contactFormEnabled": true,
  "socialLinksEnabled": true
}
```

## 🎨 Theme Customization

The website features a stunning black navy blue theme with glass morphism effects. The CSS variables can be customized in `src/App.css`:

### Dark Theme Colors
- Background: Black to navy blue gradient
- Glass cards: Semi-transparent with backdrop blur
- Buttons: Navy blue with glow effects
- Borders: Subtle navy blue accents

### Glass Effects
- Backdrop blur with saturation
- Multiple shadow layers
- Subtle border highlights
- Hover animations with enhanced glow

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Touch-friendly interactions
- Optimized typography scaling
- Adaptive grid layouts

## 🛠 Development

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Local Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Project Structure
```
video-portfolio/
├── public/
│   ├── content.json          # Portfolio content configuration
│   └── favicon.ico
├── src/
│   ├── components/ui/        # Reusable UI components
│   ├── hooks/
│   │   └── useContent.js     # Content loading hook
│   ├── App.jsx              # Main application component
│   ├── App.css              # Styles and theme
│   └── main.jsx             # Application entry point
├── dist/                    # Production build output
└── package.json
```

## 🚀 Deployment

### Netlify Deployment

1. **Build the project**:
   ```bash
   pnpm run build
   ```

2. **Deploy to Netlify**:
   - Upload the `dist` folder to Netlify
   - Or connect your Git repository for automatic deployments

3. **Netlify Configuration** (optional `netlify.toml`):
   ```toml
   [build]
     publish = "dist"
     command = "pnpm run build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Other Hosting Platforms

The `dist` folder contains all static files needed for deployment on:
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

## 📝 Content Management Tips

### Video Thumbnails
- YouTube: Automatically generated from video ID
- Vimeo: Use custom thumbnail URLs
- Custom: Upload images and reference them

### Categories
Common video categories:
- Commercial
- Documentary
- Music Video
- Corporate
- Social Media
- Event
- Wedding
- Short Film

### SEO Optimization
- Update the page title in `index.html`
- Add meta descriptions
- Use descriptive video titles and descriptions
- Include relevant keywords in content

## 🎯 Best Practices

### Content Updates
1. Always validate JSON syntax before saving
2. Use consistent naming conventions
3. Optimize images for web (WebP format recommended)
4. Keep video descriptions concise but informative

### Performance
- Compress images before uploading
- Use appropriate video thumbnail sizes
- Test loading speed regularly
- Monitor Core Web Vitals

### Accessibility
- Provide alt text for images
- Use semantic HTML structure
- Ensure sufficient color contrast
- Test with screen readers

## 🔧 Troubleshooting

### Common Issues

**Videos not loading:**
- Check embed URL format
- Ensure video is publicly accessible
- Verify platform-specific embed settings

**Content not updating:**
- Clear browser cache
- Check JSON syntax validity
- Ensure content.json is in public folder

**Styling issues:**
- Check CSS custom properties
- Verify class names match
- Test in different browsers

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the content.json structure
3. Test in a clean browser environment
4. Verify all file paths are correct

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies.**

