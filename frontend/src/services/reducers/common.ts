import { SET_ERROR, SET_LOADING, SET_LOADING_F } from '../actions/actionTypes';

interface IStatus {
	error?: String;
	loading?: boolean;
}

const initState: IStatus = {
	error: undefined,
	loading: true,
};

export function statusReducer(state = initState, action: any) {
	switch (action.type) {
		case SET_LOADING:
			return { ...initState, error: action.error, loading: true };
		case SET_ERROR:
			return { ...initState, error: action.error, loading: false };
		case SET_LOADING_F:
			return { ...initState, loading: false };
		default:
			return state;
	}
}
