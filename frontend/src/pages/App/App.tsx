import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { checkAuthAction } from '../../services/actions/auth';
import Spinner from '../../components/Loading/loading.component';
import { Routes } from '../../routes';

import './App.css';
import { RootState } from '../../services/reducers';

function App() {
	const dispatch = useDispatch();
	const { loading } = useSelector((state: RootState) => state.statusReducer);

	useEffect(() => {
		dispatch(checkAuthAction());
	}, [dispatch]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}

export default App;
