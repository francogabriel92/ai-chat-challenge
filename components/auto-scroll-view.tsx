import { useCallback, useEffect, useRef } from 'react';

import { ScrollView } from 'tamagui';

interface AutoScrollViewProps extends React.ComponentProps<typeof ScrollView> {
  children: React.ReactNode;
  enabled?: boolean;
}

export default function AutoScrollView({
  children,
  enabled = true,
  ...props
}: AutoScrollViewProps) {
  const scrollRef = useRef<ScrollView>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current && enabled) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [enabled]);

  useEffect(() => {
    scrollToBottom();
  }, [children, scrollToBottom]);

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  return (
    <ScrollView
      flex={1}
      onContentSizeChange={handleContentSizeChange}
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
