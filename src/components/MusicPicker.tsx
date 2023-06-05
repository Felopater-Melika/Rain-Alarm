import React from 'react';
import { Button, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { RootState, AppDispatch } from '../state/store';
import { setMusicFile } from '../state/appSlice';

const MusicPicker = () => {
  const musicFile = useSelector((state: RootState) => state.app.musicFile);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectMusicFile = async () => {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });

    if (result.type === 'success') {
      // Use the temporary URI directly
      dispatch(setMusicFile(result.uri));
    }
  };

  return (
    <>
      <Text category="h4">
        Selected Music File: {musicFile ?? 'No file selected'}
      </Text>
      <Button onPress={handleSelectMusicFile}>Select Music File</Button>
    </>
  );
};

export default MusicPicker;
