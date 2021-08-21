import React, {useEffect, useState} from 'react';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {SafeAreaView, Image, StyleSheet} from 'react-native';
import Storage from 'portrans_app/src/libs/storage';
import TopBar from 'portrans_app/src/screens/fragments/TopBar';
const HomeScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const data = await Storage.instance.get('userdata');
      const user = JSON.parse(data);
      setUserInfo(user);
    };
    getUser();
  }, []);
  const navigateDetails = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar navigation={navigation} />
      <Divider />
      <Layout style={styles.container}>
        <Image
          style={styles.logo}
          source={require('portrans_app/src/assets/brand.png')}
        />
        {userInfo === null && (
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

export default HomeScreen;
