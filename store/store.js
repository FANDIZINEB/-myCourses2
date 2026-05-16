import { createStore, combineReducers } from 'redux';
import reducerCourses from './reducerCourses';
import reducerCart from './reducerCart';
import reducerPayment from './reducerPayment';
import reducerUser from './reducerUser';

const rootReducer = combineReducers({
  courses: reducerCourses,
  cart: reducerCart,
  payments: reducerPayment,
  user: reducerUser,
});

const store = createStore(rootReducer);
export default store;