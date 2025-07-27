import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

export const config = createTamagui({
  ...defaultConfig,
  settings: {
    ...defaultConfig.settings,
    /**
     * Set to false because I'm getting typescript errors related to borderRadius and br,
     * it's not recognizing the shorthands or the longhands when this is set to true.
     * For more info: https://github.com/tamagui/tamagui/issues/3555
     */
    onlyAllowShorthands: false,
  },
});

export default config;

export type Conf = typeof config;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
