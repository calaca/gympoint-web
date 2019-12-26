import React from 'react';
import PropTypes from 'prop-types';

import { LabelStyled } from './styles';

export default function Label({ children, htmlFor }) {
  return <LabelStyled htmlFor={htmlFor}>{children}</LabelStyled>;
}

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  htmlFor: PropTypes.string.isRequired,
};
