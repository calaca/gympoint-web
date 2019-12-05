import React from 'react';
import api from '~/services/api';

// import { Container } from './styles';

export default function StudentList() {
  api.get('plans');

  return <div>StudentList</div>;
}
