import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Divider, Layout, List, ListItem, Button} from '@ui-kitten/components';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import Http from 'portrans_app/src/libs/http';
import {URL_API} from 'portrans_app/constants';
import {syncAnswer} from 'portrans_app/src/store/reducers/answers';

const HistoryScreen = ({route, navigation}) => {
  const answers = useSelector(state => state.answersReducer.answers);
  const cars = useSelector(state => state.carsReducer.cars);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const renderItem = ({item}) => (
    <ListItem
      title={`${item?.title}`}
      description={`${item?.description}`}
      onPress={item?.onPress}
      accessoryRight={() => (
        <Button
          onPress={() => {
            SendForm(item.content);
          }}
          disabled={loading}
          size="tiny">
          {!loading ? 'Enviar' : 'Cargando'}
        </Button>
      )}
    />
  );
  // eslint-disable-next-line no-shadow
  const SendForm = async answers => {
    setLoading(true);
    try {
      const res = await Http.instance.sendForm(
        `${URL_API}/answer/sendanswers`,
        answers,
      );
      console.log(`${URL_API}/answer/sendanswers`);
      console.log(res);
      if (res.code === 200) {
        //dispatch(syncAnswer(answers));
      }
    } catch (errore) {
      console.log(errore);
    }
    setLoading(false);
  };

  return (
    <Layout style={styles.container}>
      {loading && (
        <ActivityIndicator style={styles.loader} color="#000" size="large" />
      )}
      {answers !== null && (
        <Layout style={styles.containerList}>
          <List
            data={answers.map(item => {
              const fecha = new Date();
              fecha.setTime(item.date_start);
              const initialData = item?.sections.find(
                sect => sect.id === 'initial',
              );
              const carInfo = cars.find(c => {
                return c.id == initialData.answers.car_id;
              });
              return {
                title: `Checklist ${item?.id}`,
                description: `Completeada el ${fecha.toLocaleDateString(
                  'es',
                )} para el vehículo ${carInfo?.dni}`,
                content: item,
                onPress: () => {},
              };
            })}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
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
  reloadBtn: {
    marginTop: 5,
  },
});

export default HistoryScreen;
