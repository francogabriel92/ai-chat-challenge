import { AnimatePresence, View } from 'tamagui';

import Avatar from '@/components/ui/avatar';
import WritingBadge from '@/features/chat/components/writing-badge';

const AVATAR_SIZE = 30;

export default function AssistantAvatar({ isStreaming }: { isStreaming?: boolean }) {
  return (
    <View
      animation='bouncy'
      enterStyle={{
        scale: 0,
        opacity: 0,
      }}
      height={AVATAR_SIZE}
      items='center'
      justify='center'
      opacity={1}
      position='relative'
      scale={1}
      width={AVATAR_SIZE}
    >
      <Avatar
        alt='Assistant Avatar'
        size={AVATAR_SIZE}
        src={require('@/assets/images/gemini-icon.png')}
      />
      <AnimatePresence>{isStreaming ? <WritingBadge /> : null}</AnimatePresence>
    </View>
  );
}
