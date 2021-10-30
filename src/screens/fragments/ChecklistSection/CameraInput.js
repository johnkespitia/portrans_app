import React, {useEffect} from 'react';
import {Button, Text} from '@ui-kitten/components';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

const CameraInput = question => {
  const [response, setResponse] = React.useState(null);

  const onButtonPress = React.useCallback(options => {
    launchCamera(
      {
        maxHeight: 200,
        maxWidth: 200,
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1,
        cameraType: 'back',
      },
      setResponse,
    );
  }, []);
  useEffect(() => {
    if (response) {
      let data = {
        name: response.assets[0].fileName,
        type: response.assets[0].type,
        uri:
          Platform.OS === 'android'
            ? response.assets[0].uri
            : response.assets[0].uri.replace('file://', ''),
      };
      question.onChange(question.id, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <>
      <Text style={styles.title} category={'label'}>
        {question.question}
      </Text>
      <Button key={'Tomar Foto'} onPress={() => onButtonPress()}>
        {'Tomar Foto'}
      </Button>
      {response?.assets &&
        response?.assets.map(({uri}) => (
          <View key={uri} style={styles.image}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.previewImage}
              source={{uri: uri}}
            />
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  previewImage: {
    marginTop: 10,
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#858fa3',
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default CameraInput;
