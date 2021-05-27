import React from 'react';
import './directorDetails.css';
// import diri from '/Users/naveen/Documents/Semester-6/DEP/alumni-website/frontend/src/images/DD.jpg';

export default class DirectorDetails extends React.Component {
	render() {
		return (
			// <div className="container">
				<div className="container">
					<div className="contact-body">
						<div className="contact-head">
							<h1>Director's Message</h1>
							<hr />
						</div>
					</div>
				<div className="dir-name">Dr. Sarit Kumar Das</div>
				<div className="dir-details">
					<div className="dir-content">
						Dear Friends,<br></br> <br></br>I am delighted to know
						that IIT Ropar Alumni Association is launching its
						website. For any great institution in the world, the
						Alumni acts as the backbone. Bigger the institution
						bigger is the outreach of its alumni and bigger is the
						impact on the society and the world. Alumni can help the
						institution not only financially but also in technical
						support, brand building as well as social and industrial
						outreach. In concrete terms, under the current scenario,
						this means endowment of research facilities, helping
						with better corporate relations and spreading the
						message of the tremendous pace of development that IIT
						Ropar is going through. As we grow in size, hope we
						foster a unified culture among us and become active in
						helping the institute in achieving great heights. <br /> <br />I
						would urge IIT Ropar Alumni Association to emphasize
						that a larger fraction of alumni remains in contact and
						become active in helping the institute in achieving
						greater heights. I am sure that with your help and our
						efforts we will be able to make an impact nationally and
						globally. We would like to introduce a section on
						“Alumni Matters” in our regular newsletter which is now
						being circulated to almost 5000+ academicians across the
						country.Looking forward for an exciting era of
						co-operation between the Institute and the Alumni; we
						remain committed to the Nation to build up a great
						Institute of National pride.<br></br> <br></br>Jai Hind.
						<br></br> <br></br>Prof. S. K. Das<br></br> Director,
						IIT Ropar
					</div>
					<div className="dir-image">
						{/* <img src={diri} /> */}
					</div>
				</div>
			</div>
		);
	}
}
