import { useEffect, useState } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Pause, Volume2 } from '@tamagui/lucide-icons';
import { AudioPlayer, createAudioPlayer } from 'expo-audio';
import { AnimatePresence, Button, View, Spinner } from 'tamagui';

import { getTextToSpeechData } from '@/features/chat/utils/text-to-speech';

interface TTSProps {
  text: string;
  visible?: boolean;
}

type AudioState = 'loading' | 'playing' | 'stopped';

type ButtonProps = {
  onPress: (e: GestureResponderEvent) => void;
  icon: React.ReactElement;
};

export default function TTS({ text, visible }: TTSProps) {
  const [audioPlayer, setAudioPlayer] = useState<AudioPlayer | null>(null);
  const [audioState, setAudioState] = useState<AudioState>('stopped');

  const getNewAudioPlayer = async () => {
    try {
      setAudioState('loading');
      if (audioPlayer) return audioPlayer;

      const audioUri = await getTextToSpeechData(text);

      if (!audioUri) return null;

      const audioPlayerInstance = createAudioPlayer(audioUri);

      setAudioPlayer(audioPlayerInstance);

      return audioPlayerInstance;
    } catch (error) {
      console.error('Error creating audio player:', error);
    } finally {
      setAudioState('stopped');
    }
  };

  const handlePlay = async (e: GestureResponderEvent) => {
    e.preventDefault();

    if (!audioPlayer) {
      const newAudioPlayer = await getNewAudioPlayer();

      if (!newAudioPlayer) throw new Error('Failed to create audio player');

      setAudioState('playing');
      newAudioPlayer?.play();
      setAudioPlayer(newAudioPlayer);

      return;
    }

    audioPlayer.seekTo(0);
    audioPlayer.play();
    setAudioState('playing');

    return;
  };

  const handlePause = () => {
    if (!audioPlayer) return;
    audioPlayer.pause();
    setAudioState('stopped');
  };

  const handleAudioEnd = () => {
    setAudioState('stopped');
  };

  useEffect(() => {
    if (!audioPlayer) return;

    audioPlayer.addListener('playbackStatusUpdate', (status) => {
      if (status.isLoaded && status.didJustFinish) {
        handleAudioEnd();
      }
    });
  }, [audioPlayer]);

  const shouldShowButton = audioState !== 'stopped' || visible;

  const buttonProps: Record<AudioState, ButtonProps> = {
    loading: {
      onPress: handlePause,
      icon: <Spinner size='small' />,
    },
    playing: {
      onPress: handlePause,
      icon: <Pause />,
    },
    stopped: {
      onPress: handlePlay,
      icon: <Volume2 />,
    },
  };

  return (
    <AnimatePresence>
      {shouldShowButton ? (
        <View
          animation='bouncy'
          bottom='$-2'
          enterStyle={{ scale: 0.3, opacity: 0 }}
          exitStyle={{ scale: 0.3, opacity: 0 }}
          items='center'
          position='absolute'
          right='$-3'
        >
          <Button
            animation='quick'
            circular
            icon={buttonProps[audioState].icon}
            onPress={buttonProps[audioState].onPress}
            pressStyle={{ scale: 0.9 }}
            size='$2'
            theme='white'
          />
        </View>
      ) : null}
    </AnimatePresence>
  );
}
