import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import {Image, StyleSheet, View} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

const CameraInput = question => {
  const [response, setResponse] = React.useState(null);

  const onButtonPress = React.useCallback(options => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
  }, []);

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
