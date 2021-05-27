import { useHistory } from 'react-router-dom';
import logo_img from '../../../assets/authNavLogo.png';
import './authNavBar.component.css';

function AuthNavBar() {
	const history = useHistory();

	return (
		<div className="authnavbar">
			<div className="authnavbar-container">
				<div className="authnavbar-head">
					<img
						src={logo_img}
						alt="IIT Ropar Alumni Association"
						onClick={() => history.push('/')}
					/>
				</div>
			</div>
		</div>
	);
}

export default AuthNavBar