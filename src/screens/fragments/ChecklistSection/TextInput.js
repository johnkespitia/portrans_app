import React, {useState} from 'react';
import {Input} from '@ui-kitten/components';

const TextInput = question => {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      label={question.question}
      onChangeText={nextValue => setValue(nextValue)}
    />
  );
};

export default TextInput;
