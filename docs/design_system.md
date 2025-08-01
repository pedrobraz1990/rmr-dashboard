# RMR Dashboard Design System

## Overview
This document defines the visual identity and design guidelines for the RMR Dashboard application. All UI components should follow these guidelines to maintain consistency and brand alignment.

## Brand Identity

### Logo Usage
- **Primary Logo**: `LOGO_RMR_1.png` (2363x2363px) - Use for main branding areas
- **Alternative Logo**: `LOGO_PNG1_RMR.png` (1998x1460px) - Use for smaller spaces
- **Minimum Size**: 32px height for logos in navigation
- **Clear Space**: Maintain 1x logo height as minimum clear space around logos

### Header Backgrounds
- **Primary**: `header.png` (1128x191px) - Main header background
- **Performance**: `header2.png` (1097x186px) - Use for faster loading
- **Alternative**: `header3.png` (1128x191px) - Alternative styling option

## Color Palette

### Primary Colors
Based on the RMR logo analysis, use these colors:

```css
/* Primary Brand Colors */
--rmr-primary: #1a4b84;      /* Deep blue from logo */
--rmr-secondary: #2d7dd2;    /* Lighter blue accent */
--rmr-accent: #f39c12;       /* Orange/gold accent */
--rmr-success: #27ae60;      /* Green for success states */
--rmr-warning: #f39c12;      /* Orange for warnings */
--rmr-error: #e74c3c;        /* Red for errors */
```

### Neutral Colors
```css
/* Neutral Palette */
--rmr-white: #ffffff;
--rmr-light-gray: #f8f9fa;
--rmr-gray-100: #e9ecef;
--rmr-gray-200: #dee2e6;
--rmr-gray-300: #ced4da;
--rmr-gray-400: #adb5bd;
--rmr-gray-500: #6c757d;
--rmr-gray-600: #495057;
--rmr-gray-700: #343a40;
--rmr-gray-800: #212529;
--rmr-black: #000000;
```

### Background Colors
```css
/* Background Colors */
--rmr-bg-primary: #ffffff;
--rmr-bg-secondary: #f8f9fa;
--rmr-bg-tertiary: #e9ecef;
--rmr-bg-dark: #212529;
```

## Typography

### Font Stack
```css
/* Primary Font Stack */
--rmr-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--rmr-font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Font Sizes
```css
/* Typography Scale */
--rmr-text-xs: 0.75rem;    /* 12px */
--rmr-text-sm: 0.875rem;   /* 14px */
--rmr-text-base: 1rem;     /* 16px */
--rmr-text-lg: 1.125rem;   /* 18px */
--rmr-text-xl: 1.25rem;    /* 20px */
--rmr-text-2xl: 1.5rem;    /* 24px */
--rmr-text-3xl: 1.875rem;  /* 30px */
--rmr-text-4xl: 2.25rem;   /* 36px */
--rmr-text-5xl: 3rem;      /* 48px */
```

### Font Weights
```css
--rmr-font-light: 300;
--rmr-font-normal: 400;
--rmr-font-medium: 500;
--rmr-font-semibold: 600;
--rmr-font-bold: 700;
```

## Spacing System

### Spacing Scale
```css
/* Spacing Scale (8px base unit) */
--rmr-space-0: 0;
--rmr-space-1: 0.25rem;   /* 4px */
--rmr-space-2: 0.5rem;    /* 8px */
--rmr-space-3: 0.75rem;   /* 12px */
--rmr-space-4: 1rem;      /* 16px */
--rmr-space-5: 1.25rem;   /* 20px */
--rmr-space-6: 1.5rem;    /* 24px */
--rmr-space-8: 2rem;      /* 32px */
--rmr-space-10: 2.5rem;   /* 40px */
--rmr-space-12: 3rem;     /* 48px */
--rmr-space-16: 4rem;     /* 64px */
--rmr-space-20: 5rem;     /* 80px */
--rmr-space-24: 6rem;     /* 96px */
```

## Component Guidelines

### Buttons
```css
/* Primary Button */
.rmr-btn-primary {
  background-color: var(--rmr-primary);
  color: var(--rmr-white);
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.2s ease;
}

/* Secondary Button */
.rmr-btn-secondary {
  background-color: transparent;
  color: var(--rmr-primary);
  border: 2px solid var(--rmr-primary);
  border-radius: 6px;
  padding: 10px 22px;
  font-weight: 500;
  transition: all 0.2s ease;
}
```

### Cards
```css
/* Card Component */
.rmr-card {
  background: var(--rmr-white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--rmr-gray-200);
  padding: var(--rmr-space-6);
}
```

### Navigation
```css
/* Navigation Bar */
.rmr-nav {
  background: linear-gradient(135deg, var(--rmr-primary), var(--rmr-secondary));
  color: var(--rmr-white);
  padding: var(--rmr-space-4) var(--rmr-space-6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## Layout Guidelines

### Container Widths
```css
/* Container Breakpoints */
--rmr-container-sm: 640px;
--rmr-container-md: 768px;
--rmr-container-lg: 1024px;
--rmr-container-xl: 1280px;
--rmr-container-2xl: 1536px;
```

### Grid System
- Use CSS Grid or Flexbox for layouts
- 12-column grid system for complex layouts
- Consistent gutters: 24px (1.5rem)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Dashboard-Specific Guidelines

### Chart Colors
```css
/* Chart Color Palette */
--rmr-chart-1: #1a4b84;    /* Primary blue */
--rmr-chart-2: #2d7dd2;    /* Secondary blue */
--rmr-chart-3: #f39c12;    /* Orange */
--rmr-chart-4: #27ae60;    /* Green */
--rmr-chart-5: #e74c3c;    /* Red */
--rmr-chart-6: #9b59b6;    /* Purple */
--rmr-chart-7: #34495e;    /* Dark gray */
--rmr-chart-8: #95a5a6;    /* Light gray */
```

### Data Visualization
- Use consistent chart colors from the palette above
- Maintain good contrast for accessibility
- Include hover states for interactive charts
- Use consistent typography for chart labels and legends

### Tables
```css
/* Table Styling */
.rmr-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--rmr-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rmr-table th {
  background: var(--rmr-gray-100);
  color: var(--rmr-gray-700);
  font-weight: 600;
  padding: var(--rmr-space-4);
  text-align: left;
}

.rmr-table td {
  padding: var(--rmr-space-4);
  border-bottom: 1px solid var(--rmr-gray-200);
}
```

## Accessibility Guidelines

### Color Contrast
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- Test all color combinations for accessibility

### Focus States
```css
/* Focus States */
.rmr-focus {
  outline: 2px solid var(--rmr-primary);
  outline-offset: 2px;
}
```

### Screen Reader Support
- Use semantic HTML elements
- Include proper ARIA labels
- Provide alt text for all images
- Use proper heading hierarchy

## Responsive Design

### Breakpoints
```css
/* Responsive Breakpoints */
--rmr-breakpoint-sm: 640px;
--rmr-breakpoint-md: 768px;
--rmr-breakpoint-lg: 1024px;
--rmr-breakpoint-xl: 1280px;
--rmr-breakpoint-2xl: 1536px;
```

### Mobile-First Approach
- Design for mobile first, then enhance for larger screens
- Use flexible layouts that adapt to different screen sizes
- Ensure touch targets are at least 44px × 44px

## Implementation Notes

### CSS Variables
- Use CSS custom properties for all design tokens
- This enables easy theming and maintenance
- Prefix all variables with `--rmr-` for consistency

### File Organization
```
frontend/src/
├── styles/
│   ├── variables.css      # CSS custom properties
│   ├── components.css     # Component styles
│   ├── utilities.css      # Utility classes
│   └── responsive.css     # Responsive utilities
```

### Performance Considerations
- Optimize images before use
- Use `header2.png` for better performance
- Consider lazy loading for non-critical images
- Minimize CSS bundle size

## Next Steps for Implementation

1. **Create CSS Variables File**: Set up all design tokens as CSS custom properties
2. **Component Library**: Build reusable components following these guidelines
3. **Style Guide**: Create a living style guide for the team
4. **Testing**: Test across different devices and browsers
5. **Documentation**: Keep this document updated as the design system evolves 