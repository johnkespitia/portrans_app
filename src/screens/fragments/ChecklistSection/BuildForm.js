import React, {useState} from 'react';
import {Card, List} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {
  TEXT_INPUT,
  NUMBER_INPUT,
  OPTIONS_INPUT,
  IMAGE_INPUT,
  YES_NO_INPUT,
  GOOD_BAD_NA_INPUT,
} from 'portrans_app/constants';
import YesNoInput from 'portrans_app/src/screens/fragments/ChecklistSection/YesNoInput';
import TextInput from 'portrans_app/src/screens/fragments/ChecklistSection/TextInput';
import GoodBadNAInput from 'portrans_app/src/screens/fragments/ChecklistSection/GoodBadNotApplyInput';
import OptionsInput from 'portrans_app/src/screens/fragments/ChecklistSection/OptionsInput';
import NumberInput from 'portrans_app/src/screens/fragments/ChecklistSection/NumberInput';
import CameraInput from 'portrans_app/src/screens/fragments/ChecklistSection/CameraInput';

const BuildForm = ({questions}) => {
  const renderItem = ({item, index}) => {
    return (
      <Card style={styles.question} key={index}>
        {getInput(item)}
      </Card>
    );
  };
  return (
    <List styles={styles.container} renderItem={renderItem} data={questions} />
  );
};

const getInput = question => {
  if (question.question_type_id === YES_NO_INPUT) {
    return <YesNoInput {...question} />;
  }
  if (question.question_type_id === OPTIONS_INPUT) {
    return <OptionsInput {...question} />;
  }
  if (question.question_type_id === GOOD_BAD_NA_INPUT) {
    return <GoodBadNAInput {...question} />;
  }
  if (question.question_type_id === NUMBER_INPUT) {
    return <NumberInput {...question} />;
  }
  if (question.question_type_id === IMAGE_INPUT) {
    return <CameraInput {...question} />;
  }
  if (question.question_type_id === TEXT_INPUT) {
    return <TextInput {...question} />;
  } else {
    return <TextInput {...question} />;
  }
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
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5e72e4',
    paddingTop: 10,
  },
  question: {
    minWidth: '95%',
    padding: 2,
    margin: 6,
    borderRadius: 0,
  },
});
export default BuildForm;
