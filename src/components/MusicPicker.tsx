import React from 'react';
import { Button, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { RootState, AppDispatch } from '../state/store';
import { setMusicFile } from '../state/appSlice';
import { View, StyleSheet } from 'react-native';

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
      dispatch(setMusicFile({ uri: result.uri, name: result.name }));
    }
  };

  return (
    <View style={styles.container}>
      <Text
        category="h4"
        status="basic"
        appearance="default"
        style={styles.centerText}
      >
        Selected Music File: {musicFile?.name ?? 'No file selected'}
      </Text>
      <Button style={styles.button} onPress={handleSelectMusicFile}>
        Select Music File
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1A2138',
    borderRadius: 10,
    marginBottom: 20,
  },
  centerText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF3D71',
    borderColor: '#FF3D71',
  },
});

export default MusicPicker;
