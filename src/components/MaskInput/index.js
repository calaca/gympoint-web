import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { useField } from '@rocketseat/unform';

export default function MaskInput({ name, inputMask, maskChar, defaultValue }) {
  const ref = useRef();
  const { fieldName, registerField } = useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.value',
      });
    }
  }, [ref.current]); // eslint-disable-line

  function handleChange(e) {
    return setValue(e.target.value);
  }

  return (
    <>
      <InputMask
        type="text"
        id={fieldName}
        name={fieldName}
        mask={inputMask}
        maskChar={maskChar}
        value={value}
        onChange={handleChange}
        ref={ref}
      />
    </>
  );
}

MaskInput.defaultProps = {
  defaultValue: '',
  maskChar: '_',
};

MaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputMask: PropTypes.string.isRequired,
  maskChar: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
