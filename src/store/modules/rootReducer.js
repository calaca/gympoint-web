import { combineReducers } from 'redux';

import auth from './auth/reducer';
import students from './students/reducer';
import plans from './plans/reducer';
import enrollments from './enrollments/reducer';
import helpOrders from './helpOrders/reducer';

export default combineReducers({
  auth,
  students,
  plans,
  enrollments,
  helpOrders,
});
