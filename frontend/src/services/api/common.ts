import * as dotenv from 'dotenv';

dotenv.config();

export const apiURL = `${process.env.REACT_APP_SERVER_URL}`;

export const reqOptions = (token?: string | null) =>
	token
		? {
				withCredentials: true,
				headers: {
					authorization: `Bearer ${token}`,
				},
		  }
		: { withCredentials: true };
