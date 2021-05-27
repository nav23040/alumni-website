import { Layout, Row, Col, Divider, Modal } from 'antd';
import { Card, Avatar } from 'antd';
import './JobPortal.css';
import { Input, Select, Button } from 'antd';
import { useState, useEffect } from 'react';
import { getJob, getRecJob } from '../../services/api/job';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import JobDesc from '../../components/JobDescription/jobDesc.component';

const { Content } = Layout;
const { Option } = Select;

export default function JobPortal() {
	const global_state = useSelector((state: any) => state.authReducer.user);
	const history = useHistory();
	const [jobid, setJobid] = useState<any>();
	const [modal, setModal] = useState(false);
	const [jobsearch, setjobsearch] = useState({
		keywords: '',
		job_location: '',
		company: '',
	});

	const [job, setjobs] = useState<any>([]);
	useEffect(() => {
		getRecJob(global_state.token)
			.then((res) => {
				if (res?.data?.error) {
					throw new Error(res.data.message);
				} else {
					setjobs(res.data.jobs);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleJobSelect = (jobid: any) => <JobDesc jobid={jobid}></JobDesc>;

	const handleInputChange = (e: any) => {
		setjobsearch({ ...jobsearch, [e.target.id]: e.target.value });
	};

	return (
		<div className="job-container">
			<Row
				style={{
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'contain',
					backgroundImage:
						'url("http://utouchdesign.com/themes/envato/escort/assets/img/slider_bg.jpg")',
					opacity: 1.3,
					height: '100vh',
					paddingRight: 0,
				}}
			>
				<Col
					xs={16}
					style={{
						paddingTop: '10vh',
						marginLeft: 50,
						marginBottom: '-20vh',
					}}
				>
					<div className="job-statement">
						Search Between More<br></br> Than{' '}
						<span className="number-jobs">100</span> Open Jobs.
					</div>
				</Col>
				<Col xs={16} style={{ marginLeft: 50 }}>
					<div className="job-search-keyword">
						Trending Job Keywords:{' '}
						<span className="keyword-jobs">Web developer</span>{' '}
						<span className="keyword-jobs">Web designer</span>{' '}
						<span className="keyword-jobs">IOS Developer</span>{' '}
						<span className="keyword-jobs">Android Developer</span>{' '}
					</div>
				</Col>
				<Col xs={18} style={{ marginLeft: 50, marginTop: '-15vh' }}>
					<span>
						<Input
							type="text"
							placeholder="Search Keywords"
							onChange={handleInputChange}
							id="keywords"
							style={{ width: 200, margin: '0' }}
						/>
						<Input
							size="large"
							style={{ width: 200, margin: '0 8px' }}
							id="job_location"
							onChange={handleInputChange}
							placeholder="Location"
						></Input>

						<Input
							size="large"
							style={{ width: 200, margin: '0 8px' }}
							id="company"
							onChange={handleInputChange}
							placeholder="Company"
						></Input>

						<Button
							style={{
								width: 200,
								margin: '0px 5px',
								backgroundColor: 'green',
								color: 'white',
								fontSize: '2vh',
								fontWeight: 500,
							}}
							size="large"
							onClick={() => history.push('/all_jobs', jobsearch)}
						>
							SEARCH
						</Button>
					</span>
				</Col>
			</Row>
			<Divider orientation="center">
				<h1
					style={{
						fontWeight: 800,
						fontSize: 35,
						color: '#334e6f',
					}}
				>
					Latest Jobs
				</h1>
			</Divider>
			<Row style={{ marginLeft: 50, marginRight: 50 }} gutter={20}>
				{job &&
					job?.map((job_element: any, idx: any) => (
						<Col key={idx} xs={24} md={12} lg={6}>
							<Card
								key={idx}
								id={job_element?._id}
								style={{ height: '40vh', marginBottom: '25px' }}
								hoverable
								onClick={() => {
									setJobid(job_element._id);
									setModal(true);
								}}
							>
								<Col
									key={idx}
									xs={15}
									style={{ color: 'green' }}
								>
									<span className="full-type">
										{job_element?.job_type}
									</span>
								</Col>
								<Row key={idx} justify="center">
									<Col key={idx} style={{ marginTop: 20 }}>
										<Avatar
											key={idx}
											src="http://utouchdesign.com/themes/envato/escort/assets/img/company_logo_1.png"
											size={{
												xs: 24,
												sm: 32,
												md: 40,
												lg: 64,
												xl: 80,
												xxl: 100,
											}}
										/>
									</Col>
								</Row>
								<Row key={idx} justify="center">
									<Col key={idx} style={{ marginTop: 20 }}>
										<span style={{ fontSize: '1.5em' }}>
											{job_element?.title}
										</span>
									</Col>
								</Row>
								<Row key={idx} justify="center">
									<Col key={idx} style={{ marginTop: 0 }}>
										<span
											key={idx}
											style={{
												fontSize: '1.2em',
												fontWeight: 200,
											}}
										>
											{job_element?.job_location}
										</span>
									</Col>
								</Row>
							</Card>
						</Col>
					))}
			</Row>
			<Divider style={{ margin: '50px 0 50px 0' }} orientation="center">
				<Button
					style={{
						width: 250,
						margin: '0px 5px',
						backgroundColor: 'green',
						color: 'white',
						fontSize: '2vh',
						fontWeight: 600,
						height: 50,
					}}
					size="large"
					onClick={() => history.push('/all_jobs', jobsearch)}
				>
					BROWSE ALL JOBS
				</Button>
			</Divider>
			<Row>
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
			</Row>
		</div>
	);
}
