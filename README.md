# Nikhil Cherian Kurian - Academic Website

[![Build Status](https://github.com/nikhilkurian/nikhilkurian.github.io/workflows/Build/badge.svg)](https://github.com/nikhilkurian/nikhilkurian.github.io/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This is the source code for my academic website hosted at [nikhilkurian.github.io](https://nikhilkurian.github.io). The website showcases my research, publications, talks, and professional experience in the field of machine learning and medical image analysis.

## About Me

I am a Post-doctoral Research Staff at the [Australian Institute of Machine Learning (AIML)](https://adelaide.edu.au/aiml/), University of Adelaide. My research focuses on developing robust deep learning algorithms for medical image analysis, particularly in computational pathology and histopathology.

## Website Features

- **Publications**: Complete list of research publications with links to papers
- **CV/Resume**: Detailed academic and professional background
- **Talks & Presentations**: Conference presentations and invited talks
- **Resources**: Useful tools and resources for the research community
- **Responsive Design**: Mobile-friendly layout using Minimal Mistakes Jekyll theme
- **SEO Optimized**: Proper meta tags and sitemap generation

## Technology Stack

- **Static Site Generator**: [Jekyll](https://jekyllrb.com/)
- **Theme**: [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)
- **Hosting**: [GitHub Pages](https://pages.github.com/)
- **CSS Framework**: Custom SCSS with responsive design
- **JavaScript**: jQuery with custom plugins for enhanced functionality

## Local Development

### Prerequisites

- Ruby 3.0 or higher
- RubyGems
- Bundler
- Node.js (for JavaScript build tools)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nikhilkurian/nikhilkurian.github.io.git
   cd nikhilkurian.github.io
   ```

2. **Install Ruby dependencies**:
   ```bash
   bundle install
   ```

3. **Install Node.js dependencies** (optional, for JavaScript optimization):
   ```bash
   npm install
   ```

### Running Locally

1. **Start the development server**:
   ```bash
   bundle exec jekyll serve
   ```

2. **Open your browser** and navigate to `http://localhost:4000`

3. **For live reload during development**:
   ```bash
   bundle exec jekyll serve --livereload
   ```

### Building for Production

```bash
bundle exec jekyll build
```

The built site will be in the `_site` directory.

## Project Structure

```
nikhilkurian.github.io/
├── _config.yml              # Main Jekyll configuration
├── _data/                   # Site data files
│   ├── authors.yml         # Author information
│   ├── navigation.yml      # Navigation menu
│   └── ui-text.yml        # UI text strings
├── _includes/              # Reusable HTML components
├── _layouts/               # Page layout templates
├── _pages/                 # Static pages
├── _posts/                 # Blog posts
├── _publications/          # Publication entries
├── _talks/                 # Talk and presentation entries
├── _teaching/              # Teaching experience
├── _portfolio/             # Portfolio/resource items
├── assets/                 # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── fonts/             # Font files
├── images/                 # Image assets
└── Gemfile                 # Ruby dependencies
```

## Configuration

### Main Configuration (`_config.yml`)

The main configuration file contains:
- Site metadata and SEO settings
- Author information and social links
- Theme customization options
- Plugin configurations
- Collection definitions

### Navigation (`_data/navigation.yml`)

Defines the main navigation menu structure.

### Authors (`_data/authors.yml`)

Contains author information used throughout the site.

## Content Management

### Adding Publications

1. Create a new markdown file in `_publications/`
2. Use the following front matter format:
   ```yaml
   ---
   title: "Publication Title"
   collection: publications
   permalink: /publication/short-name
   date: YYYY-MM-DD
   excerpt: "Brief description"
   venue: 'Journal/Conference Name'
   image: 'image-filename.png'
   ---
   ```

### Adding Talks

1. Create a new markdown file in `_talks/`
2. Use the following front matter format:
   ```yaml
   ---
   title: "Talk Title"
   collection: talks
   permalink: /talk/short-name
   date: YYYY-MM-DD
   excerpt: "Brief description"
   venue: 'Conference/Event Name'
   location: 'City, Country'
   ---
   ```

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process:

1. GitHub Actions builds the site using Jekyll
2. Generated files are deployed to the `gh-pages` branch
3. GitHub Pages serves the content from the `gh-pages` branch

## Contributing

If you find any issues or have suggestions for improvements, please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) Jekyll theme by Michael Rose
- [Jekyll](https://jekyllrb.com/) static site generator
- [GitHub Pages](https://pages.github.com/) for hosting

## Contact

- **Email**: nikhilcherian30@gmail.com
- **Website**: [nikhilkurian.github.io](https://nikhilkurian.github.io)
- **Google Scholar**: [Nikhil Cherian Kurian](https://scholar.google.com/citations?user=5oEir04AAAAJ&hl=en)
- **LinkedIn**: [Nikhil Cherian Kurian](https://www.linkedin.com/in/nikhil-cherian-kurian-7bba285b)
- **ResearchGate**: [Nikhil Kurian](https://www.researchgate.net/profile/Nikhil_Kurian2)

---

*Last updated: July 2024*



