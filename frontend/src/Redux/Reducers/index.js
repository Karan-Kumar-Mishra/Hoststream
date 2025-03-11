
import { combineReducers } from 'redux';
import dataReducer from './DataReducers.js';

const rootReducer = combineReducers({
  Data: dataReducer,
}); 

export default rootReducer;