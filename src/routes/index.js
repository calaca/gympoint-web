import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import StudentsNewEdit from '~/pages/Students/NewEdit';

import Plans from '~/pages/Plans';
import PlansNewEdit from '~/pages/Plans/NewEdit';

import Enrollments from '~/pages/Enrollments';
import EnrollmentsNewEdit from '~/pages/Enrollments/NewEdit';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/add" exact component={StudentsNewEdit} isPrivate />
      <Route
        path="/students/edit/:id"
        exact
        component={StudentsNewEdit}
        isPrivate
      />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/add" exact component={PlansNewEdit} isPrivate />
      <Route path="/plans/edit/:id" exact component={PlansNewEdit} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route
        path="/enrollments/add"
        exact
        component={EnrollmentsNewEdit}
        isPrivate
      />
      <Route
        path="/enrollments/edit/:id"
        exact
        component={EnrollmentsNewEdit}
        isPrivate
      />

      <Route path="/help-orders" exact component={HelpOrders} isPrivate />
    </Switch>
  );
}
