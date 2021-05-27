import { useState, useEffect } from 'react';
import { Card, Row, Col, Divider, Grid, Tag, Modal } from 'antd';
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
import '../EventsDesc/eventsDesc.component.css';
import moment from 'moment';
import axios from 'axios';
import { reqOptions, apiURL } from '../../services/api/common';

const { useBreakpoint } = Grid;

const readableDateTime = (ts: any) => moment(ts).format('DD-MM-YY at HH:MM A');

function JobDesc(_props: any) {
	const user = useSelector((state: any) => state.authReducer.user);
	const location = useLocation();
	const history = useHistory();
	const [job, setJob] = useState<any>(null);
	const { md } = useBreakpoint();

	useEffect(() => {
		axios
			.post(
				`${apiURL}/jobs/get_job_details`,
				{ jobid: _props.jobid },
				reqOptions(user.token)
			)
			.then((res) => setJob(res.data))
			.catch((err) => console.log(err.message));
	}, [_props.jobid]);

	return (
		<div className="eventDescription-container">
			<div>
				<Divider>
					<h1 style={{ marginBottom: 0 }}>Job Details</h1>
				</Divider>
			</div>
			<Card className="auth-form-container">
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Job Title:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && job.title}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Date Created:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && readableDateTime(job.date_created)}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Job Type:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && job.job_type}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Company:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && job.company_name}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Experience Level:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && (
							<Tag
								color="lightgreen"
								style={{
									fontSize: '1.2em',
									padding: '5px 2px 5px 2px',
								}}
							>
								{job?.experience_level + ' Years'}
							</Tag>
						)}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Job Location:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && job.job_location}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Contact Email:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && job.contact_email}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Skills Required:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && job.skills}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Description:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && job.job_desc}
					</Col>
				</Row>
				<Row className="eventdesc-row">
					<Col span={md ? 12 : 24} className="eventdesc-col-key">
						Deadline:
					</Col>
					<Col span={md ? 12 : 24} className="eventdesc-col-value">
						{job && readableDateTime(job?.application_deadline)}
					</Col>
				</Row>
			</Card>
		</div>
	);
}

export default JobDesc;
