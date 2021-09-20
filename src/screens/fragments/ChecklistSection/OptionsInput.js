import {Select, SelectItem, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

const OptionsInput = question => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <Text style={styles.title} category={'label'}>
        {question.question}
      </Text>
      <Select
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {question.options.map(opt => (
          <SelectItem title={opt.option_text} key={opt.id} />
        ))}
      </Select>
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

export default OptionsInput;
