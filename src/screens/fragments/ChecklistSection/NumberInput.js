import React, {useState} from 'react';
import {Input} from '@ui-kitten/components';

const NumberInput = question => {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      label={question.question}
      keyboardType={'numeric'}
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};

export default NumberInput;
