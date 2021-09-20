import {Toggle, Text, Layout} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

const YesNoInput = question => {
  const [checked, setChecked] = useState(false);
  const onCheckedChange = isChecked => {
    setChecked(isChecked);
  };
  return (
    <>
      <Text style={styles.title} category={'label'}>
        {question.question}
      </Text>
      <Layout style={styles.YesNoStyle}>
        <Text>No</Text>
        <Toggle checked={checked} onChange={onCheckedChange} />
        <Text>Si</Text>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  YesNoStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: '#858fa3',
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default YesNoInput;
