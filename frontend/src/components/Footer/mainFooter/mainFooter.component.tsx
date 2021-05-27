import * as React from 'react';
import { Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import './mainFooter.component.css';
import logo_img from '../../../assets/alumni_iitrpr_logo.png';

function Footer() {
	return (
		<div className="footer-wrap">
			<div className="main-footer">
				<div className="footer-container">
					<div className="row">
						<div className="col">
							<h1 className="list-unstyled">
								<div className="list-items">
									<EmailIcon style={{ fontSize: 25, color:"white"}} />
									<a href="mailto:alumni@iitrpr.ac.in">
										<li>alumni@iitrpr.ac.in</li>
									</a>
								</div>
								<div className="list-items">
									<LocationOnIcon style={{ fontSize: 25, color:"white" }} />
									<li>
										Alumni Affairs, Room No. 109, IIT Ropar,
										<br />
										Rupnagar, Punjab, India - 140001
									</li>
								</div>
							</h1>
						</div>
						<div className="footer-logo">
							<Link to="/">
								<img
									src={logo_img}
									alt="IIT Ropar Alumni Association"
								/>
							</Link>
						</div>
					</div>
					<div className="row-bottom">
						<div className="row-bottom-links">
							<a href="#">
								<h1>About</h1>
							</a>
							<a href="/about/contact">
								<h1>Contact us</h1>
							</a>
						</div>
						<div className="row-bottom-social">
							<div className="row-bottom-social-items">
								<span>
									<a
										href="https://www.facebook.com/groups/iitrpraa/"
										target="_blank"
									>
										<FacebookIcon
											style={{ fontSize: 35 }}
											className="social-icon"
										/>
									</a>
								</span>
								<span>
									<a
										href="http://twitter.com/iitrpr"
										target="_blank"
									>
										<TwitterIcon
											style={{ fontSize: 35 }}
											className="social-icon"
										/>
									</a>
								</span>
								<span>
									<a
										href="https://www.linkedin.com/groups/4838892/"
										target="_blank"
									>
										<LinkedInIcon
											style={{ fontSize: 35 }}
											className="social-icon"
										/>
									</a>
								</span>
								<span>
									<a href="https://www.instagram.com/iitropar/">
										<InstagramIcon
											style={{ fontSize: 35 }}
											className="social-icon"
										/>
									</a>
								</span>
							</div>
						</div>
						<div className="row-bottom-copyright">
							© 2021 Alumni Association of IIT Ropar
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
