import { Row, Col, Card, Button, Avatar, Image, Modal } from 'antd';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import './jobCard.component.css';
import Grid from '@material-ui/core/Grid';
import { CenterFocusStrong } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useState } from 'react';
import JobDesc from '../JobDescription/jobDesc.component';
import { useEffect } from 'react';

function JobCard(props: any) {
	const history = useHistory();
	const [jobid, setJobid] = useState<any>(null);
	const [modal, setModal] = useState(false);

	return (
		<Card
			className="events-items-card"
			hoverable
			onClick={() => {
				setJobid(props?.job._id);
				setModal(true);
			}}
		>
			<Row className="events-items-card-row">
				<Col span={24}>
					<div className="event-status">
						<span
							style={{
								color: 'grey',
								fontWeight: 500,
								fontSize: '1.25em',
							}}
						></span>
					</div>
					<div className="event-title">
						<span> {props?.job.title} </span>
					</div>
				</Col>
				<Col span={2}></Col>
				<Row className="events-items-card-row">
					<Col span={24}>
						<div className="story-content">
							<br></br>COMPANY: {props?.job.company_name}
							<br></br>LOCATION: {props?.job.job_location}
							<br></br>JOB TYPE: {props?.job.job_type}
						</div>
					</Col>
				</Row>
				<Col span={20}>
					<Modal
						title="Job Details"
						style={{ top: 20, width: '350vw' }}
						width={1000}
						visible={modal}
						onOk={() => setModal(false)}
						onCancel={() => setModal(false)}
					>
						<JobDesc jobid={jobid} />
					</Modal>
				</Col>
				<br></br> <br></br>
			</Row>
		</Card>
	);
}

export default JobCard;
