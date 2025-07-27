import { useEffect } from 'react';

import { Loader2 } from '@tamagui/lucide-icons';
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface SpinnerProps {
  size?: number;
}

export default function Spinner({ size = 24 }: SpinnerProps) {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
  }, [rotate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  return <Loader2 size={size} style={animatedStyle} />;
}
