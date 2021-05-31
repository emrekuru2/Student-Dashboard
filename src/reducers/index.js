import loggedReducer from './isLogged';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import uiReducer from './snackBar';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isLogged']
}
const allReducers = combineReducers({
  isLogged : loggedReducer,
  ui : uiReducer
})

export default persistReducer(persistConfig, allReducers);
