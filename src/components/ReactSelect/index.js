import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import { useField } from '@rocketseat/unform';
import { lighten } from 'polished';
import colors from '~/styles/colors';

export default function ReactSelect({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title || option.name}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: lighten(0.25, colors.primary),
            primary50: lighten(0.2, colors.primary),
            primary: colors.primary,
          },
        })}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
