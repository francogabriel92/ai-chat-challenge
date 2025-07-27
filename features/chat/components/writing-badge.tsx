import { useEffect } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Circle, View } from 'tamagui';

function PulseDot({ delay = 0 }: { delay: number }) {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const config = {
      duration: 1800,
      easing: Easing.out(Easing.ease),
    };

    scale.value = withDelay(delay, withRepeat(withTiming(2.5, config), -1));

    opacity.value = withDelay(delay, withRepeat(withTiming(0, config), -1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    transformOrigin: 'center',
  }));

  return (
    <View
      l='-50%'
      position='absolute'
      t='-50%'
      transform={[{ translateY: '-50%' }, { translateX: '-50%' }]}
    >
      <Animated.View style={animatedStyle}>
        <Circle bg='transparent' borderColor='$blue7' borderWidth={1} size='$0.75' />
      </Animated.View>
    </View>
  );
}

export default function WritingBadge() {
  return (
    <View
      animation='medium'
      b={0}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
      position='absolute'
      r={2}
    >
      <View gap='$1' items='center' position='relative' px={3} py={2}>
        <PulseDot delay={0} />
        <PulseDot delay={900} />
        <Circle
          bg='$blue7'
          l='-50%'
          position='absolute'
          size='$0.75'
          t='-50%'
          transform={[{ translateY: '-50%' }, { translateX: '-50%' }]}
        />
      </View>
    </View>
  );
}
