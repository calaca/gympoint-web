import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { useField } from '@rocketseat/unform';

export default function MaskInput({ name, inputMask, maskChar, valueDefault }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [mask, setMask] = useState(
    defaultValue || valueDefault ? valueDefault : ''
  );

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.value',
      });
    }
  }, [ref.current]); // eslint-disable-line

  function handleMask(e) {
    return setMask(e.target.value);
  }

  return (
    <>
      <InputMask
        type="text"
        id={fieldName}
        name={fieldName}
        mask={inputMask}
        maskChar={maskChar}
        value={mask}
        onChange={handleMask}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskInput.defaultProps = {
  valueDefault: '',
};

MaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputMask: PropTypes.string.isRequired,
  valueDefault: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
