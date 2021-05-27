import { Card, Col } from 'antd';
import moment from 'moment';
import './membersCard.component.css';
import dummyImg from '../../assets/profile.png';

function MemberCard(props: any) {
	const batch = moment.unix(props?.end_date / 1000).format('YYYY');
	const stream = props.degree + ' - ' + props.stream;
	return (
		<Card className="membercard-container">
			<Col className="membercard-img">
				<img src={props.img ?? dummyImg} alt="profile" />
			</Col>
			<Col className="membercard-desc">
				<div className="memberscard-desc-name">
					{props.first_name + ' ' + props.last_name}
				</div>
				<div className="memberscard-stream">
					{stream + ' - ' + batch}
				</div>
			</Col>
		</Card>
	);
}

export default MemberCard;
