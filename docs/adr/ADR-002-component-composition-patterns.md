# ADR-002: Component Composition Patterns and Architecture

**Status:** Accepted  
**Date:** 2024-12-19  
**Decision Makers:** Development Team  
**Related to:** Week 2-4 Frontend Refactor (Issue #11)

---

## Context

The MatIQ frontend application initially used monolithic components with tightly coupled logic, making it difficult to reuse code and maintain consistent UI patterns. As documented in the [Component Composition Patterns](../COMPOSITION_PATTERNS.md), several challenges emerged:

1. **Prop Drilling**: Data passed through multiple component layers unnecessarily
2. **Monolithic Components**: Large components handling multiple responsibilities
3. **Code Duplication**: Similar UI patterns reimplemented across components
4. **Tight Coupling**: Components deeply dependent on specific data structures
5. **Testing Complexity**: Difficult to test individual component behaviors in isolation

## Decision

We have decided to adopt **React Composition Patterns** as our primary architectural approach for building reusable, flexible UI components.

### Key Components of This Decision:

1. **Children Pattern**: Use `{children}` for flexible content composition
2. **Render Props Pattern**: Enable components to share stateful logic
3. **Higher-Order Component (HOC) Pattern**: Wrap components with common functionality
4. **Compound Components**: Create component families with related sub-components
5. **Custom Hooks**: Extract stateful logic into reusable hooks

## Rationale

### Core Principles

**Composition over Inheritance:**
- Favor combining simple components over extending complex ones
- Build complex UIs by composing simple, focused components
- Enable flexible component reuse without tight coupling

**Single Responsibility:**
- Each component has one clear purpose
- Logic and presentation are properly separated
- Components are easier to test and maintain

**Declarative APIs:**
- Component interfaces clearly express their capabilities
- Consumers can understand component behavior from usage
- Self-documenting component relationships

### Benefits

**Developer Experience:**
- **Reduced Cognitive Load**: Smaller, focused components are easier to understand
- **Better Reusability**: Components can be combined in unexpected ways
- **Improved Testing**: Isolated components with clear interfaces
- **Enhanced Debugging**: Easier to trace issues in focused components

**Code Quality:**
- **DRY Principle**: Common patterns extracted into reusable components
- **Maintainability**: Changes isolated to specific components
- **Consistency**: Shared components ensure consistent behavior
- **Type Safety**: Better TypeScript/PropTypes support with focused interfaces

**Team Collaboration:**
- **Clear Boundaries**: Component responsibilities are well-defined
- **Parallel Development**: Different team members can work on isolated components
- **Design System**: Components form a cohesive design system
- **Knowledge Transfer**: Patterns are consistently applied across codebase

## Implementation Details

### Pattern 1: Children Pattern (`{children}`)

**Purpose**: Enable flexible content composition without tight coupling

#### Layout Component
```jsx
// Before: Hardcoded layout structure
<div className="min-h-screen hero-gradient">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* hardcoded content */}
  </div>
</div>

// After: Flexible composition
<Layout background="gradient" maxWidth={true}>
  {/* any content */}
</Layout>
```

**Benefits:**
- Reusable across different page types
- Flexible content without layout coupling
- Consistent spacing and responsive behavior

#### Card Component Family
```jsx
// Compound component pattern
<Card hover clickable>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Content>
    <p>Content</p>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Benefits:**
- Flexible card content composition
- Consistent styling across card variants
- Self-documenting component structure

### Pattern 2: Render Props Pattern

**Purpose**: Share stateful logic between components with different rendering needs

#### StateRenderer Component
```jsx
<StateRenderer
  loading={loading}
  error={error}
  data={profile}
  loadingMessage="Loading profile..."
  renderError={(error) => <CustomErrorDisplay error={error} />}
>
  {(profile) => (
    <ProfileContent profile={profile} />
  )}
</StateRenderer>
```

**Benefits:**
- Reusable loading/error/success state management
- Flexible rendering based on state
- Consistent user experience across features

### Pattern 3: Higher-Order Component (HOC) Pattern

**Purpose**: Add common functionality to components without modification

#### withState HOC
```jsx
// Enhanced component with state management
const EnhancedProfilePage = withState(ProfilePage);

<EnhancedProfilePage 
  loading={loading} 
  error={error} 
  {...profileProps} 
/>
```

**Benefits:**
- Consistent state handling patterns
- Reduced boilerplate in component implementations
- Easy to add/remove functionality

### Pattern 4: Custom Hooks Pattern

**Purpose**: Extract and share stateful logic across components

#### useSearch Hook
```jsx
// Before: Direct API usage in components
const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // ... complex search logic
};

// After: Extracted hook
const HomePage = () => {
  const { 
    searchResults, 
    isSearching, 
    handleSearch 
  } = useSearch();
  // ... clean component logic
};
```

**Benefits:**
- Reusable search logic across components
- Cleaner component code focused on presentation
- Easier testing of isolated business logic

### Pattern 5: Section Composition

**Purpose**: Flexible page section layouts with consistent styling

```jsx
<Section centered>
  <Section.Header>
    <Section.Title>Wrestling Statistics</Section.Title>
    <Section.Description>
      Comprehensive data analysis for wrestling performance
    </Section.Description>
  </Section.Header>
  <StatisticsContent />
</Section>
```

**Benefits:**
- Consistent section layouts across pages
- Flexible content organization
- Built-in responsive behavior

## Architecture Benefits

### Before Refactor - Monolithic Components

```jsx
// Monolithic HomePage with tightly coupled logic
const HomePage = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Suggestions state
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Health check state
  const [healthStatus, setHealthStatus] = useState('unknown');
  
  // Complex search logic mixed with presentation
  const handleSearch = async (query) => {
    setIsSearching(true);
    try {
      const results = await apiService.search(query);
      setSearchResults(results);
    } catch (error) {
      // error handling
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="min-h-screen hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 200+ lines of mixed logic and presentation */}
      </div>
    </div>
  );
};
```

### After Refactor - Composition Pattern

```jsx
// Clean HomePage using composition
const HomePage = () => {
  const searchProps = useSearch(); // ✅ Extracted logic
  
  return (
    <Layout background="gradient"> {/* ✅ Flexible layout */}
      <SearchHero> {/* ✅ Composable hero */}
        <SearchBar {...searchProps} />
      </SearchHero>
      
      <SearchResults {...searchProps} /> {/* ✅ Focused component */}
      
      <Section centered> {/* ✅ Reusable section */}
        <Section.Header>
          <Section.Title>Browse Wrestling Data</Section.Title>
        </Section.Header>
        <BrowseCards />
      </Section>
    </Layout>
  );
};
```

## Consequences

### Positive Consequences

1. **Improved Reusability**: Components can be combined in new ways without modification
2. **Better Testing**: Isolated components with clear interfaces are easier to test
3. **Enhanced Maintainability**: Changes are localized to specific components
4. **Consistent UI**: Shared components ensure visual and behavioral consistency
5. **Faster Development**: New features can leverage existing component patterns
6. **Better Developer Onboarding**: Clear patterns make codebase easier to understand

### Negative Consequences

1. **Initial Complexity**: More files and component relationships to understand
2. **Abstraction Overhead**: Additional layer of abstraction may complicate simple cases
3. **Learning Curve**: Team needs to understand composition patterns and when to apply them
4. **Over-Engineering Risk**: Potential to create unnecessary abstractions for simple use cases

### Risk Mitigation

1. **Documentation**: Comprehensive patterns documentation and examples
2. **Gradual Adoption**: Implement patterns incrementally rather than wholesale refactor
3. **Code Reviews**: Ensure patterns are applied appropriately
4. **Training**: Team knowledge sharing on composition patterns
5. **Pragmatic Approach**: Use composition when it adds value, avoid over-abstraction

## Component Hierarchy

### Current Architecture

```
src/
├── components/
│   ├── common/              # Layout and utility components
│   │   ├── Layout.jsx       # ✅ Children pattern
│   │   ├── Section.jsx      # ✅ Compound component
│   │   ├── StateRenderer.jsx # ✅ Render props
│   │   └── withState.jsx    # ✅ HOC pattern
│   └── ui/                  # Basic UI components
│       ├── Button.jsx       # ✅ Flexible variants
│       ├── Card.jsx         # ✅ Compound component
│       ├── Input.jsx        # ✅ Consistent styling
│       └── ...
├── features/
│   └── [feature]/
│       ├── components/      # Feature-specific components
│       ├── hooks/          # ✅ Custom hooks
│       └── services/       # API and business logic
```

### Design Principles

1. **Bottom-Up Composition**: Build complex UIs from simple, focused components
2. **Clear Ownership**: Each component has a single, well-defined responsibility
3. **Flexible APIs**: Components accept various combinations of props and children
4. **Consistent Patterns**: Similar components follow similar composition patterns
5. **Progressive Enhancement**: Start simple, add complexity only when needed

## Alternatives Considered

### Monolithic Components
- **Rejected**: Poor reusability and maintainability
- **Rejected**: Testing complexity and tight coupling

### Redux/Context for All State
- **Rejected**: Overkill for local component state
- **Rejected**: Adds unnecessary complexity to simple components

### CSS-in-JS Component Libraries
- **Rejected**: Lock-in to specific styling approach
- **Rejected**: Less flexibility than composition patterns

### Traditional Class Components
- **Rejected**: Hooks provide better state logic reuse
- **Rejected**: Function components have better composition patterns

## Success Metrics

### Code Quality Metrics
- **Component Size**: Average component size reduced from 200+ lines to <100 lines
- **Reusability**: UI components reused across 3+ different contexts
- **Test Coverage**: Improved test coverage due to component isolation
- **Bundle Size**: No increase in bundle size despite additional abstraction

### Developer Experience Metrics
- **Development Speed**: Faster feature development using existing components
- **Bug Reduction**: Fewer UI inconsistencies due to shared components
- **Code Reviews**: Faster reviews due to focused component changes
- **Onboarding**: New developers productive faster with clear patterns

## References

- [React Composition Patterns](https://reactjs.org/docs/composition-vs-inheritance.html)
- [Component Composition Implementation](../COMPOSITION_PATTERNS.md)
- [Style Guide](../STYLE_GUIDE.md)
- [Tailwind CSS Integration](./ADR-001-tailwind-css-adoption.md)

---

## Decision Log

- **2024-12-19**: Documented existing composition pattern implementation
- **2024-12-19**: Formalized architectural decision and patterns
- **Future**: Evaluate effectiveness after 3 months of usage
- **Future**: Consider additional patterns (Compound Components, Context patterns)

---

**Review Date:** 2025-03-01  
**Next Review:** Assess developer feedback and measure success metrics