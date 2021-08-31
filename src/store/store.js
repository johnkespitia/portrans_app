import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers, createStore} from 'redux';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import userReducer from 'portrans_app/src/store/reducers/users';

const reducers = combineReducers({
  userReducer: userReducer,
  // other reducers goes here...
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const _persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(_persistedReducer);
export const persistor = persistStore(store);
