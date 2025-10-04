import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useThemeContext } from '@/contexts/preferences-context';
import { getAccentBlue } from '@/constants/colors';

// Base dimensions for inactive state (unselected radio button)
const INACTIVE_RING_SIZE = 24;
const INACTIVE_RING_WIDTH = 2;

// Active state dimensions - maintains consistent outer dimensions
const ACTIVE_RING_SIZE = INACTIVE_RING_SIZE;
const ACTIVE_DOT_SIZE = INACTIVE_RING_SIZE * 0.45; // Inner dot scales to 45% of ring for proper visual weight

// Animation timing optimized for snappy interactions
const DURATION = 150; // Base duration for deselection
const EASING = Easing.out(Easing.ease); // Smooth deceleration curve

export interface RadioProps {
  /** Whether the radio button is selected */
  selected: boolean;
}

/**
 * Animated radio button component with theme-aware colors
 *
 * Features:
 * - Works with all 6 reading themes (Light, Dark, Sepia, Warm Dark, Green, Auto)
 * - Asymmetric timing: 300ms selection (2x emphasis), 150ms deselection
 * - Scale animation: 0.5 → 1.0 for smooth "pop-in" effect
 * - Theme-aware colors maintain WCAG AAA contrast
 * - iOS accent blue for active state
 *
 * @example
 * ```tsx
 * <Radio selected={isSelected} />
 * ```
 */
export const Radio: FC<RadioProps> = ({ selected }) => {
  const { colors } = useThemeContext();

  // Theme-aware colors
  const INACTIVE_RING_COLOR = colors.secondaryText; // Adapts to all themes
  const ACTIVE_RING_COLOR = getAccentBlue(colors.isDark);
  const ACTIVE_DOT_COLOR = '#F5F5F5'; // Light gray dot for contrast

  // Coordinated opacity and scale animation for active state
  // Creates a "pop-in" effect when selecting and "fade-out" when deselecting
  const rActiveStyle = useAnimatedStyle(() => {
    return {
      // Asymmetric timing: slower fade-in (2x duration) for emphasis, faster fade-out
      opacity: withTiming(selected ? 1 : 0, {
        duration: selected ? DURATION * 2 : DURATION, // Selection emphasizes with longer duration (300ms)
        easing: EASING,
      }),
      transform: [
        {
          // Scale interpolation: 0.5 → 1.0 creates smooth "growth" animation
          // Starting at 0.5 prevents jarring appearance from 0 scale
          scale: withTiming(selected ? 1 : 0.5, {
            duration: DURATION,
            easing: EASING,
          }),
        },
      ],
    };
  });

  return (
    // Container maintains consistent hitbox - inactive ring provides base structure
    <View
      style={[
        styles.inactiveRing,
        {
          borderColor: INACTIVE_RING_COLOR, // Theme-aware inactive color
        },
      ]}
      className="items-center justify-center"
    >
      {/* Active ring uses absoluteFill to overlay inactive ring perfectly */}
      {/* Animation style applied here affects both ring and inner dot simultaneously */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.activeRing,
          { backgroundColor: ACTIVE_RING_COLOR }, // Theme-aware active color
          rActiveStyle,
        ]}
        className="items-center justify-center"
      >
        {/* Inner dot inherits parent's opacity/scale - no separate animation needed */}
        <Animated.View style={[styles.activeDot, { backgroundColor: ACTIVE_DOT_COLOR }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Base ring structure - always visible, provides consistent dimensions
  inactiveRing: {
    width: INACTIVE_RING_SIZE,
    height: INACTIVE_RING_SIZE,
    borderRadius: INACTIVE_RING_SIZE / 2,
    borderWidth: INACTIVE_RING_WIDTH,
  },
  // Active ring positioned to perfectly overlay inactive ring
  // Negative margins compensate for border width to align outer edges
  activeRing: {
    position: 'absolute',
    top: -INACTIVE_RING_WIDTH, // Offset by border width to align with inactive ring
    left: -INACTIVE_RING_WIDTH,
    width: ACTIVE_RING_SIZE,
    height: ACTIVE_RING_SIZE,
    borderRadius: ACTIVE_RING_SIZE / 2,
    // backgroundColor applied inline for theme awareness
  },
  // Inner dot - sized for optimal visual hierarchy within active ring
  activeDot: {
    width: ACTIVE_DOT_SIZE,
    height: ACTIVE_DOT_SIZE,
    borderRadius: ACTIVE_DOT_SIZE / 2,
    // backgroundColor applied inline for theme awareness
  },
});
