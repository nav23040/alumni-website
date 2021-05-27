import { Dispatch } from 'redux';
import { SET_LOADING } from './actionTypes';

export const setLoading = () => (dispatch: Dispatch) => {
    dispatch({ type: SET_LOADING, payload: 'true' });
};
