import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import EnrollmentAdd from '../pages/EnrollmentAdd';
import EnrollmentEdit from '../pages/EnrollmentEdit';
import EnrollmentList from '../pages/EnrollmentList';
import HelpOrderList from '../pages/HelpOrderList';
import PlanAdd from '../pages/PlanAdd';
import PlanEdit from '../pages/PlanEdit';
import PlanList from '../pages/PlanList';
import SignIn from '../pages/SignIn';
import StudentAdd from '../pages/StudentAdd';
import StudentEdit from '../pages/StudentEdit';
import StudentList from '../pages/StudentList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/enrollments" component={EnrollmentList} isPrivate />
      <Route path="/enrollments-add" component={EnrollmentAdd} isPrivate />
      <Route path="/enrollments-edit" component={EnrollmentEdit} isPrivate />
      <Route path="/help-orders" component={HelpOrderList} isPrivate />
      <Route path="/plans" component={PlanList} isPrivate />
      <Route path="/plans-add" component={PlanAdd} isPrivate />
      <Route path="/plans-edit" component={PlanEdit} isPrivate />
      <Route path="/students" component={StudentList} isPrivate />
      <Route path="/student-add" component={StudentAdd} isPrivate />
      <Route path="/student-edit" component={StudentEdit} isPrivate />
    </Switch>
  );
}
