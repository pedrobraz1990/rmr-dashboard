# Assets Directory

This directory contains all static assets for the RMR Dashboard frontend application.

## Folder Structure

```
assets/
├── images/     # General images, photos, backgrounds
├── logos/      # Company logos, brand assets
└── icons/      # UI icons, small graphics
```

## Current Assets

### Logos (`/logos/`)
- `LOGO_RMR_1.png` (2363x2363px, 159KB) - Main RMR logo, square format
- `LOGO_PNG1_RMR.png` (1998x1460px, 137KB) - Alternative RMR logo, rectangular format

### Header Images (`/images/`)
- `header.png` (1128x191px, 241KB) - Primary header background
- `header2.png` (1097x186px, 21KB) - Secondary header background (smaller file size)
- `header3.png` (1128x191px, 115KB) - Alternative header background

## Usage Guidelines

### Importing RMR Assets in React Components

```javascript
// Import RMR logos
import rmrLogoMain from '../assets/logos/LOGO_RMR_1.png';
import rmrLogoAlt from '../assets/logos/LOGO_PNG1_RMR.png';

// Import header images
import headerBg from '../assets/images/header.png';
import headerBg2 from '../assets/images/header2.png';
import headerBg3 from '../assets/images/header3.png';

// Use in JSX
<img src={rmrLogoMain} alt="RMR Dashboard Logo" />
<div style={{ backgroundImage: `url(${headerBg})` }}>
```

### Recommended Usage

#### Logos
- **LOGO_RMR_1.png**: Use for main branding, navigation, and high-visibility areas
- **LOGO_PNG1_RMR.png**: Use for smaller spaces or when rectangular format works better

#### Header Images
- **header.png**: Primary header background (largest file, highest quality)
- **header2.png**: Lightweight alternative (smallest file size)
- **header3.png**: Alternative styling option

### File Naming Conventions

- Use **kebab-case** for file names: `company-logo.png`, `dashboard-background.jpg`
- Include descriptive names that indicate the content
- Add size suffixes for responsive images: `logo-small.png`, `logo-large.png`

### Supported Formats

- **Images**: PNG, JPG, JPEG, SVG, WebP
- **Icons**: SVG (preferred), PNG
- **Logos**: SVG (preferred for scalability), PNG

### Best Practices

1. **Optimize images** before adding them to reduce file size
2. **Use SVG** for logos and icons when possible (scalable, smaller file size)
3. **Keep file sizes reasonable** - aim for under 500KB for most images
4. **Use descriptive alt text** when displaying images in components
5. **Consider responsive images** - use different sizes for different screen sizes

### Performance Notes

- `header2.png` is the most optimized (21KB) - consider using this for faster loading
- `header.png` is the largest (241KB) - use sparingly or consider optimization
- Both logos are high-resolution - consider creating smaller versions for mobile

## Adding New Assets

1. Place files in the appropriate subdirectory
2. Follow the naming conventions above
3. Update this README if adding new asset types
4. Consider adding TypeScript declarations for better IDE support
5. Optimize images to reduce file size while maintaining quality 