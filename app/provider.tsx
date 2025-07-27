import { useColorScheme } from 'react-native';

import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui';

import { config } from '@/tamagui.config';

export default function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      {children}
    </TamaguiProvider>
  );
}
