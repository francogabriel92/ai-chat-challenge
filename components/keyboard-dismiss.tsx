import { Keyboard, Platform, Pressable } from 'react-native';

interface KeyboardDismissProps {
  children: React.ReactNode;
}

export default function KeyboardDismiss({ children }: KeyboardDismissProps) {
  const handleOnPress = () => {
    if (!Keyboard.isVisible() || Platform.OS === 'web') return;
    Keyboard.dismiss();
  };

  return (
    <Pressable accessible={false} onPress={() => handleOnPress()} style={{ flex: 1 }}>
      {children}
    </Pressable>
  );
}
