import { useEffect } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { Circle, XStack } from 'tamagui';

function Dot({ delay }: { delay: number }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(delay, withRepeat(withTiming(-6, { duration: 600 }), -1, true));
  }, [delay, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Circle bg='$blue6' size={5} />
    </Animated.View>
  );
}

export default function LoadingDots() {
  return (
    <XStack
      animation='quick'
      enterStyle={{ opacity: 0 }}
      gap='$1'
      height='$6'
      items='center'
      ml='$3'
      opacity={1}
    >
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </XStack>
  );
}
