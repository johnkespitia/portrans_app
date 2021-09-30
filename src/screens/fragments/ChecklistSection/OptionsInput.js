import {Select, SelectItem} from '@ui-kitten/components';
import React, {useState} from 'react';

const OptionsInput = question => {
  const [selectedIndex, setSelectedIndex] = useState();
  return (
    <>
      <Select
        value={
          selectedIndex ? question.options[selectedIndex.row].option_text : null
        }
        placeholder={'Seleccione Opción'}
        label={question.question}
        onSelect={index => {
          setSelectedIndex(index);
          question.onChange(question.id, question.options[index.row].id);
        }}>
        {question.options.map((opt, idx) => (
          <SelectItem title={opt.option_text} row={idx} key={opt.id} />
        ))}
      </Select>
    </>
  );
};

export default OptionsInput;
