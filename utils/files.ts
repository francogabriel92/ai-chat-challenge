import * as FileSystem from 'expo-file-system';

/**
 * Returns a base64 string from a Blob object.
 * @param blob The Blob object to convert.
 * @returns A promise that resolves to the base64 string.
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = reject;

    reader.onloadend = () => {
      const base64data = reader.result?.toString().split(',')[1];

      resolve(base64data || '');
    };

    reader.readAsDataURL(blob);
  });
}

/**
 * Saves a Blob as a file in the cache directory and returns its URI.
 * @param blob The Blob object to save.
 * @param extension The file extension to use.
 * @return A promise that resolves to the URI of the saved file.
 */
export async function saveBlobAsBase64File(blob: Blob, extension: string): Promise<string> {
  if (!blob || !(blob instanceof Blob)) {
    throw new Error('Invalid Blob object provided');
  }

  if (!extension) {
    throw new Error('File extension must be provided');
  }

  const extensionToUse = extension.startsWith('.') ? extension : `.${extension}`;

  const base64 = await blobToBase64(blob);

  const fileUri = `${FileSystem.cacheDirectory}audio-${Date.now()}${extensionToUse}`;

  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return fileUri;
}
