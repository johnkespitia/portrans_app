/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Layout, Text, Button, Card} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ErrorAlert from 'portrans_app/src/screens/fragments/ErrorAlert';
import BuildForm from './fragments/ChecklistSection/BuildForm';
import PreField from './fragments/ChecklistSection/PrefieldForm';
import {saveAnswers} from 'portrans_app/src/store/reducers/answers';
import Http from 'portrans_app/src/libs/http';
import {URL_API} from 'portrans_app/constants';

const ChecklistForm = ({route, navigation}) => {
  const checklist = useSelector(state => state.checklistReducer.checklist);
  const [actualSection, setActualSection] = useState(null);
  const [nextSection, setNextSection] = useState(null);
  const [actualChecklist, setActualChecklist] = useState(null);
  const [sectionValues, setSectionValues] = useState({});
  const [finished, setFinished] = useState(false);
  const [preFields, setPreFields] = useState(true);
  const [startDate] = useState(Date.now());
  const [saved, setSaved] = useState(false);
  const {id} = route.params;
  const answers = useSelector(state => state.answersReducer.answers);
  const dispatch = useDispatch();

  const SendForm = async () => {
    try {
      const res = await Http.instance.sendForm(
        `${URL_API}/answer/sendanswers`,
        answers,
      );
      if (res.code === 200) {
        //let chl = checklist.find(chls => chls.id === id);
        setSaved(true);
      }
    } catch (errore) {}
  };

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
    if (actualSection !== null && actualSection !== undefined) {
      setNextSection(
        actualChecklist.sections.find(
          section => section.parent === actualSection.id,
        ),
      );
    }
  });

  const storeAnswers = (name, value) => {
    setSectionValues({
      ...sectionValues,
      [name]: value,
    });
  };

  const saveSection = () => {
    if (preFields) {
      dispatch(
        saveAnswers({
          checklist_id: actualChecklist.id,
          date_start: startDate,
          section_id: 'initial',
          answers: sectionValues,
        }),
      );
      setPreFields(false);
    } else {
      dispatch(
        saveAnswers({
          checklist_id: actualChecklist.id,
          date_start: startDate,
          section_id: actualSection.id,
          answers: sectionValues,
        }),
      );
      if (nextSection !== undefined) {
        setActualSection(nextSection);
      } else {
        dispatch(
          saveAnswers({
            checklist_id: actualChecklist.id,
            date_start: startDate,
            section_id: 'final',
            answers: {
              finish_date: Date.now(),
            },
          }),
        );
        setFinished(true);
        SendForm();
        setActualSection({
          title: 'Checklist Finalizado',
        });
      }
    }
    setSectionValues({});
  };

  return (
    <Layout style={styles.container}>
      <Text status="success" style={styles.title}>
        {actualSection?.title}
      </Text>
      {preFields && <PreField storeAnswers={storeAnswers} />}
      {!preFields && !finished && actualSection && (
        <BuildForm
          storeAnswers={storeAnswers}
          questions={actualSection.questions}
        />
      )}
      {!finished && (
        <Layout style={styles.layout} level="1">
          <Button styles={styles.button} onPress={saveSection}>
            Guardar
          </Button>
          {actualSection && nextSection && actualSection.required !== '1' && (
            <Button status={'warning'} styles={styles.button}>
              Omitir
            </Button>
          )}
        </Layout>
      )}
      {finished && (
        <>
          <Text category="h3" style={styles.title}>
            El checklist fue completado correctamente
          </Text>
          {!saved && (
            <Card status="danger" style={styles.error}>
              <Text category="label" status="danger">
                No fue posible hacer enviar las respuestas en este momento,
                intentalo luego desde la sección de Ver Contestaciones
              </Text>
            </Card>
          )}
          {saved && (
            <Card status="success" style={styles.error}>
              <Text category="label" status="success">
                Hemos enviado las respuestas al sistema, no la verás en la
                sección de Ver Contestaciones
              </Text>
            </Card>
          )}
          <Button
            onPress={() => {
              navigation.navigate('Checklist', {
                screen: 'Checklists',
                params: {
                  id: actualChecklist.id,
                },
              });
            }}>
            Ir a Checklists
          </Button>
        </>
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
  title: {
    fontWeight: 'bold',
    color: '#5e72e4',
    paddingTop: 10,
    textAlign: 'center',
    paddingBottom: 30,
  },
  error: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  layout: {
    marginBottom: 0,
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'baseline',
  },
  button: {
    marginLeft: 50,
  },
});
export default ChecklistForm;
