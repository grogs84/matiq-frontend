# MatIQ Frontend Style Guide

**A comprehensive guide to styling conventions, Tailwind usage, and component patterns for the MatIQ wrestling platform.**

---

## Table of Contents

1. [Overview](#overview)
2. [Tailwind CSS Conventions](#tailwind-css-conventions)
3. [Component Structure](#component-structure)
4. [Class Naming Conventions](#class-naming-conventions)
5. [Responsive Design](#responsive-design)
6. [Component Library](#component-library)
7. [Color System](#color-system)
8. [Typography](#typography)
9. [Code Examples](#code-examples)
10. [Best Practices](#best-practices)

---

## Overview

This style guide establishes consistent styling patterns across the MatIQ frontend application. We use **Tailwind CSS** as our primary styling solution with a custom design system optimized for wrestling data presentation.

### Key Principles

- **Utility-First**: Use Tailwind utility classes for maximum flexibility
- **Component Composition**: Build reusable components using composition patterns
- **Responsive by Default**: Mobile-first responsive design
- **Accessible**: Follow WCAG guidelines for accessibility
- **Performance-Focused**: Minimize CSS bundle size through dead code elimination

---

## Tailwind CSS Conventions

### Class Ordering Standard

Follow this order for Tailwind utility classes to maintain consistency:

1. **Layout & Positioning**: `relative`, `absolute`, `flex`, `grid`, `block`, etc.
2. **Sizing**: `w-*`, `h-*`, `max-w-*`, `min-h-*`, etc.
3. **Spacing**: `p-*`, `m-*`, `space-*`, `gap-*`, etc.
4. **Typography**: `text-*`, `font-*`, `leading-*`, `tracking-*`, etc.
5. **Visual**: `bg-*`, `border-*`, `rounded-*`, `shadow-*`, etc.
6. **Transitions**: `transition-*`, `duration-*`, `ease-*`, etc.
7. **Responsive Variants**: `sm:*`, `md:*`, `lg:*`, `xl:*`, etc.
8. **State Variants**: `hover:*`, `focus:*`, `active:*`, `dark:*`, etc.

#### Example:
```jsx
<div className="relative flex items-center justify-center w-full max-w-md p-6 bg-white border border-neutral-200 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-neutral-800 dark:border-neutral-700">
  Content
</div>
```

### Custom Component Classes

Use our predefined component classes for common patterns:

```css
/* Available component classes in index.css */
.card               /* Base card styling */
.input-field        /* Form input styling */
.badge-primary      /* Primary badge */
.badge-secondary    /* Secondary badge */
.gradient-text      /* Gradient text effect */
.glass              /* Glass morphism effect */
.hero-gradient      /* Hero section background */
```

---

## Component Structure

### File Organization

```
src/
├── components/
│   ├── common/         # Shared layout components
│   ├── ui/            # Basic UI components
│   └── [feature]/     # Feature-specific components
├── features/
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       └── services/
```

### Component Anatomy

#### Standard Component Structure:

```jsx
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ComponentName - Brief description
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant='default'] - Component variant
 * @returns {JSX.Element} The ComponentName component
 */
function ComponentName({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) {
  // Component logic here
  
  return (
    <div className={`base-classes ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

---

## Class Naming Conventions

### Component Classes (CSS)

- Use **lowercase with hyphens** for custom CSS classes
- Prefix with component name for specificity
- Use semantic naming

```css
/* Good */
.card-header { }
.search-dropdown { }
.profile-badge { }

/* Avoid */
.blueButton { }
.container1 { }
.temp { }
```

### React Props and Variables

- Use **camelCase** for props and state variables
- Use descriptive names
- Boolean props should be questions or states

```jsx
// Good
const { isLoading, userProfile, onSubmit } = props;

// Avoid  
const { loading, data, click } = props;
```

---

## Responsive Design

### Breakpoint System

```javascript
// Tailwind breakpoints
sm: '640px',   // Small devices
md: '768px',   // Medium devices  
lg: '1024px',  // Large devices
xl: '1280px',  // Extra large devices
2xl: '1536px'  // 2X large devices
```

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```jsx
<div className="
  flex flex-col gap-2              // Mobile: vertical stack, small gap
  sm:flex-row sm:gap-4             // Small+: horizontal, larger gap
  lg:gap-6                         // Large+: even larger gap
">
  <div className="
    w-full                         // Mobile: full width
    sm:w-1/2                       // Small+: half width
    lg:w-1/3                       // Large+: third width
  ">
    Content
  </div>
</div>
```

### Common Responsive Patterns

#### Container Padding:
```jsx
<div className="px-4 sm:px-6 lg:px-8">
```

#### Typography Scaling:
```jsx
<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
```

#### Grid Layouts:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
```

---

## Component Library

### Layout Components

#### Layout
Provides consistent page structure with flexible content areas.

```jsx
import { Layout } from '../components/common';

<Layout background="gradient" maxWidth={true} padding={true}>
  <YourPageContent />
</Layout>
```

#### Section
Semantic section wrapper with optional header components.

```jsx
import { Section } from '../components/common';

<Section centered>
  <Section.Header>
    <Section.Title>Wrestling Statistics</Section.Title>
    <Section.Description>Comprehensive match data and analytics</Section.Description>
  </Section.Header>
  <StatisticsContent />
</Section>
```

### UI Components

#### Button
Flexible button with multiple variants and states.

```jsx
import { Button } from '../components/ui';

<Button 
  variant="primary" 
  size="lg" 
  loading={isSubmitting}
  onClick={handleSubmit}
>
  Submit Form
</Button>
```

**Variants:** `primary`, `secondary`, `accent`, `outline`, `ghost`
**Sizes:** `sm`, `md`, `lg`

#### Card
Composable card component for content grouping.

```jsx
import { Card } from '../components/ui';

<Card hover clickable onClick={handleCardClick}>
  <Card.Header>
    <h3 className="text-lg font-semibold">Wrestler Profile</h3>
  </Card.Header>
  <Card.Content>
    <p>Wrestler information and statistics</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="outline" size="sm">View Details</Button>
  </Card.Footer>
</Card>
```

#### Input
Form input with consistent styling and validation states.

```jsx
import { Input } from '../components/ui';

<Input
  type="text"
  placeholder="Search wrestlers..."
  value={searchQuery}
  onChange={handleSearch}
  error={validationError}
  disabled={isLoading}
/>
```

---

## Color System

### Primary Colors (Wrestling Theme)

```javascript
primary: {
  50: '#f0f9ff',   // Very light blue
  500: '#0ea5e9',  // Main brand blue  
  600: '#0284c7',  // Primary buttons
  900: '#0c4a6e',  // Dark text
}

accent: {
  400: '#facc15',  // Gold accents
  500: '#eab308',  // Action items
}

ncaa: {
  navy: '#003366',  // NCAA navy
  blue: '#0066cc',  // NCAA blue
  gold: '#ffcc00',  // NCAA gold
}
```

### Usage Guidelines

```jsx
// Backgrounds
<div className="bg-primary-50 dark:bg-neutral-900">        // Light backgrounds
<div className="bg-primary-600">                           // Primary actions

// Text
<p className="text-neutral-900 dark:text-white">           // Body text
<h1 className="text-primary-600 dark:text-primary-400">    // Headings

// Borders
<div className="border border-neutral-200 dark:border-neutral-700">
```

---

## Typography

### Font Stack

```javascript
fontFamily: {
  'sans': ['Inter', 'system-ui', 'sans-serif'],      // Body text
  'display': ['Poppins', 'system-ui', 'sans-serif'], // Headings
  'mono': ['JetBrains Mono', 'Fira Code', 'monospace'], // Code
}
```

### Typography Scale

```jsx
// Headings
<h1 className="text-4xl lg:text-5xl font-bold font-display">  // Main titles
<h2 className="text-2xl lg:text-3xl font-semibold">          // Section titles  
<h3 className="text-xl font-medium">                         // Subsection titles

// Body text
<p className="text-base leading-relaxed">                    // Paragraphs
<span className="text-sm text-neutral-600">                 // Secondary text
<caption className="text-xs text-neutral-500">              // Captions
```

---

## Code Examples

### Complete Component Example

```jsx
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, Button, Badge } from '../ui';

/**
 * WrestlerCard - Display wrestler information in a card format
 * @component
 */
function WrestlerCard({ wrestler, onViewProfile, className = '' }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleViewProfile = async () => {
    setIsLoading(true);
    await onViewProfile(wrestler.slug);
    setIsLoading(false);
  };

  return (
    <Card 
      hover 
      className={`group ${className}`}
    >
      <Card.Header>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {wrestler.name}
          </h3>
          <Badge variant="primary">
            {wrestler.weightClass}
          </Badge>
        </div>
      </Card.Header>

      <Card.Content>
        <div className="space-y-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {wrestler.school}
          </p>
          <div className="flex gap-2">
            <span className="text-xs text-neutral-500">
              Record: {wrestler.wins}-{wrestler.losses}
            </span>
          </div>
        </div>
      </Card.Content>

      <Card.Footer>
        <Button 
          variant="outline" 
          size="sm" 
          fullWidth
          loading={isLoading}
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default WrestlerCard;
```

### Form Component Example

```jsx
import { useState } from 'react';
import { Input, Button, Alert } from '../ui';

function SearchForm({ onSearch, className = '' }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      await onSearch(query.trim());
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
    >
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Search wrestlers, schools, or tournaments..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          error={error}
          disabled={isLoading}
          className="w-full"
        />
        {error && (
          <Alert variant="error" size="sm">
            {error}
          </Alert>
        )}
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        loading={isLoading}
        disabled={!query.trim()}
        fullWidth
      >
        Search
      </Button>
    </form>
  );
}
```

---

## Best Practices

### Performance

1. **Use Tailwind's built-in classes** instead of custom CSS when possible
2. **Leverage the component class system** for frequently used patterns
3. **Avoid deep nesting** of utility classes
4. **Use responsive variants efficiently** - don't over-specify breakpoints

```jsx
// Good - efficient responsive design
<div className="text-sm md:text-base lg:text-lg">

// Avoid - unnecessary breakpoint specifications  
<div className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg">
```

### Accessibility

1. **Always include proper ARIA labels** for interactive elements
2. **Ensure sufficient color contrast** (minimum 4.5:1 ratio)
3. **Use semantic HTML elements** with Tailwind styling
4. **Test with keyboard navigation**

```jsx
// Good - accessible button
<button 
  className="btn-primary focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  aria-label="Submit search form"
  type="submit"
>
  Search
</button>
```

### Maintainability

1. **Extract repeated patterns** into component classes
2. **Use consistent naming** across components
3. **Document complex utility combinations**
4. **Keep components focused** - single responsibility principle

```jsx
// Good - extracted pattern
const cardStyles = "card p-6 hover:shadow-lg transition-all duration-300";

// Good - documented complex pattern
<div className={`
  relative overflow-hidden               // Container setup
  bg-gradient-to-br from-primary-50      // Gradient background
  before:absolute before:inset-0         // Overlay positioning
  before:bg-hero-pattern before:opacity-5 // Pattern overlay
`}>
```

### Dark Mode

Always provide dark mode variants for better user experience:

```jsx
<div className="
  bg-white dark:bg-neutral-800
  text-neutral-900 dark:text-white  
  border-neutral-200 dark:border-neutral-700
">
```

---

## Conclusion

This style guide ensures consistency, maintainability, and performance across the MatIQ frontend application. When in doubt, favor:

- **Tailwind utilities** over custom CSS
- **Component composition** over monolithic components  
- **Mobile-first** responsive design
- **Accessibility** and semantic HTML
- **Performance** and bundle size optimization

For questions or suggestions about these conventions, please refer to the team documentation or create an issue in the project repository.

---

**Last Updated:** December 2024  
**Version:** 1.0.0