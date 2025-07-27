import { useState } from 'react';
import { Platform } from 'react-native';

import { tokens } from '@tamagui/config/v4';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme, View } from 'tamagui';

import TTS from '@/features/chat/components/tts';

interface ChatBubbleProps {
  text: string;
  isUser?: boolean;
  isStreaming?: boolean;
}

export default function ChatBubble({ text, isUser, isStreaming }: ChatBubbleProps) {
  const theme = useTheme();
  const textColor = theme.color.get();
  const [showTTS, setShowTTS] = useState(false);

  // Shared values for animations
  const scale = useSharedValue(1);

  // Hover handles for web environment
  const handleHoverIn = () => {
    if (Platform.OS === 'web') {
      setShowTTS(true);
    }
  };

  const handleHoverOut = () => {
    if (Platform.OS === 'web') {
      setShowTTS(false);
    }
  };

  // Handle long press action
  const handleLongPressAction = () => {
    const TTS_ACTION_DURATION = 5000; // 5 seconds

    if (Platform.OS !== 'web') {
      setShowTTS(true);
      setTimeout(() => setShowTTS(false), TTS_ACTION_DURATION);
    }
  };

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      scale.value = withSpring(0.98);
      runOnJS(handleLongPressAction)();
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View
      flexDirection='row'
      items='center'
      justify={isUser ? 'flex-end' : 'flex-start'}
      maxW='80%'
      onMouseEnter={Platform.OS === 'web' ? handleHoverIn : undefined}
      onMouseLeave={Platform.OS === 'web' ? handleHoverOut : undefined}
      position='relative'
    >
      <GestureDetector gesture={longPressGesture}>
        <Animated.View style={[{ maxWidth: '100%' }, animatedStyle]}>
          <View
            animation='slow'
            bg={isUser ? '$blue3' : '$blue4'}
            borderBottomLeftRadius={isUser ? '$4' : '$1'}
            borderBottomRightRadius={isUser ? '$1' : '$4'}
            borderTopLeftRadius='$4'
            borderTopRightRadius='$4'
            enterStyle={{
              transform: [{ translateX: isUser ? 20 : -20 }],
              opacity: 0,
            }}
            px='$3'
            py='$2'
            transform={[{ translateX: 0 }]}
            width='100%'
          >
            <Markdown
              markdownit={MarkdownIt({ typographer: true }).disable([
                'table',
                'image',
                'blockquote',
                'backticks',
                'fence',
              ])}
              style={{
                text: { color: textColor },
                link: { textDecorationLine: 'underline' },
                hr: {
                  backgroundColor: textColor,
                  marginVertical: tokens.size['$1'],
                },
                ordered_list: {
                  color: textColor,
                  paddingBottom: tokens.size['$1'],
                },
                bullet_list: {
                  color: textColor,
                  paddingBottom: tokens.size['$1'],
                },
              }}
            >
              {text}
            </Markdown>
          </View>
        </Animated.View>
      </GestureDetector>
      {/* TTS Button - only show for non-user messages */}
      {!isUser && !isStreaming ? <TTS text={text} visible={showTTS} /> : null}
    </View>
  );
}
