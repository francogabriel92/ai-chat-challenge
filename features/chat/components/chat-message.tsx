import { XStack } from 'tamagui';

import AssistantAvatar from '@/features/chat/components/assistant-avatar';
import ChatBubble from '@/features/chat/components/chat-bubble';

type ChatMessageProps = {
  text: string;
  isUser?: boolean;
  isStreaming?: boolean;
};

export default function ChatMessage({ text, isUser, isStreaming }: ChatMessageProps) {
  return (
    <XStack gap='$2' items='flex-end' justify={isUser ? 'flex-end' : 'flex-start'} my='$2'>
      {!isUser ? <AssistantAvatar isStreaming={isStreaming} /> : null}
      {text ? <ChatBubble isStreaming={isStreaming} isUser={isUser} text={text} /> : null}
    </XStack>
  );
}
