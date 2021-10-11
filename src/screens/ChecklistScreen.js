/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Divider,
  Layout,
  List,
  ListItem,
  Icon,
  Button,
} from '@ui-kitten/components';
import {Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import Http from 'portrans_app/src/libs/http';
import {URL_API} from 'portrans_app/constants';
import {getList} from 'portrans_app/src/store/reducers/checklist';

const renderItem = ({item, index}) => (
  <ListItem
    title={`${item?.title}`}
    description={`${item?.description}`}
    onPress={item?.onPress}
  />
);

const HomeIcon = props => <Icon {...props} name="home-outline" />;
const ChecklistScreen = ({route, navigation}) => {
  const checklist = useSelector(state => state.checklistReducer.checklist);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loadingCheckist = async () => {
    try {
      setLoading(true);
      const res = await Http.instance.get(`${URL_API}/checklist/getlist`);
      if (res.code !== 200) {
        setErrorText('Error en el proceso intente más tarde');
      } else {
        dispatch(getList(res.data));
      }
      setLoading(false);
    } catch (errore) {
      setErrorText('Error en el proceso intente más tarde');
      //ErrorAlert('Sección no disponible', () => navigation.navigate('Home'));
      setLoading(false);
    }
  };

  useEffect(async () => {
    if (checklist === null) {
      loadingCheckist();
    }
    setLoading(false);
  }, []);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Layout style={styles.container}>
      <Text status="danger">{errorText}</Text>
      {loading && (
        <ActivityIndicator style={styles.loader} color="#000" size="large" />
      )}
      <Button
        accessoryLeft={HomeIcon}
        status="primary"
        size="small"
        onPress={() => navigation.navigate('Home')}
        title={'Ir al Inicio'}>
        Ir al Inicio
      </Button>
      {checklist !== null && (
        <Layout style={styles.containerList}>
          <List
            data={checklist.map(item => {
              return {
                title: `Checklist ${item?.id}`,
                description: item?.name,
                onPress: () => {
                  navigation.navigate('Checklist', {
                    screen: 'ChecklistsSection',
                    params: {
                      id: item?.id,
                    },
                  });
                },
              };
            })}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
        </Layout>
      )}
      <Button
        status="success"
        size="small"
        style={styles.reloadBtn}
        onPress={() => loadingCheckist()}
        title={'Recargar'}>
        Recargar Checklists
      </Button>
      <Button
        status="info"
        size="small"
        style={styles.reloadBtn}
        onPress={() => {
          navigation.navigate('Checklist', {
            screen: 'ChecklistsHistory',
          });
        }}
        title={'Ver Contestaciones'}>
        Ver Constestaciones
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  containerList: {
    width: '100%',
  },
  reloadBtn: {
    marginTop: 5,
  },
});

export default ChecklistScreen;
