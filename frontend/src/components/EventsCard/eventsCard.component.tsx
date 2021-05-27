import { Row, Col, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import './eventsCard.component.css';

function EventsCard(props: any) {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];
	const history = useHistory();
	const event_date = new Date(props.event_date);
	const month = months[event_date.getMonth()];
	const date = event_date.getDate();
	const event_status = props.event_date < Date.now() ? 'PAST' : 'UPCOMING';

	const handleClick = () => {
		history.push({ pathname: `/events/e/${props.event_id}`, state: props.event_id });
	};

	return (
		<Card className="events-items-card" hoverable onClick={handleClick}>
			<Row className="events-items-card-row">
				<Col span={8}>
					<div className="events-date">
						<span className="month">{month}</span>
						<span className="date">{date}</span>
					</div>
				</Col>
				<Col span={16}>
					<div className="event-status">
						<span
							style={{
								color: 'grey',
								fontWeight: 500,
								fontSize: '1.25em',
							}}
						>
							{event_status}
						</span>
					</div>
					<div className="event-title">
						<span> {props.event_name} </span>
					</div>
					<div
						className="event-location"
						style={{
							display: 'flex',
							alignItems: 'center',
							paddingTop: '10px',
						}}
					>
						<LocationOnOutlinedIcon style={{ fontSize: 18 }} />
						<span
							style={{
								color: 'grey',
								fontSize: '1.3em',
								fontWeight: 400,
								marginLeft: '5px',
							}}
						>
							{props.event_venue}
						</span>
					</div>
				</Col>
			</Row>
		</Card>
	);
}

export default EventsCard;
