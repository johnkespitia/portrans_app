import React from 'react';
import {Divider, Layout, List, ListItem} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TopBar from 'portrans_app/src/screens/fragments/TopBar';
import {version} from 'portrans_app/app.json';
import {logout} from 'portrans_app/src/store/reducers/users';
import {cleanList} from 'portrans_app/src/store/reducers/checklist';
import {cleanAnswers} from 'portrans_app/src/store/reducers/answers';
import {cleanCars} from 'portrans_app/src/store/reducers/cars';

const ConfigScreen = ({navigation}) => {
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const logoutSession = () => {
    dispatch(logout());
    dispatch(cleanList());
    dispatch(cleanAnswers());
    dispatch(cleanCars());
    navigation.navigate('Home');
  };
  const goToLogin = async () => {
    navigation.navigate('Login');
  };

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.description}`}
      onPress={item.onPress}
    />
  );
  const data_about = [
    {
      title: 'Aplicación de PORTRANS',
      description: '',
      onPress: () => {},
    },
    {
      title: 'Contacto',
      description: 'Email: gerencia@portrans.com',
      onPress: () => {},
    },
    {
      title: 'Versión',
      description: `${version}`,
      onPress: () => {},
    },
    {
      title:
        user !== null && Object.keys(user).length > 0
          ? 'Cerrar Sesión'
          : 'Iniciar Sesión',
      description: '',
      onPress:
        user !== null && Object.keys(user).length > 0
          ? logoutSession
          : goToLogin,
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar navigation={navigation} goBack={true} configBtn={false} />
      <Divider />
      <Layout style={styles.containerList}>
        <List
          data={data_about}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
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
  containerList: {
    maxHeight: 200,
  },
});

export default ConfigScreen;
