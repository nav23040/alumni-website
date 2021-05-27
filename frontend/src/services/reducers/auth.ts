import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/actionTypes';

interface AuthState {
	user?: {
		first_name: string;
		last_name: string;
		email: string;
		token: string;
		_id: string;
	};
}

const initState: AuthState = {
	user: undefined,
};

function authReducer(state = initState, action: any) {
	switch (action.type) {
		case LOGIN_SUCCESS: {
			return { ...initState, user: action.payload };
		}
		case LOGOUT_SUCCESS: {
			return { user: undefined };
		}
		default: {
			return state;
		}
	}
}

export default authReducer;
