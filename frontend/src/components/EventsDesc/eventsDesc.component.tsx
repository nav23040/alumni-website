import { useState, useEffect } from 'react';
import { Card, Row, Col, Divider, Grid, Tag } from 'antd';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
	ExclamationCircleOutlined,
	CheckCircleOutlined,
} from '@ant-design/icons';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { getAnEvent, cancelEvent } from '../../services/api/event';
import './eventsDesc.component.css';
import moment from 'moment';

const { useBreakpoint } = Grid;

const readableDateTime = (ts: any) => moment.unix(ts / 1000).format('LLLL');

function EventDesc(_props: any) {
	const user = useSelector((state: any) => state.authReducer.user);
	const location = useLocation();
	const history = useHistory();
	const [event, setEvent] = useState<any>(null);

	const eventId: string = location.state as string;
	const { md } = useBreakpoint();

	useEffect(() => {
		const fetchEvent = async (eventId: string) => {
			try {
				const nevent = await getAnEvent(eventId, user.token);
				if (nevent?.data?.error) {
					throw new Error(nevent?.data?.message);
				} else {
					setEvent(nevent?.data?.event);
				}
			} catch (err) {
				console.log(err.message);
			}
		};
		fetchEvent(eventId);
	}, []);

	const handleRemove = (id: any) => {
		cancelEvent(user.token, id)
			.then((_res: any) => {
				history.push('/events');
			})
			.catch((err: any) => console.log(err.message));
	};

	return (
		<div className="eventDescription-container">
			<div className="newsroom-head">
				<h1>Event Details</h1>
				<hr />
			</div>
			<Card className="auth-form-container">
				<div className="newsroom-content-meta">
					<div className="author">
						<PersonIcon
							style={{ fontSize: 25, marginRight: '10px' }}
						/>
						Created by: {event && event.created_by}
					</div>
					{event &&
						(event.created_by_id === user._id ? (
							<>
								<div className="author">
									<span>Status:</span>
									{event.pending ? (
										<>
											<ExclamationCircleOutlined
												style={{
													fontSize: 25,
													marginLeft: '10px',
													marginRight: '5px',
													color: 'yellow',
												}}
											/>{' '}
											<span>Pending</span>
										</>
									) : (
										<>
											<CheckCircleOutlined
												style={{
													fontSize: 25,
													marginLeft: '10px',
													marginRight: '5px',
													color: 'green',
												}}
											/>
											<span>Confirmed</span>
										</>
									)}
								</div>
								<div className="change-funcs">
									<div
										className="edit"
										onClick={() => {
											history.push({
												pathname: `/events/${event._id}/edit`,
												state: event,
											});
										}}
									>
										<CreateIcon
											style={{
												fontSize: 25,
												marginRight: '10px',
											}}
										/>
										Edit
									</div>
									<div
										className="edit"
										style={{
											backgroundColor: 'red',
											color: 'white',
										}}
										onClick={() => {
											handleRemove(event._id);
										}}
									>
										<DeleteForeverIcon
											style={{
												fontSize: 25,
												marginRight: '10px',
											}}
										/>
										Remove
									</div>
								</div>
							</>
						) : null)}
				</div>
				<Divider />
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Event Name:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{event && event.event_name}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Event Date/Time:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{event && readableDateTime(event.event_start)}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Event End Date/Time:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{event && readableDateTime(event.event_end)}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Event Category:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{event && (
							<Tag
								color="orange"
								style={{
									fontSize: '1.2em',
									padding: '5px 2px 5px 2px',
								}}
							>
								{event.event_category}
							</Tag>
						)}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Event Venue:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{event && event.event_venue}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Complete Address:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{event && event.address}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Event Description:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						<ReactMarkdown remarkPlugins={[gfm]}>
							{event && event.event_description}
						</ReactMarkdown>
					</Col>
				</Row>
			</Card>
		</div>
	);
}

export default EventDesc;

/* 
address: "test"
created_by_id: "6050f7d9711d083a183f033c"
date_created: 1621241765615
pending: false
__v: 0
*/
