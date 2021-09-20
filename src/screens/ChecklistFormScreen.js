/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import ErrorAlert from 'portrans_app/src/screens/fragments/ErrorAlert';
import BuildForm from './fragments/ChecklistSection/BuildForm';

const ChecklistForm = ({route, navigation}) => {
  const checklist = useSelector(state => state.checklistReducer.checklist);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [actualSection, setActualSection] = useState(null);
  const [nextSection, setNextSection] = useState(null);
  const [actualChecklist, setActualChecklist] = useState(null);
  const {id} = route.params;

  useEffect(async () => {
    if (checklist === null || checklist === undefined) {
      ErrorAlert('Checklist no pudo ser cargado', () =>
        navigation.navigate('Checklist', {
          screen: 'Checklists',
        }),
      );
    }
    if (actualChecklist !== null && actualSection === null) {
      setActualSection(actualChecklist.sections[0]);
    }
  });
  useEffect(() => {
    if (actualChecklist === null) {
      let chl = checklist.find(chls => chls.id === id);
      setActualChecklist(chl);
    }
  });
  useEffect(() => {
    if (actualSection !== null) {
      setNextSection(
        actualChecklist.sections.find(
          section => section.parent === actualSection.id,
        ),
      );
    }
  });

  return (
    <Layout style={styles.container}>
      <Text status="success" style={styles.title}>
        {actualSection?.title}
      </Text>
      <Text status="danger">{errorText}</Text>
      {loading && <ActivityIndicator color="#000" size="large" />}
      {actualSection && <BuildForm questions={actualSection.questions} />}
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5e72e4',
    paddingTop: 10,
  },
});
export default ChecklistForm;
