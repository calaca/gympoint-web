import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
      <Route path="/enrollments" component={EnrollmentList} />
      <Route path="/enrollments-add" component={EnrollmentAdd} />
      <Route path="/enrollments-edit" component={EnrollmentEdit} />
      <Route path="/help-orders" component={HelpOrderList} />
      <Route path="/plans" component={PlanList} />
      <Route path="/plans-add" component={PlanAdd} />
      <Route path="/plans-edit" component={PlanEdit} />
      <Route path="/students" component={StudentList} />
      <Route path="/student-add" component={StudentAdd} />
      <Route path="/student-edit" component={StudentEdit} />
    </Switch>
  );
}
