import React from 'react';
import {Alert} from 'react-native';

const ErrorAlert = (msg, fnRedirect) => {
  return Alert.alert('Error en el proceso', msg, [
    {
      text: 'Regresar',
      onPress: fnRedirect,
      style: 'cancel',
    },
  ]);
};

export default ErrorAlert;
