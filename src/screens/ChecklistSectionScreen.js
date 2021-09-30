/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Divider, Layout, List, ListItem} from '@ui-kitten/components';
import {Alert, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import Http from 'portrans_app/src/libs/http';
import {URL_API} from 'portrans_app/constants';
import {getSection} from 'portrans_app/src/store/reducers/checklist';
import ErrorAlert from 'portrans_app/src/screens/fragments/ErrorAlert';

const renderItem = ({item, index}) => (
  <ListItem title={`${item?.title}`} description={`${item?.description}`} />
);
const ChecklistSectionScreen = ({route, navigation}) => {
  const [errorText, setErrorText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [actualChecklist, setActualChecklist] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {id} = route.params;
  const checklist = useSelector(state =>
    loaded ? state.checklistReducer.checklist : null,
  );
  useEffect(async () => {
    if (!loaded) {
      setLoading(true);
      try {
        const res = await Http.instance.get(
          `${URL_API}/checklist/getlistsection/${id}`,
        );
        if (res.code !== 200) {
          setErrorText('Error en el proceso intente más tarde');
          ErrorAlert(
            'Las secciones del checklist no pudieron ser cargadas',
            () =>
              navigation.navigate('Checklist', {
                screen: 'Checklists',
              }),
          );
        } else {
          dispatch(
            getSection({
              checklist_id: id,
              sections: res.data,
            }),
          );
          setLoaded(true);
        }
      } catch (errore) {
        setErrorText('Error en el proceso intente más tarde');
        setLoading(false);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (actualChecklist === null && checklist != null) {
      let chl = checklist.find(chls => chls.id === id);
      setActualChecklist(chl);
    }
  });

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Layout style={styles.container}>
      <Text status={'primary'} category={'h1'} style={styles.text}>
        {actualChecklist?.name.toUpperCase()}
      </Text>
      <Text status="danger">{errorText}</Text>
      {loading && (
        <ActivityIndicator style={styles.loader} color="#000" size="large" />
      )}
      {actualChecklist != null &&
        actualChecklist.sections !== undefined &&
        actualChecklist.sections.length > 0 && (
          <Layout style={styles.containerList}>
            <List
              data={actualChecklist.sections.map((item, idx) => {
                return {
                  description: `Sección ${idx + 1}`,
                  title: item?.title,
                };
              })}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
            <Button
              status="success"
              style={styles.button}
              onPress={() => {
                Alert.alert(
                  'Iniciar Checklist',
                  'Está seguro que desea iniciar el proceso',
                  [
                    {
                      text: 'Iniciar',
                      onPress: () =>
                        navigation.navigate('Checklist', {
                          screen: 'ChecklistsForm',
                          params: {
                            id: actualChecklist.id,
                          },
                        }),
                      style: 'destructive',
                    },
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                  ],
                );
              }}
              title={'Iniciar Checklist'}>
              Iniciar Checklist
            </Button>
          </Layout>
        )}
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
  text: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    borderRadius: 0,
  },
});

export default ChecklistSectionScreen;
