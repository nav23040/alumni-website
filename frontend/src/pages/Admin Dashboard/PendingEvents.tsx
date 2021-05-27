import { Row, Col, message } from 'antd';
import { useEffect, useState } from 'react';
import './Admindashboard.css';
import { Button } from 'antd';
import { Table, Tag, Space } from 'antd';
import {
	cancelEvent,
	confirmEvent,
	getPendingEvents,
} from '../../services/api/event';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function PendingEvents() {
	const global_state = useSelector((state: any) => state.authReducer.user);
	const [rowsregular, setrowsregular] = useState<any>(null);
	const [refresh, setrefresh] = useState(false);
	const history = useHistory();
	const handleConfirm = (eventid: any) => {
		console.log(eventid);
		confirmEvent(global_state.token, eventid).then((response) => {
			if (response.data === 'success') {
				message.success('Event confirmed');
				setrefresh(!refresh);
			} else message.error('Error in confirming event');
		});
	};

	const handleCancel = (eventid: any) => {
		cancelEvent(global_state.token, eventid).then((response) => {
			if (response.data === 'success') {
				message.success('Event cancelled');
				setrefresh(!refresh);
			} else message.error('Error in cancelling event');
		});
	};

	const columns = [
		{
			title: 'Event Name',
			key: 'event_name',
			dataIndex: 'event_name',
		},
		{
			title: 'Event Date',
			key: 'event_date',
			dataIndex: 'event_date',
		},
		{
			title: 'Event Venue',
			key: 'event_venue',
			dataIndex: 'event_venue',
		},
		{
			title: 'Created By',
			key: 'created_by',
			dataIndex: 'created_by',
		},
		{
			title: 'Event Time',
			key: 'event_time',
			dataIndex: 'event_time',
		},
		{
			title: 'Action',
			key: 'Action',
			dataIndex: 'Action',
		},
		{
			title: 'Cancel',
			key: 'Cancel',
			dataIndex: 'Cancel',
		},
		{
			title: 'View Event Description',
			key: 'View',
			dataIndex: 'View',
		},
	];
	var rows_regular: any = [];
	useEffect(() => {
		getPendingEvents(global_state.token).then((response) => {
			console.log(response.data);
			response?.data?.events?.map((details: any) => {
				const event_date = new Date(details.event_start);
				const eventdate =
					event_date.getDate() +
					'-' +
					(event_date.getMonth() + 1) +
					'-' +
					event_date.getFullYear();

				var hours = event_date.getHours();
				var minutes = event_date.getMinutes() as number;
				var ampm = hours >= 12 ? 'pm' : 'am';
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
				var min2 = (minutes < 10 ? '0' + minutes : minutes) as string;
				var eventtime = hours + ':' + min2 + ' ' + ampm;

				return rows_regular.push({
					event_name: details.event_name,
					event_date: eventdate,
					event_time: eventtime,
					event_venue: details.event_venue,
					created_by: details.created_by,
					Action: (
						<Button
							color="primary"
							onClick={() => {
								handleConfirm(details._id);
							}}
							style={{
								backgroundColor: 'blue',
								color: 'white',
								fontWeight: 600,
							}}
						>
							Confirm
						</Button>
					),
					Cancel: (
						<Button
							color="secondary"
							onClick={() => {
								handleCancel(details._id);
							}}
							style={{
								backgroundColor: 'red',
								color: 'white',
								fontWeight: 600,
							}}
						>
							Cancel
						</Button>
					),
					View: (
						<Button
							color="lightsecondary"
							onClick={() =>
								history.push({
									pathname: `/events/e/${details.event_id}`,
									state: details._id,
								})
							}
						>
							{' '}
							View{' '}
						</Button>
					),
				});
			});

			setrowsregular(rows_regular);
		});
	}, [refresh]);

	return (
		<div className="admin-contain">
			<div className="addash-contain">
				<Row>
					<Col span={6}>
						<h1 style={{ fontSize: 30, fontWeight: 400 }}>
							Pending Events
						</h1>
					</Col>
				</Row>
				<Row>
					<Col span={23}>
						<Table
							columns={columns}
							dataSource={rowsregular}
							pagination={false}
						/>
					</Col>
				</Row>
			</div>
		</div>
	);
}
