# @bwicktech/components

UI components used in BWICK web projects

## Get Started

### Install

```sh
npm install @bwicktech/components
```

### Use

1. Import styles in a way that your bundler supports

   ```js
   import '@bwicktech/components/lib/index.css';
   ```

2. Import the component directly

   ```js
   import { UIText } from '@bwicktech/components';

   // Use
   <UIText kind="body/regular" color="black">
     Some text
   </UIText>;
   ```

### Reference

#### `UIText`

A component for displaying text. Sets a predefined set of font styles.

##### Props

###### `kind: Kind`

Sets the font style variation. Possible options:

- `'headline/hero'`
- `'headline/h1'`
- `'headline/h2'`
- `'headline/h3'`
- `'body/accent'`
- `'body/regular'`
- `'small/accent'`
- `'small/regular'`
- `'caption/accent'`
- `'caption/regular'`

These correspond to the different typographic styles within your application. Each is associated with a different set of styling parameters - font size, line height, weight, and letter spacing.

###### `color?: string`

Defines the color of the text. The default color is 'currentColor'. Supports css custom properties.

###### `inline?: boolean`

Determines whether the text should display as inline-block or not. If set to `true`, the text will display as an inline element. Default value is `false`.

##### Usage

```jsx
import { UIText } from '@bwicktech/components';

const ExampleComponent = () => (
  <UIText kind="headline/h1" color="black">
    This is a headline
  </UIText>
);
```
