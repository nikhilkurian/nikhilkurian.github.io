# Development Guide

## Quick Start

### Prerequisites
- Ruby 3.0+
- Bundler
- Node.js (optional, for JS optimization)

### Setup
```bash
# Install dependencies
bundle install
npm install  # Optional

# Start development server
bundle exec jekyll serve --livereload
```

## File Structure Overview

### Core Configuration Files
- `_config.yml` - Main Jekyll configuration
- `Gemfile` - Ruby dependencies
- `package.json` - Node.js dependencies

### Content Directories
- `_pages/` - Static pages (About, CV, etc.)
- `_publications/` - Research publications
- `_talks/` - Presentations and talks
- `_posts/` - Blog posts
- `_portfolio/` - Resources and tools

### Data Files (`_data/`)
- `authors.yml` - Author information
- `navigation.yml` - Site navigation
- `ui-text.yml` - UI text strings

### Assets
- `assets/css/` - Stylesheets
- `assets/js/` - JavaScript files
- `images/` - Image assets

## Common Tasks

### Adding a New Publication

1. Create a new file in `_publications/` with format: `YYYY-MM-DD-title.md`
2. Use this front matter template:

```yaml
---
title: "Publication Title"
collection: publications
permalink: /publication/short-name
date: 2024-01-01
excerpt: "Brief description of the publication"
venue: 'Journal/Conference Name'
image: 'publication-image.png'
---
```

3. Add the publication content below the front matter

### Adding a New Talk

1. Create a new file in `_talks/` with format: `YYYY-MM-DD-title.md`
2. Use this front matter template:

```yaml
---
title: "Talk Title"
collection: talks
permalink: /talk/short-name
date: 2024-01-01
excerpt: "Brief description of the talk"
venue: 'Conference/Event Name'
location: 'City, Country'
---
```

### Updating Author Information

Edit `_data/authors.yml` to update:
- Personal information
- Social media links
- Professional details

### Modifying Navigation

Edit `_data/navigation.yml` to:
- Add/remove menu items
- Change page URLs
- Reorder menu items

## Styling and Customization

### Theme Customization
- Edit `assets/css/main.scss` to modify styles
- Update `_config.yml` for theme settings
- Modify `_sass/` files for advanced styling

### JavaScript Functionality
- Main JS file: `assets/js/_main.js`
- Build optimized version: `npm run build:js`
- Watch for changes: `npm run watch:js`

## Deployment

### Local Testing
```bash
# Build the site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve
```

### Production Deployment
- Push changes to `main` branch
- GitHub Actions automatically builds and deploys
- Site is available at `https://nikhilkurian.github.io`

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Ruby version compatibility
   - Ensure all gems are installed: `bundle install`
   - Verify YAML syntax in configuration files

2. **Missing Dependencies**
   - Install Ruby dev headers: `sudo apt install ruby-dev`
   - Install build tools: `sudo apt install build-essential`

3. **Image Issues**
   - Ensure images are in the `images/` directory
   - Check file paths in front matter
   - Verify image file extensions

4. **Navigation Problems**
   - Check `_data/navigation.yml` syntax
   - Verify page URLs exist
   - Ensure proper indentation in YAML files

### Debug Mode
```bash
# Enable verbose output
bundle exec jekyll build --verbose

# Check for specific issues
bundle exec jekyll doctor
```

## Best Practices

### Content Management
- Use consistent naming conventions
- Include proper front matter for all content
- Add descriptive excerpts for better SEO
- Use appropriate image formats (PNG/JPG)

### Code Quality
- Add comments to custom code
- Follow Jekyll best practices
- Test changes locally before deploying
- Keep dependencies updated

### SEO Optimization
- Use descriptive page titles
- Include meta descriptions
- Optimize image alt text
- Maintain proper heading structure

## Useful Commands

```bash
# Development
bundle exec jekyll serve --livereload
bundle exec jekyll serve --drafts

# Building
bundle exec jekyll build
bundle exec jekyll build --incremental

# JavaScript
npm run build:js
npm run watch:js

# Dependencies
bundle update
bundle outdated
npm update
```

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Minimal Mistakes Theme](https://mmistakes.github.io/minimal-mistakes/)
- [GitHub Pages](https://pages.github.com/)
- [Liquid Template Language](https://shopify.github.io/liquid/)

---

*This guide is maintained as part of the website repository.* 