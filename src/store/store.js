import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers, createStore} from 'redux';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import userReducer from 'portrans_app/src/store/reducers/users';
import checklistReducer from 'portrans_app/src/store/reducers/checklist';
import answersReducer from 'portrans_app/src/store/reducers/answers';
import carsReducer from 'portrans_app/src/store/reducers/cars';

const reducers = combineReducers({
  userReducer: userReducer,
  checklistReducer: checklistReducer,
  answersReducer: answersReducer,
  carsReducer: carsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const _persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(_persistedReducer);
export const persistor = persistStore(store);
