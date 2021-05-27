import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import TopNavbar from '../Navbar/TopNavbar/topNavbar.component';
import PrivateNavBar from '../Navbar/PrivateNavbar/privateNav.component';
import Footer from '../Footer/mainFooter/mainFooter.component';

function PrivateRoute({ children, auth = false, ...rem }: any) {
	const loggedIn = useSelector((state: RootState) => state.authReducer.user);
	return auth ? (
		<Route
			{...rem}
			render={() => (!loggedIn ? children : <Redirect to="/" />)}
		/>
	) : (
		<Route
			{...rem}
			render={() =>
				loggedIn ? (
					<div className="page-container">
						<TopNavbar />
						{/* <PrivateNavBar username=""/> */}
						{loggedIn ? (
							<PrivateNavBar
								username={
									loggedIn?.first_name +
									' ' +
									loggedIn?.last_name
								}
							/>
						) : null}
						<div className="content-wrap">{children}</div>

						<Footer />
					</div>
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
}

export function CustomRoute({ children, ...rem }: any) {
	const loggedIn = useSelector((state: RootState) => state.authReducer.user);
	return (
		<Route
			{...rem}
			render={() => (
				<div className="page-container">
					<TopNavbar />
					{/* <PrivateNavBar username=""/> */}
					{loggedIn ? (
						<PrivateNavBar
							username={
								loggedIn?.first_name + ' ' + loggedIn?.last_name
							}
						/>
					) : null}
					<div className="content-wrap">{children}</div>
					<Footer />
				</div>
			)}
		/>
	);
}

export default PrivateRoute;
