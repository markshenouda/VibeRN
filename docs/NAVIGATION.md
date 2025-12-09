# Navigation Guide

This guide covers navigation patterns using Expo Router.

## Overview

VibeRN uses Expo Router for file-based navigation. Routes are defined by the file structure in `src/app/`.

## Project Structure

```
src/app/
├── _layout.tsx           # Root layout (providers)
├── +not-found.tsx        # 404 page
├── (tabs)/               # Tab navigation group
│   ├── _layout.tsx       # Tab layout
│   ├── index.tsx         # Home tab (/)
│   ├── explore.tsx       # Explore tab (/explore)
│   └── profile.tsx       # Profile tab (/profile)
├── (auth)/               # Auth screens group
│   ├── _layout.tsx       # Auth layout
│   ├── login.tsx         # /login
│   ├── register.tsx      # /register
│   └── forgot-password.tsx
├── (examples)/           # Example screens (removable)
│   └── ...
└── details/
    └── [id].tsx          # Dynamic route (/details/123)
```

## Route Types

### Static Routes

Create a file for each route:

```
src/app/settings.tsx → /settings
src/app/about.tsx → /about
```

### Dynamic Routes

Use brackets for dynamic segments:

```
src/app/user/[id].tsx → /user/123
src/app/post/[slug].tsx → /post/my-post
```

Access parameters:

```tsx
import { useLocalSearchParams } from 'expo-router';

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>User ID: {id}</Text>;
}
```

### Catch-All Routes

```
src/app/[...path].tsx → Matches any path
```

### Groups

Parentheses create groups without affecting URL:

```
src/app/(tabs)/index.tsx → /
src/app/(auth)/login.tsx → /login (not /auth/login)
```

## Navigation

### useRouter Hook

```tsx
import { useRouter } from 'expo-router';

function MyComponent() {
  const router = useRouter();

  // Navigate to route
  router.push('/settings');

  // Navigate with params
  router.push('/user/123');
  router.push({ pathname: '/user/[id]', params: { id: '123' } });

  // Replace (no back)
  router.replace('/home');

  // Go back
  router.back();

  // Can go back?
  router.canGoBack();
}
```

### Link Component

```tsx
import { Link } from 'expo-router';

// Basic link
<Link href="/settings">Settings</Link>

// With params
<Link href="/user/123">View User</Link>

// As child (wraps component)
<Link href="/settings" asChild>
  <Button>Go to Settings</Button>
</Link>
```

### Redirect

```tsx
import { Redirect } from 'expo-router';

function ProtectedScreen() {
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return <Content />;
}
```

## Layouts

### Root Layout

The root `_layout.tsx` wraps all screens:

```tsx
// src/app/_layout.tsx
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
```

### Tab Layout

```tsx
// src/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
```

### Stack Layout

```tsx
// src/app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
```

## Screen Options

Configure screens in layout:

```tsx
<Stack.Screen
  name="settings"
  options={{
    title: 'Settings',
    headerShown: true,
    presentation: 'modal', // or 'card', 'transparentModal'
    animation: 'slide_from_bottom',
  }}
/>
```

Or in the screen file:

```tsx
import { Stack } from 'expo-router';

export default function SettingsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Content />
    </>
  );
}
```

## Navigation Patterns

### Tab + Stack

Most common pattern - tabs with stacks inside:

```
(tabs)/
  index.tsx         # Tab 1 home
  profile.tsx       # Tab 2 home
details/[id].tsx    # Pushed on top of tabs
```

### Modal Flow

Present screens as modals:

```tsx
// In layout
<Stack.Screen
  name="(auth)"
  options={{
    presentation: 'modal',
    animation: 'slide_from_bottom',
  }}
/>
```

### Auth Flow

Protected routes pattern:

```tsx
// src/app/(tabs)/_layout.tsx
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Tabs>{/* ... */}</Tabs>;
}
```

### Deep Linking

Configured in `app.json`:

```json
{
  "expo": {
    "scheme": "vibern",
    "plugins": ["expo-router"]
  }
}
```

Links work automatically:

- `vibern://settings` → `/settings`
- `vibern://user/123` → `/user/123`

## Type-Safe Navigation

Enable typed routes in `app.json`:

```json
{
  "expo": {
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

Then routes are type-checked:

```tsx
router.push('/settings'); // ✅
router.push('/nonexistent'); // ❌ Type error
```

## Adding New Screens

### New Tab Screen

1. Create file in `src/app/(tabs)/`:

   ```tsx
   // src/app/(tabs)/notifications.tsx
   export default function NotificationsScreen() {
     return <Text>Notifications</Text>;
   }
   ```

2. Add to tab layout:
   ```tsx
   <Tabs.Screen name="notifications" options={{ title: 'Notifications' }} />
   ```

### New Modal Screen

1. Create file:

   ```tsx
   // src/app/filter.tsx
   export default function FilterScreen() { ... }
   ```

2. Configure in root layout:
   ```tsx
   <Stack.Screen name="filter" options={{ presentation: 'modal' }} />
   ```

### New Stack Screen

1. Create file:

   ```tsx
   // src/app/product/[id].tsx
   export default function ProductScreen() { ... }
   ```

2. Navigate:
   ```tsx
   router.push('/product/123');
   ```

## Best Practices

1. **Use groups** - Organize related screens
2. **Configure layouts** - Set consistent options
3. **Type routes** - Enable typedRoutes
4. **Handle loading** - Show loading during auth checks
5. **Use Redirect** - For programmatic redirects
