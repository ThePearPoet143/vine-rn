import Animated from 'react-native-reanimated';
import { useFontContext } from '@/contexts/preferences-context';

export function HelloWave() {
  const { fontSize: fontSizeMultiplier } = useFontContext();
  const baseFontSize = 28;
  const scaledFontSize = Math.round(baseFontSize * fontSizeMultiplier);
  const scaledLineHeight = Math.round(scaledFontSize * 1.2);

  return (
    <Animated.Text
      style={{
        fontSize: scaledFontSize,
        lineHeight: scaledLineHeight,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
