import { Text, Button, XStack } from 'tamagui';

interface ChatErrorMessageProps {
  button?: {
    onClick: () => void;
    label: string;
  };
  message?: string;
}

export default function ChatErrorMessage({ button, message }: ChatErrorMessageProps) {
  return (
    <XStack
      bg='$red3'
      borderColor='$red9'
      borderRadius='$2'
      borderWidth={1}
      items='center'
      maxW='80%'
      my='$2'
      px='$3'
      py='$2'
    >
      <Text color='$red11' fontSize='$3'>
        {message || 'Ha ocurrido un error: '}
      </Text>
      {button?.onClick ? (
        <Button ml='$2' onPress={() => button.onClick()} size='$3' theme='red'>
          {button.label || 'Reintentar'}
        </Button>
      ) : null}
    </XStack>
  );
}
