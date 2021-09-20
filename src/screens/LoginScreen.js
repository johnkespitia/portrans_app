import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Card,
  Input,
  Icon,
  Button,
} from '@ui-kitten/components';
import TopBar from 'portrans_app/src/screens/fragments/TopBar';
import Http from 'portrans_app/src/libs/http';
import {URL_API} from 'portrans_app/constants';
import {login} from 'portrans_app/src/store/reducers/users';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const loginAction = async () => {
    setLoading(true);
    setErrorText('');
    try {
      let body = {
        username,
        password,
      };
      console.log(`${URL_API}/employe/loginapp`)
      const res = await Http.instance.post(`${URL_API}/employe/loginapp`, body);
      if (res.code !== 200) {
        setLoading(false);
        setErrorText('Error en el proceso intente más tarde');
      } else {
        setLoading(false);
        dispatch(login(res.data));
        navigation.navigate('Home');
      }
    } catch (errore) {
      setLoading(false);
      setErrorText('Error en el proceso intente más tarde');
    }
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar navigation={navigation} goBack={true} configBtn={true} />
      <Divider />
      <Layout style={styles.topContainer} level="1">
        <Text style={styles.title} category="h5">
          Iniciar Sesión
        </Text>
        <Card>
          {loading ? (
            <ActivityIndicator
              style={styles.loader}
              color="#000"
              size="large"
            />
          ) : null}
          <Input
            placeholder="Ingrese su cédula"
            label={'Cédula'}
            style={styles.input}
            defaultValue={username}
            onChangeText={setUsername}
          />
          <Input
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
            defaultValue={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Text status="danger">{errorText}</Text>
          <Button onPress={loginAction} style={styles.input} disabled={loading}>
            Iniciar Sesión
          </Button>
        </Card>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  title: {
    padding: 2,
    textAlign: 'center',
  },
  input: {
    marginVertical: 10,
  },
});

export default LoginScreen;
