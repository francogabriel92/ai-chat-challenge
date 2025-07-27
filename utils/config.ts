import { AudioModule } from 'expo-audio';

export const setAudioConfig = () => {
  AudioModule.setAudioModeAsync({ playsInSilentMode: true });
};
