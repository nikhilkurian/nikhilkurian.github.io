# =============================================================================
# Gemfile for Nikhil Cherian Kurian's Academic Website
# =============================================================================
# 
# This file manages the Ruby gems (dependencies) required for the Jekyll website.
# When you want to use a different Jekyll version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# =============================================================================

source "https://rubygems.org"

# =============================================================================
# Core Jekyll Dependencies
# =============================================================================
# GitHub Pages gem includes Jekyll and all necessary plugins for GitHub Pages
gem "github-pages", group: :jekyll_plugins

# Windows-specific dependency for file watching
gem "wdm", "~> 0.1.0" if Gem.win_platform?

# =============================================================================
# Jekyll Plugins
# =============================================================================
# These plugins extend Jekyll's functionality
group :jekyll_plugins do
  # RSS/Atom feed generation for blog posts
  gem "jekyll-feed"
  
  # XML sitemap generation for SEO
  gem 'jekyll-sitemap'
  
  # Live reload functionality for development
  gem 'hawkins'
  
  # Uncomment the line below if you want category/tag archive pages
  # gem "jekyll-archives"
end
