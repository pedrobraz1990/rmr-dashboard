# RMR Dashboard Design System

This directory contains the complete RMR Dashboard design system implementation, providing a consistent and professional visual identity across the entire application.

## File Structure

```
styles/
├── variables.css      # CSS custom properties (design tokens)
├── components.css     # Reusable component styles
├── responsive.css     # Responsive utilities and breakpoints
└── README.md         # This documentation file
```

## Design Tokens

All design tokens are defined as CSS custom properties in `variables.css`:

### Colors
- **Primary**: `#1a4b84` (Deep blue from RMR logo)
- **Secondary**: `#2d7dd2` (Lighter blue accent)
- **Accent**: `#f39c12` (Orange/gold accent)
- **Success**: `#27ae60` (Green)
- **Warning**: `#f39c12` (Orange)
- **Error**: `#e74c3c` (Red)

### Typography
- **Font Family**: Inter (with system fallbacks)
- **Font Sizes**: 12px to 48px scale
- **Font Weights**: 300, 400, 500, 600, 700

### Spacing
- **Base Unit**: 8px
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

### Breakpoints
- **Small**: 640px
- **Medium**: 768px
- **Large**: 1024px
- **Extra Large**: 1280px
- **2XL**: 1536px

## Component Classes

### Buttons
```css
.rmr-btn-primary    /* Primary action button */
.rmr-btn-secondary  /* Secondary action button */
```

### Cards
```css
.rmr-card           /* Standard card container */
.rmr-card-header    /* Card header section */
.rmr-card-title     /* Card title */
.rmr-card-subtitle  /* Card subtitle */
```

### Navigation
```css
.rmr-nav            /* Navigation bar */
.rmr-nav-brand      /* Brand/logo area */
.rmr-nav-link       /* Navigation links */
.rmr-nav-tabs       /* Tab navigation */
.rmr-nav-tab        /* Individual tab */
```

### Forms
```css
.rmr-form-group     /* Form field group */
.rmr-form-label     /* Form label */
.rmr-form-control   /* Form input */
.rmr-form-select    /* Select dropdown */
```

### Alerts
```css
.rmr-alert          /* Base alert */
.rmr-alert-success  /* Success alert */
.rmr-alert-warning  /* Warning alert */
.rmr-alert-error    /* Error alert */
.rmr-alert-info     /* Info alert */
```

### Tables
```css
.rmr-table          /* Data table */
```

### Loading
```css
.rmr-loading-spinner /* Loading container */
.rmr-spinner        /* Spinning animation */
```

## Utility Classes

### Spacing
```css
.rmr-m-{0-6}        /* Margin */
.rmr-p-{0-6}        /* Padding */
.rmr-gap-{4,6}      /* Gap */
```

### Typography
```css
.rmr-text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl}  /* Font sizes */
.rmr-font-{light,normal,medium,semibold,bold}  /* Font weights */
.rmr-text-{left,center,right}                  /* Text alignment */
.rmr-text-{primary,secondary,success,warning,error,gray-600} /* Text colors */
```

### Layout
```css
.rmr-flex           /* Flexbox container */
.rmr-grid           /* CSS Grid container */
.rmr-container      /* Responsive container */
.rmr-w-full         /* Full width */
.rmr-hidden         /* Hidden element */
```

### Responsive
```css
.rmr-sm:grid-cols-2 /* Small screen grid columns */
.rmr-md:grid-cols-3 /* Medium screen grid columns */
.rmr-lg:grid-cols-4 /* Large screen grid columns */
```

## Usage Examples

### Basic Card
```html
<div class="rmr-card">
  <div class="rmr-card-header">
    <h3 class="rmr-card-title">Card Title</h3>
    <p class="rmr-card-subtitle">Card description</p>
  </div>
  <div class="rmr-p-6">
    <p>Card content goes here</p>
  </div>
</div>
```

### Button Group
```html
<div class="rmr-flex rmr-gap-2">
  <button class="rmr-btn-primary">Primary Action</button>
  <button class="rmr-btn-secondary">Secondary Action</button>
</div>
```

### Responsive Grid
```html
<div class="rmr-grid rmr-grid-cols-1 rmr-md:grid-cols-2 rmr-lg:grid-cols-3 rmr-gap-6">
  <div class="rmr-card">Item 1</div>
  <div class="rmr-card">Item 2</div>
  <div class="rmr-card">Item 3</div>
</div>
```

### Form
```html
<div class="rmr-form-group">
  <label class="rmr-form-label">Field Label</label>
  <input type="text" class="rmr-form-control" />
</div>
```

## Best Practices

1. **Use Design Tokens**: Always use CSS custom properties instead of hardcoded values
2. **Mobile First**: Design for mobile first, then enhance for larger screens
3. **Consistent Spacing**: Use the spacing scale consistently throughout the app
4. **Accessibility**: Ensure proper contrast ratios and focus states
5. **Semantic HTML**: Use appropriate HTML elements with CSS classes

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS custom properties support required

## Customization

To customize the design system:

1. Modify values in `variables.css`
2. Add new component styles in `components.css`
3. Extend responsive utilities in `responsive.css`
4. Update this documentation

## Integration

The design system is automatically imported in `index.css` and applied globally to the application. No additional setup is required. 