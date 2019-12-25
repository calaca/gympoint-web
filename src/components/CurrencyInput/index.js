import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import { useField } from '@rocketseat/unform';

export default function MaskInput({ name, defaultValue, disabled }) {
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
      <CurrencyFormat
        id={fieldName}
        name={fieldName}
        prefix="R$"
        fixedDecimalScale
        decimalSeparator=","
        decimalScale={2}
        thousandSeparator="."
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </>
  );
}

MaskInput.defaultProps = {
  defaultValue: '',
  disabled: false,
};

MaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
