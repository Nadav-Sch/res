# Portfolio Website Scaffold

A clean, modern, job-ready portfolio website scaffold built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive mobile-first design**
- **Light/dark mode toggle** with localStorage persistence
- **Accessible navigation** with hamburger menu for mobile
- **Project filtering** by category
- **Smooth scrolling** and subtle animations
- **CSS variables** for easy customization
- **No external dependencies** – pure vanilla code

## File Structure

```
/
├── index.html                    # Home page
├── css/
│   └── styles.css               # All styles (light/dark modes, responsive)
├── js/
│   ├── main.js                  # Global functionality (theme, nav, smooth scroll)
│   └── projects.js              # Project filtering logic
├── projects/
│   ├── index.html               # Projects grid with filters
│   └── project-template/
│       └── index.html           # Single project detail page (reusable template)
├── about/
│   └── index.html               # About page with bio, skills, contact
├── assets/
│   ├── img/                     # Image assets (currently empty)
│   └── video/                   # Video assets (currently empty)
└── README.md                    # This file
```

## Getting Started

1. Open `index.html` in a browser to view the home page.
2. Navigate between pages using the header menu.
3. Toggle dark mode with the 🌙 button.
4. Use the hamburger menu (☰) on mobile devices.

## Customization

### Update Site Branding

Edit placeholders in all HTML files:
- `[Your Name]` → Your actual name
- `[Your Professional Title or Tagline]` → Your tagline
- Skill names and tags

### Colors & Spacing

Modify CSS variables in `css/styles.css` (`:root` section):

```css
--color-accent: #0066cc;        /* Primary color */
--color-text: #1a1a1a;           /* Text color */
--spacing-lg: 2rem;              /* Spacing scale */
```

### Typography

Change fonts and sizes via CSS variables:

```css
--font-family-sans: /* your font */;
--font-size-lg: 1.125rem;
```

## Adding a New Project

### 1. Create Project Folder

Create a new folder in `/projects/` (e.g., `/projects/my-project/`):

```
/projects/my-project/index.html
```

### 2. Copy Project Template

Copy the content from `/projects/project-template/index.html` into your new project page.

### 3. Update Paths

Change the CSS and JS paths to match your new folder depth:

```html
<!-- Instead of: -->
<link rel="stylesheet" href="../../css/styles.css">
<script src="../../js/main.js"></script>

<!-- Use: -->
<link rel="stylesheet" href="../../css/styles.css">
<script src="../../js/main.js"></script>
```

### 4. Add Project to Grid

In `/projects/index.html`, duplicate a project card and:

1. Update the `href` to point to your new project
2. Change `data-tags` to match filter categories
3. Update title, description, and tags

Example:

```html
<div class="project-card" data-tags="web">
  <div class="project-card-image">[Project Image]</div>
  <div class="project-card-content">
    <h3>My New Project</h3>
    <p>Project description goes here.</p>
    <div class="project-tags">
      <span class="tag">Web</span>
      <span class="tag">Design</span>
    </div>
    <a href="/projects/my-project/" class="project-link">View Project →</a>
  </div>
</div>
```

### 5. Add Home Page Card (Optional)

If you want to feature it on the home page, add a card to the "Featured Work" section in `/index.html`.

## Filter Categories

Projects can use these tags (in `data-tags` attribute):

- `web` – Web development projects
- `games` – Game development projects
- `audio` – Audio/music projects
- `3d` – 3D modeling/design projects
- `design` – UI/UX or graphic design projects

You can add custom categories by:

1. Adding a new filter button in `/projects/index.html`
2. Adding the corresponding `data-tags` value to project cards

## Accessibility

- **Color contrast**: All text meets WCAG AA standards
- **Focus states**: Visible outlines on interactive elements
- **Keyboard navigation**: Full keyboard support for all buttons and links
- **Reduced motion**: Respects `prefers-reduced-motion` user preference
- **Semantic HTML**: Proper heading hierarchy and semantic markup

## Performance

- **No external dependencies**: Faster load times
- **Optimized CSS**: Single stylesheet with efficient selectors
- **Vanilla JavaScript**: Minimal footprint (~3KB of code)
- **Mobile-first design**: Progressive enhancement approach

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- JavaScript: ES6+ (widely supported)

## Dark Mode

Dark mode preference is automatically saved to `localStorage`. Users can toggle between light/dark modes, and their preference persists across sessions.

## License

This is your portfolio – use it freely!