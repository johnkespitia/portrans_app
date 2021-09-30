import React, {useEffect, useState} from 'react';
import {
  Card,
  AutocompleteItem,
  Autocomplete,
  Text,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Http from 'portrans_app/src/libs/http';
import {URL_API} from 'portrans_app/constants';
import {getCars} from 'portrans_app/src/store/reducers/cars';

const filter = (item, query) =>
  item.dni.toLowerCase().includes(query.toLowerCase());

const PreField = question => {
  const cars = useSelector(state => state.carsReducer.cars);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState(null);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(async () => {
    if (!loaded && !cars) {
      try {
        const res = await Http.instance.get(`${URL_API}/car/getlistcars`);
        if (res.code === 200) {
          dispatch(getCars(res.data));
        }
      } catch (errore) {}
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!data && cars) {
      setData(cars);
    }
  }, []);
  const onSelect = index => {
    setValue(data[index].dni);
    question.storeAnswers('car_id', data[index].id);
  };
  const onChangeText = query => {
    setValue(query);
    setData(cars.filter(item => filter(item, query)));
  };
  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.dni} />
  );
  return (
    <Card style={styles.question}>
      <Text style={styles.title}>Ingrese la placa del vehículo</Text>
      {data && (
        <Autocomplete
          placeholder="Placa del vehículo"
          value={value}
          onSelect={onSelect}
          onChangeText={onChangeText}>
          {data.map(renderOption)}
        </Autocomplete>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  question: {
    minWidth: '95%',
    padding: 2,
    margin: 6,
    borderRadius: 0,
  },
  title: {
    fontWeight: 'bold',
    color: '#858fa3',
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default PreField;
