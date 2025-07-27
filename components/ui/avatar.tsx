import type { OpaqueColorValue } from 'react-native';

import { type GetThemeValueForKey, type SizeTokens, Avatar as TamaguiAvatar } from 'tamagui';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | SizeTokens;
  fallbackColor?: OpaqueColorValue | GetThemeValueForKey<'backgroundColor'>;
}

const Avatar = ({ src, alt, size = '$2', fallbackColor = 'transparent' }: AvatarProps) => {
  return (
    <TamaguiAvatar circular size={size}>
      <TamaguiAvatar.Image alt={alt} p='$1' src={src} />
      <TamaguiAvatar.Fallback backgroundColor={fallbackColor} />
    </TamaguiAvatar>
  );
};

export default Avatar;
