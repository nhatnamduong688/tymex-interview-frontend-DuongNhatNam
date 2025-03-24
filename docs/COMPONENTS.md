# Component Library

This document provides guidelines and examples for using components in the application.

## Design System Components

Our design system is organized using atomic design principles.

### Tokens

Design tokens are the smallest building blocks of the design system.

```tsx
import { colors, fontSizes, spacing } from '../design-system/tokens';

// Usage
<div
  style={{
    color: colors.primary[500],
    fontSize: fontSizes.md,
    padding: spacing[4],
  }}
>
  Content
</div>;
```

### Layouts

Layout components manage the positioning of content.

#### Container

Containers provide a responsive wrapper with consistent padding.

```tsx
import { Container } from '../design-system/layouts';

// Usage
<Container size='lg'>
  <h1>Page Content</h1>
  <p>This content will be contained within the container.</p>
</Container>;
```

#### Grid

Grids arrange content in a responsive grid layout.

```tsx
import { Grid } from '../design-system/layouts';

// Usage
<Grid columns={3} gap='md'>
  <Card />
  <Card />
  <Card />
  <Card />
  <Card />
  <Card />
</Grid>;
```

### Primitives

Primitive components are the basic UI building blocks.

#### Button

```tsx
import { Button } from '../design-system/primitives';

// Usage
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// With icons
<Button
  variant="secondary"
  leftIcon={<IconSearch />}
  rightIcon={<IconArrow />}
>
  Search
</Button>

// Loading state
<Button isLoading={true}>Loading</Button>
```

#### Text

```tsx
import { Text } from '../design-system/primitives';

// Usage
<Text variant="h1" weight="bold" color="#333">Heading</Text>
<Text variant="body">Regular paragraph text</Text>
<Text variant="caption" color="gray">Small caption text</Text>
```

## Feature Components

### Product Feature

#### ProductCard

```tsx
import { ProductCard } from '../features/product';

// Usage
<ProductCard product={product} />;
```

#### ProductList

```tsx
import { ProductList } from '../features/product';

// Usage
<ProductList
  products={products}
  title='Featured Products'
  isLoading={loading}
  columns={3}
/>;
```

### Search Feature

#### SearchInput

```tsx
import { SearchInput } from '../features/search';

// Usage
<SearchInput
  placeholder='Search products...'
  onSearch={handleSearch}
  initialValue=''
  debounceMs={300}
/>;
```

### Filter Feature

#### PriceRangeFilter

```tsx
import { PriceRangeFilter } from '../features/filter';

// Usage
<PriceRangeFilter
  minPrice={0}
  maxPrice={1000}
  initialMin={100}
  initialMax={500}
  onChange={(min, max) => console.log(min, max)}
/>;
```

## Component Best Practices

1. **Composition over Configuration**: Prefer composing small components over complex configuration props
2. **Forward Refs**: Use React.forwardRef for components that might need ref forwarding
3. **Consistent Props**: Maintain consistent prop naming across components
4. **Accessibility**: Ensure all components meet WCAG accessibility standards
5. **Performance**: Memoize components that might re-render frequently
6. **Responsive Design**: Design components to work across all device sizes
7. **Documentation**: Document props with JSDoc comments
