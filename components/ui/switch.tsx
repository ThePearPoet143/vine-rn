import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
  ZoomIn,
  Easing,
} from 'react-native-reanimated';
import { Check, X } from 'lucide-react-native';
import { useThemeContext } from '@/contexts/preferences-context';
import { getAccentBlue } from '@/constants/colors';

// Switch dimensions
const SWITCH_WIDTH = 40;
const SWITCH_THUMB_SIZE = 20;
const SWITCH_HORIZONTAL_PADDING = 3; // Creates 3px margin from track edges
const SWITCH_VERTICAL_PADDING = 3; // Creates 3px margin from top/bottom
const SWITCH_HEIGHT = SWITCH_THUMB_SIZE + SWITCH_VERTICAL_PADDING * 2;
// Maximum thumb travel distance: total width minus thumb size minus both side paddings
const SWITCH_MAX_OFFSET = SWITCH_WIDTH - SWITCH_THUMB_SIZE - SWITCH_HORIZONTAL_PADDING * 2;

const THUMB_COLOR = '#F5F5F5'; // Light gray thumb maintains contrast on both states

export interface SwitchProps {
  /** Current value */
  value?: boolean;
  /** Callback when value changes */
  onValueChange?: (value: boolean) => void;
}

/**
 * Animated toggle switch component with theme-aware colors
 *
 * Features:
 * - Works with all 6 reading themes (Light, Dark, Sepia, Warm Dark, Green, Auto)
 * - Spring animation for natural, fluid thumb slide
 * - Smooth color interpolation as thumb moves
 * - Check/X icons for clear visual feedback
 * - Standard iOS Switch API (value, onValueChange)
 * - Maintains WCAG AAA contrast in all themes
 *
 * @example
 * ```tsx
 * <Switch value={enabled} onValueChange={setEnabled} />
 * ```
 */
export const Switch: FC<SwitchProps> = ({ value = false, onValueChange }) => {
  const { colors } = useThemeContext();

  // Theme-aware colors
  const TRACK_INACTIVE = colors.switchTrackInactive;
  const TRACK_ACTIVE = getAccentBlue(colors.isDark);

  // Thumb position: 0 (left/off) to SWITCH_MAX_OFFSET (right/on)
  const offset = useSharedValue(value ? SWITCH_MAX_OFFSET : 0);
  // Internal state tracking for consistent animations
  const isOn = useSharedValue(value);

  const toggleSwitch = () => {
    const newValue = !isOn.get();
    isOn.set(newValue);

    // Smooth timing animation with ease-in-out
    offset.set(
      withTiming(newValue ? SWITCH_MAX_OFFSET : 0, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      })
    );

    onValueChange?.(newValue);
  };

  // Thumb position animation - translates from left (0) to right (SWITCH_MAX_OFFSET)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.get() }], // Horizontal slide animation
    };
  });

  // Track background color animation synchronized with thumb movement
  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      offset.get(), // Input: current thumb position
      [0, SWITCH_MAX_OFFSET], // Range: off position to on position
      [TRACK_INACTIVE, TRACK_ACTIVE] // Output: inactive to active color
    );

    return {
      backgroundColor, // Smooth color transition as thumb slides
    };
  });

  return (
    <Pressable onPress={toggleSwitch}>
      <Animated.View style={[styles.track, backgroundStyle]}>
        <Animated.View
          style={[styles.thumb, animatedStyle]}
          className="items-center justify-center"
        >
          {/* Check/X icons with zoom animation */}
          {value ? (
            <Animated.View key="check" entering={ZoomIn}>
              <Check size={14} color={TRACK_ACTIVE} strokeWidth={4} />
            </Animated.View>
          ) : (
            <Animated.View key="x" entering={ZoomIn}>
              <X size={12} color="#4E505B" strokeWidth={3} />
            </Animated.View>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    paddingHorizontal: SWITCH_HORIZONTAL_PADDING,
    paddingVertical: SWITCH_VERTICAL_PADDING,
  },
  thumb: {
    width: SWITCH_THUMB_SIZE,
    height: SWITCH_THUMB_SIZE,
    borderRadius: SWITCH_THUMB_SIZE / 2,
    backgroundColor: THUMB_COLOR,
  },
});
