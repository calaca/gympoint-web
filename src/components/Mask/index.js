import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { useField } from '@rocketseat/unform';

export default function Mask({ name, inputMask }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [mask, setMask] = useState(defaultValue || '');

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
    setMask(e.target.value);
  }

  return (
    <>
      <InputMask
        id={fieldName}
        name={fieldName}
        mask={inputMask}
        value={mask}
        onChange={handleMask}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

Mask.propTypes = {
  name: PropTypes.string.isRequired,
  inputMask: PropTypes.string.isRequired,
};
