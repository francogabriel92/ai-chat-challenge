import { Link, Stack } from 'expo-router';
import { View, Text } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ups!' }} />
      <View m={10}>
        <Text>Esta página no existe.</Text>
        <Link href='/chat'>
          <Text color='$blue9'>Ir a la pantalla de chat</Text>
        </Link>
      </View>
    </>
  );
}
