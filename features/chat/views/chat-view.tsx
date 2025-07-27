import { Platform } from 'react-native';

import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';

import AutoScrollView from '@/components/auto-scroll-view';
import KeyboardDismiss from '@/components/keyboard-dismiss';
import LoadingDots from '@/components/ui/loading-dots';
import ChatErrorMessage from '@/features/chat/components/chat-error-message';
import ChatInput from '@/features/chat/components/chat-input';
import ChatMessage from '@/features/chat/components/chat-message';
import { generateAPIUrl } from '@/utils/api';

export default function ChatView() {
  const { messages, error, handleInputChange, input, handleSubmit, status, stop, reload } = useChat(
    {
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    },
  );

  const isSubmitted = status === 'submitted';
  const isStreaming = status === 'streaming';

  // Check if the request was canceled or if the error message indicates a cancellation
  const isCanceled =
    (status === 'error' && error?.message.includes('canceled')) ||
    error?.message.includes('FetchRequestCanceledException');

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      enableAutomaticScroll={Platform.OS === 'ios'}
      enableOnAndroid
      extraScrollHeight={Platform.OS === 'ios' ? 20 : 70}
    >
      <YStack
        bg='$background'
        height='100%'
        maxW={Platform.OS === 'web' ? 800 : '100%'}
        mx='auto'
        pb='$5'
        width='100%'
      >
        <SafeAreaView style={{ flex: 1 }}>
          <YStack
            flex={1}
            flexDirection='column'
            height={Platform.OS === 'web' ? '100vh' : '95%'}
            pb={Platform.OS === 'web' ? '$5' : 0}
            px='$3'
          >
            <KeyboardDismiss>
              <AutoScrollView>
                {messages.map((m, i) => {
                  const isLastMessage = i === messages.length - 1;

                  return (
                    <YStack key={m.id} my='$2'>
                      <YStack>
                        <ChatMessage
                          isStreaming={isStreaming && isLastMessage}
                          isUser={m.role === 'user'}
                          text={m.content}
                        />
                      </YStack>
                    </YStack>
                  );
                })}
                {isSubmitted ? <LoadingDots /> : null}
                {error && !isCanceled ? (
                  <ChatErrorMessage
                    button={{
                      onClick: reload,
                      label: 'Reintentar',
                    }}
                  />
                ) : null}
              </AutoScrollView>
            </KeyboardDismiss>
            <ChatInput
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              input={input}
              isStreaming={isStreaming}
              isSubmitted={isSubmitted}
              stop={stop}
            />
          </YStack>
        </SafeAreaView>
      </YStack>
    </KeyboardAwareScrollView>
  );
}
