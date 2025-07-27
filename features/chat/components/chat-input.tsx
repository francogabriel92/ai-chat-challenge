import type { UseChatHelpers } from '@ai-sdk/react';

import { SendHorizontal, Pause } from '@tamagui/lucide-icons';
import Animated from 'react-native-reanimated';
import { Button, XStack, Input, AnimatePresence } from 'tamagui';

interface ChatInputProps {
  input: string;
  handleInputChange: UseChatHelpers['handleInputChange'];
  handleSubmit: UseChatHelpers['handleSubmit'];
  isSubmitted: boolean;
  isStreaming: boolean;
  stop: UseChatHelpers['stop'];
}

const AnimatedStop = Animated.createAnimatedComponent(Pause);
const AnimatedSend = Animated.createAnimatedComponent(SendHorizontal);

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isSubmitted,
  isStreaming,
  stop,
}: ChatInputProps) {
  return (
    <XStack gap='$2' items='center' mt='$2' width='100%'>
      <Input
        autoFocus
        flex={1}
        onChangeText={(text) =>
          handleInputChange({
            target: {
              value: text,
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>)
        }
        onSubmitEditing={(e) => {
          handleSubmit(e as any);
        }}
        placeholder='Escribe tu mensaje...'
        px='$2'
        py='$1'
        size='$4'
        theme='blue'
        value={input}
      />
      <Button onPress={isSubmitted || isStreaming ? stop : handleSubmit} size='$4' theme='blue'>
        <AnimatePresence>
          {isSubmitted || isStreaming ? (
            <AnimatedStop
              animation='bouncy'
              enterStyle={{ opacity: 0, scale: 0.5 }}
              exitStyle={{ opacity: 0, scale: 0.5 }}
            />
          ) : (
            <AnimatedSend
              animation='bouncy'
              enterStyle={{ opacity: 0, scale: 0.5 }}
              exitStyle={{ opacity: 0, scale: 0.5 }}
            />
          )}
        </AnimatePresence>
      </Button>
    </XStack>
  );
}
