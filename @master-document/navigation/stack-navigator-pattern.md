# Stack Navigator Pattern

## Standard Pattern for Drawer Screens

All main drawer screens should use a Stack navigator to provide consistent header behavior with the native liquid glass drawer icon.

### File Structure

```
app/(drawer)/
├── screen-name/
│   ├── _layout.tsx    ← Stack navigator with header config
│   ├── index.tsx      ← Main screen (uses groupedBackground)
│   └── detail.tsx     ← Child screens (use groupedBackground)
```

### Implementation Template

#### 1. Stack Layout (`_layout.tsx`)

```typescript
import { Stack } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useThemeContext } from '@/contexts/preferences-context';

export default function ScreenNameLayout() {
  const { colors } = useThemeContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.groupedBackground, // ← Always groupedBackground
        },
        headerTintColor: colors.text,
        headerShadowVisible: false, // ← No header border
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Screen Title',
          headerLeft: () => <DrawerToggleButton tintColor={colors.text} />, // ← Liquid glass drawer icon
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: 'Detail Title',
          // No headerLeft needed - back button appears automatically
        }}
      />
    </Stack>
  );
}
```

#### 2. Index Screen (`index.tsx`)

```typescript
import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '@/contexts/preferences-context';

export default function ScreenNameScreen() {
  const { colors } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.groupedBackground }]}>
      {/* Screen content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

#### 3. Drawer Configuration (`(drawer)/_layout.tsx`)

```typescript
<Drawer.Screen
  name="screen-name"
  options={{
    drawerLabel: 'Screen Name',
    title: 'Screen Name',
    headerShown: false, // ← Let Stack handle the header
    drawerIcon: ({ color }) => (
      <IconSymbol size={28} name="icon.name" color={color} />
    ),
  }}
/>
```

## Key Requirements

### ✅ ALWAYS

1. Use `colors.groupedBackground` for:
   - `headerStyle.backgroundColor`
   - Screen container `backgroundColor`

2. Include `DrawerToggleButton` on main screen (index):
   ```typescript
   headerLeft: () => <DrawerToggleButton tintColor={colors.text} />
   ```

3. Set `headerShadowVisible: false` to remove header border

4. Set `headerShown: false` on Drawer.Screen to avoid double headers

### ❌ NEVER

1. Don't use `colors.background` for headers or screen containers
2. Don't manually create drawer icons - use `DrawerToggleButton`
3. Don't show both Drawer and Stack headers (causes double headers)
4. Don't add `headerLeft` to detail screens (back button is automatic)

## Navigation Features

### Drawer Icon (Main Screen)
- Uses `DrawerToggleButton` component
- Native iOS liquid glass effect
- Automatically appears on index screen
- Hides when navigating to detail screens

### Back Button (Detail Screens)
- Appears automatically on child screens
- Replaces drawer icon when navigating deeper
- Native iOS styling
- No configuration needed

## Example: Full Implementation

See existing implementations:
- `app/(drawer)/home/` - Clean home screen
- `app/(drawer)/notes/` - Notes section
- `app/(drawer)/test/` - Test screen with navigation
- `app/(drawer)/settings/` - Settings with nested screens
