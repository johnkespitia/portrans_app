import React from 'react';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {SafeAreaView, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import TopBar from 'portrans_app/src/screens/fragments/TopBar';
const MenuScreen = ({route, navigation}) => {
  const user = useSelector(state => state.userReducer.user);
  const navigateDetails = () => {
    navigation.navigate('Login');
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <TopBar navigation={navigation} />
      <Divider />
      <Layout style={styles.container}>
        <Image
          style={styles.logo}
          source={require('portrans_app/src/assets/brand.png')}
        />
        {user === null && (
          <Button onPress={navigateDetails}>Iniciar Sesión</Button>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
});

export default MenuScreen;
