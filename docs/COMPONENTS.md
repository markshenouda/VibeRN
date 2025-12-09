# Components Reference

Complete reference for all UI components in VibeRN.

## Import

```typescript
import { Button, Text, Card, Input } from '@/components/ui';
import { FormInput, FormSelect } from '@/components/forms';
import { Header, ListItem, EmptyState } from '@/components/patterns';
```

---

## UI Components

### Text

Themed text with typography variants.

```tsx
<Text variant="h1">Heading 1</Text>
<Text variant="body" color="textSecondary">Body text</Text>
<Text variant="caption" align="center">Centered caption</Text>
```

| Prop    | Type                                                                          | Default       | Description          |
| ------- | ----------------------------------------------------------------------------- | ------------- | -------------------- |
| variant | `h1` \| `h2` \| `h3` \| `h4` \| `body` \| `bodySmall` \| `caption` \| `label` | `body`        | Text style           |
| color   | `ColorToken`                                                                  | `textPrimary` | Text color           |
| align   | `left` \| `center` \| `right`                                                 | -             | Text alignment       |
| weight  | `normal` \| `medium` \| `semibold` \| `bold`                                  | -             | Font weight override |

### Button

Versatile button with variants and states.

```tsx
<Button onPress={handlePress}>Default</Button>
<Button variant="outline" color="secondary">Outline</Button>
<Button variant="ghost" size="sm">Small Ghost</Button>
<Button loading disabled>Loading</Button>
```

| Prop      | Type                                                                       | Default   | Description          |
| --------- | -------------------------------------------------------------------------- | --------- | -------------------- |
| variant   | `solid` \| `outline` \| `ghost` \| `soft`                                  | `solid`   | Button style         |
| color     | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `neutral` | `primary` | Color scheme         |
| size      | `sm` \| `md` \| `lg`                                                       | `md`      | Button size          |
| loading   | `boolean`                                                                  | `false`   | Show loading spinner |
| disabled  | `boolean`                                                                  | `false`   | Disable button       |
| fullWidth | `boolean`                                                                  | `false`   | Take full width      |
| leftIcon  | `ReactNode`                                                                | -         | Icon before text     |
| rightIcon | `ReactNode`                                                                | -         | Icon after text      |

### Input

Text input with label and error support.

```tsx
<Input label="Email" placeholder="Enter email" />
<Input label="Password" secureTextEntry error="Required" />
<Input label="Search" leftIcon={<SearchIcon />} />
```

| Prop      | Type                 | Default | Description   |
| --------- | -------------------- | ------- | ------------- |
| label     | `string`             | -       | Input label   |
| error     | `string`             | -       | Error message |
| hint      | `string`             | -       | Helper text   |
| size      | `sm` \| `md` \| `lg` | `md`    | Input size    |
| leftIcon  | `ReactNode`          | -       | Left icon     |
| rightIcon | `ReactNode`          | -       | Right icon    |
| disabled  | `boolean`            | `false` | Disable input |

### Card

Container with elevation and variants.

```tsx
<Card>Default elevated card</Card>
<Card variant="outlined">Outlined card</Card>
<Card variant="filled" padding="lg">Large padding</Card>
<Card pressable onPress={handlePress}>Pressable card</Card>
```

| Prop      | Type                                 | Default    | Description    |
| --------- | ------------------------------------ | ---------- | -------------- |
| variant   | `elevated` \| `outlined` \| `filled` | `elevated` | Card style     |
| padding   | `none` \| `sm` \| `md` \| `lg`       | `md`       | Padding size   |
| pressable | `boolean`                            | `false`    | Make pressable |
| onPress   | `function`                           | -          | Press handler  |

### Avatar

User avatar with image or initials.

```tsx
<Avatar source={{ uri: 'https://...' }} />
<Avatar name="John Doe" size="lg" />
<Avatar name="JD" shape="square" />
```

| Prop   | Type                                 | Default  | Description       |
| ------ | ------------------------------------ | -------- | ----------------- |
| source | `ImageSource`                        | -        | Image source      |
| name   | `string`                             | -        | Name for initials |
| size   | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md`     | Avatar size       |
| shape  | `circle` \| `square`                 | `circle` | Avatar shape      |

### Badge

Small label for status or counts.

```tsx
<Badge>Default</Badge>
<Badge color="success" variant="soft">Active</Badge>
<Badge color="error">3</Badge>
```

| Prop    | Type                                                                    | Default   | Description |
| ------- | ----------------------------------------------------------------------- | --------- | ----------- |
| variant | `solid` \| `soft` \| `outline`                                          | `soft`    | Badge style |
| color   | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `info` | `primary` | Color       |
| size    | `sm` \| `md`                                                            | `sm`      | Badge size  |

### Checkbox

Selectable checkbox with label.

```tsx
<Checkbox checked={value} onCheckedChange={setValue} label="Accept terms" />
```

| Prop            | Type       | Default | Description      |
| --------------- | ---------- | ------- | ---------------- |
| checked         | `boolean`  | `false` | Checked state    |
| onCheckedChange | `function` | -       | Change handler   |
| label           | `string`   | -       | Label text       |
| disabled        | `boolean`  | `false` | Disable checkbox |

### Switch

Toggle switch for boolean values.

```tsx
<Switch value={enabled} onValueChange={setEnabled} label="Notifications" />
```

| Prop          | Type              | Default | Description    |
| ------------- | ----------------- | ------- | -------------- |
| value         | `boolean`         | `false` | Switch state   |
| onValueChange | `function`        | -       | Change handler |
| label         | `string`          | -       | Label text     |
| labelPosition | `left` \| `right` | `left`  | Label position |

### RadioGroup

Radio buttons for single selection.

```tsx
<RadioGroup
  value={selected}
  onValueChange={setSelected}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
/>
```

| Prop          | Type                       | Default    | Description       |
| ------------- | -------------------------- | ---------- | ----------------- |
| value         | `string`                   | -          | Selected value    |
| onValueChange | `function`                 | -          | Change handler    |
| options       | `RadioOption[]`            | -          | Available options |
| direction     | `vertical` \| `horizontal` | `vertical` | Layout direction  |

### Select

Dropdown select input.

```tsx
<Select
  value={country}
  onValueChange={setCountry}
  options={countries}
  placeholder="Select country"
/>
```

| Prop          | Type             | Default | Description       |
| ------------- | ---------------- | ------- | ----------------- |
| value         | `string`         | -       | Selected value    |
| onValueChange | `function`       | -       | Change handler    |
| options       | `SelectOption[]` | -       | Available options |
| placeholder   | `string`         | -       | Placeholder text  |
| label         | `string`         | -       | Input label       |
| error         | `string`         | -       | Error message     |

### Modal

Dialog modal overlay.

```tsx
<Modal visible={show} onClose={() => setShow(false)} title="Settings">
  <Text>Modal content</Text>
</Modal>
```

| Prop            | Type                           | Default | Description       |
| --------------- | ------------------------------ | ------- | ----------------- |
| visible         | `boolean`                      | -       | Visibility state  |
| onClose         | `function`                     | -       | Close handler     |
| title           | `string`                       | -       | Modal title       |
| size            | `sm` \| `md` \| `lg` \| `full` | `md`    | Modal size        |
| showCloseButton | `boolean`                      | `true`  | Show close button |

### Skeleton

Loading placeholder with animation.

```tsx
<Skeleton width={200} height={20} />
<Skeleton variant="circular" width={48} height={48} />
<SkeletonText lines={3} />
```

| Prop      | Type                                  | Default | Description      |
| --------- | ------------------------------------- | ------- | ---------------- |
| width     | `number` \| `string`                  | `100%`  | Width            |
| height    | `number` \| `string`                  | `16`    | Height           |
| variant   | `text` \| `circular` \| `rectangular` | `text`  | Shape            |
| animation | `boolean`                             | `true`  | Enable animation |

### Divider

Visual separator.

```tsx
<Divider />
<Divider label="OR" spacing={16} />
<Divider orientation="vertical" />
```

| Prop        | Type                       | Default      | Description           |
| ----------- | -------------------------- | ------------ | --------------------- |
| orientation | `horizontal` \| `vertical` | `horizontal` | Direction             |
| label       | `string`                   | -            | Center label          |
| spacing     | `number`                   | `0`          | Margin around divider |

### Toast

Notification system (use via hook).

```tsx
const { show } = useToast();

show({ message: 'Success!', type: 'success' });
show({ message: 'Error occurred', type: 'error' });
```

---

## Pattern Components

### Header

Screen header with navigation.

```tsx
<Header title="Settings" showBack onBack={() => router.back()} />
<Header title="Profile" large rightAction={<Button>Edit</Button>} />
```

### ListItem

Pressable list item for settings/menus.

```tsx
<ListItem
  title="Notifications"
  subtitle="Manage alerts"
  leftElement={<BellIcon />}
  showChevron
  onPress={handlePress}
/>
```

### EmptyState

Placeholder for empty content.

```tsx
<EmptyState
  title="No results"
  description="Try a different search"
  action={<Button>Clear filters</Button>}
/>
```

### LoadingScreen

Full screen loading indicator.

```tsx
<LoadingScreen message="Loading..." />
<LoadingScreen transparent /> // Overlay
```

### SearchBar

Search input with debounce.

```tsx
<SearchBar value={query} onChangeText={setQuery} onSearch={handleSearch} placeholder="Search..." />
```

### ErrorBoundary

Error catching wrapper.

```tsx
<ErrorBoundary fallback={<ErrorScreen />}>
  <MyComponent />
</ErrorBoundary>
```
