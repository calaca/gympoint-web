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

      <Route path="/enrollments" exact component={EnrollmentList} isPrivate />
      <Route path="/enrollments/add" component={EnrollmentAdd} isPrivate />
      <Route path="/enrollments/edit" component={EnrollmentEdit} isPrivate />
      <Route path="/help-orders" exact component={HelpOrderList} isPrivate />
      <Route path="/plans" exact component={PlanList} isPrivate />
      <Route path="/plans/add" component={PlanAdd} isPrivate />
      <Route path="/plans/edit:planId" component={PlanEdit} isPrivate />
      <Route path="/students" exact component={StudentList} isPrivate />
      <Route path="/students/add" component={StudentAdd} isPrivate />
      <Route
        path="/students/edit/:studentId"
        component={StudentEdit}
        isPrivate
      />
    </Switch>
  );
}
