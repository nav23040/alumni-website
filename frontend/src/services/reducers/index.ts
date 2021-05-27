import { combineReducers } from 'redux';
import authReducer from './auth';
import { statusReducer } from './common';

const reducers = combineReducers({ authReducer, statusReducer });

export default reducers;
export type RootState = ReturnType<typeof reducers>;
