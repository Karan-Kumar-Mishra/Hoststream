
import { combineReducers } from 'redux';
import dataReducer from './DataReducers';

const rootReducer = combineReducers({
  Data: dataReducer,
}); 

export default rootReducer;