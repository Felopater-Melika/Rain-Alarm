import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../test-utils';
import MusicPicker from '../../src/components/MusicPicker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { store } from '../../src/state/store';
import { act } from 'react-test-renderer';

// Mock the DocumentPicker.getDocumentAsync function
jest.mock('expo-document-picker', () => ({
  getDocumentAsync: jest.fn().mockResolvedValue({
    type: 'success',
    uri: 'file.mp3',
  }),
}));

jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn().mockResolvedValue('file.mp3'),
}));

// TODO: test file picker and permissions

describe('MusicPicker', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MusicPicker />);

    expect(getByText(/Selected Music File:/)).toBeTruthy();
  });

  it('dispatches action on button press', async () => {
    const { getByText } = render(<MusicPicker />);

    await act(async () => {
      await fireEvent.press(getByText('Select Music File'));
    });

    expect(store.getState().app.musicFile).toEqual('file.mp3');
  });
});
