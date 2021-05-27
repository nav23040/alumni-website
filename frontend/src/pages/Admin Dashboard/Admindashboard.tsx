import { Layout, Row, Col, Card, Divider, Menu } from 'antd';
import { useEffect, useState } from 'react';
import './Admindashboard.css';
import { Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';

export default function Admindashboard() {
	const history = useHistory();
	const handleClick = (str: any) => {
		console.log(str);
	};

	return (
		<div className="admin-contain">
			<div className="admin-dash-contain">
				<Row className="admin-dash-row">
					<h1>Admin Panel </h1>
					<span>Manage your site content</span>
				</Row>
				<Card className="admin-dash-card">
					<Row className="admin-dash-card-row">
						<h1>Quick Actions: </h1>
						<div className="newsroom-content-meta">
							<div className="admin-act">
								<div
									className="edit"
									onClick={() => {
										history.push({
											pathname: '/newsroom/create/',
										});
									}}
								>
									<CreateIcon
										style={{
											fontSize: 25,
											marginRight: '10px',
										}}
									/>
									Post News
								</div>
								<div
									className="edit"
									onClick={() => {
										history.push({
											pathname: '/events/create',
										});
									}}
									style={{ background: 'lightgreen' }}
								>
									<CreateIcon
										style={{
											fontSize: 25,
											marginRight: '10px',
										}}
									/>
									Create An Event
								</div>
								<div
									className="edit"
									onClick={() => {
										history.push({
											pathname: '/post_job',
										});
									}}
									style={{ background: 'orange' }}
								>
									<CreateIcon
										style={{
											fontSize: 25,
											marginRight: '10px',
										}}
									/>
									Post A Job
								</div>
							</div>
						</div>
					</Row>
					<Divider className="admin-card-divider">
						Pending Actions
					</Divider>
					<Row className="admin-dash-card-row1">
						<Link to="/admin_dashboard/pending_events">
							<Button
								href="/admin_dashboard/pending_events"
								size="large"
							>
								Pending Events Approval
							</Button>
						</Link>
						<Link to="/admin_dashboard/pending_news">
							<Button size="large">Pending News Approval</Button>
						</Link>
					</Row>
				</Card>
			</div>
		</div>
	);
}
