import { memo } from 'react';
import { useFontScaleMonitor } from '@/hooks/use-font-scale-monitor';

/**
 * Isolated component that monitors font scale changes
 *
 * This component has no visual output and is wrapped in React.memo
 * to prevent re-renders from propagating to the rest of the app.
 *
 * When a font scale change is detected, it shows an alert prompting
 * the user to restart the app, but doesn't trigger any React re-renders
 * that would cause partial/inconsistent UI updates.
 */
function FontScaleMonitorComponent() {
  useFontScaleMonitor();
  return null;
}

// Prevent this component from re-rendering and propagating re-renders
// to the rest of the app tree
export const FontScaleMonitor = memo(FontScaleMonitorComponent, () => {
  // Always return true to prevent re-renders
  // This component has no props and no visual output
  return true;
});
