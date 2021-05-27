import { Row, Col, Grid, Spin } from 'antd';
import EventsCard from '../../components/EventsCard/eventsCard.component';
import { Menu } from 'antd';
import './events.css';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllConfEvents } from '../../services/api/event';

const { useBreakpoint } = Grid;

function EventsSection() {
	const { md } = useBreakpoint();
	const user = useSelector((state: any) => state.authReducer.user);
	const [menu, setMenu] = useState('all_events');
	const [events, setEvents] = useState<any>(null);
	useEffect(() => {
		setEvents(null);
		getAllConfEvents(user.token, menu)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res.data.message);
				} else {
					setEvents(res.data.events);
				}
			})
			.catch((err: any) => console.log(err.message));
	}, [menu]);

	const changeMenu = (key: string) => () => {
		setMenu(key);
	};
	return (
		<section className="events-section">
			<div className="events-section-container">
				<Row className="events-section-head-row">
					<div className="events-section-head">
						<h1>Events</h1>
						<hr />
					</div>
				</Row>
				<Row justify="end">
					<a href="/events/create">
						<div className="add-news">Create an Event</div>
					</a>
				</Row>
				<div className="prof-menu-container">
					<Menu
						theme="light"
						mode="horizontal"
						defaultSelectedKeys={['events']}
					>
						<Menu.Item key="1" onClick={changeMenu('all_events')}>
							<h1>All Events</h1>
						</Menu.Item>
						<Menu.Item key="2" onClick={changeMenu('webinars')}>
							<h1>Webinars</h1>
						</Menu.Item>
						<Menu.Item key="3" onClick={changeMenu('reunions')}>
							<h1>Reunions</h1>
						</Menu.Item>
					</Menu>
				</div>
				<Row className="events-section-items-row">
					{events ? (
						events.map((item: any, idx: any) => (
							<Col
								key={idx}
								span={md ? 12 : 24}
								className="events-section-items-col"
							>
								<EventsCard
									key={idx}
									event_date={item.event_start}
									event_id={item._id}
									event_name={item.event_name}
									event_venue={item.event_venue}
								/>
							</Col>
						))
					) : (
						<Spin size="large" />
					)}
				</Row>
			</div>
		</section>
	);
}

export default EventsSection;
