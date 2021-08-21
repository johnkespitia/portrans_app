import React, {useEffect, useState} from 'react';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ThemeContext} from 'portrans_app/src/theme/theme-context';
import TopBar from 'portrans_app/src/screens/fragments/TopBar';
import Storage from 'portrans_app/src/libs/storage';

const HomeScreen = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const data = await Storage.instance.get('userdata');
      const user = JSON.parse(data);
      setUserInfo(user);
    };
    getUser();
  }, []);
  const logout = async () => {
    await Storage.instance.remove('userdata');
    setUserInfo(null);
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar navigation={navigation} goBack={true} />
      <Divider />
      <Layout style={styles.container}>
        <Button style={{marginVertical: 4}} onPress={themeContext.toggleTheme}>
          {themeContext.theme === 'light'
            ? 'Cambiar a Oscuro'
            : 'Cambiar a Claro'}
        </Button>
        {userInfo !== null && Object.keys(userInfo).length > 0 && (
          <Button style={{marginVertical: 4}} onPress={logout}>
            Cerrar Sesión
          </Button>
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
