import { useEffect, useRef } from 'react';
import { AppState, PixelRatio, Alert } from 'react-native';
import * as Updates from 'expo-updates';

/**
 * Monitors font scale changes and prompts user to restart app
 *
 * This hook detects when iOS text size settings change and prompts
 * the user to restart the app to see the new text size.
 *
 * Usage: Call once at app root level (e.g., in _layout.tsx)
 */
export function useFontScaleMonitor() {
  const initialFontScale = useRef(PixelRatio.getFontScale());
  const hasShownAlert = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // Only check when app comes to foreground
      if (nextAppState === 'active') {
        const currentFontScale = PixelRatio.getFontScale();

        // Check if font scale changed
        if (
          currentFontScale !== initialFontScale.current &&
          !hasShownAlert.current
        ) {
          hasShownAlert.current = true;

          Alert.alert(
            'Text Size Changed',
            'Your iOS text size setting has changed. The app will restart to apply the new size.',
            [
              {
                text: 'Restart Now',
                onPress: async () => {
                  try {
                    await Updates.reloadAsync();
                  } catch (error) {
                    console.error('Failed to reload app:', error);
                  }
                },
              },
            ],
            { cancelable: false }
          );
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
