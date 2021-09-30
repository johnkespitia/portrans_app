import {RadioGroup, Radio, Text, Layout} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

const OPTIONS = ['Bueno', 'Malo', 'No Aplica'];
const GoodBadNotApplyInput = question => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    question.onChange(question.id, OPTIONS[0]);
  }, []);
  return (
    <>
      <Text style={styles.title} category={'label'}>
        {question.question}
      </Text>
      <Layout style={styles.YesNoStyle}>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => {
            setSelectedIndex(index);
            question.onChange(question.id, OPTIONS[index]);
          }}>
          {OPTIONS.map((item, index) => (
            <Radio key={index}>{item}</Radio>
          ))}
        </RadioGroup>
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

export default GoodBadNotApplyInput;
