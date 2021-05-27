import { Row, Col, Grid, Button, Card, Spin, Modal } from 'antd';

import JobCard from '../../components/JobCard/jobCard.component';
import { Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import './jobs.css';
import { useSelector } from 'react-redux';
import { getJob, searchJob } from '../../services/api/job';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import JobDesc from '../../components/JobDescription/jobDesc.component';

const { Option } = Select;

const { useBreakpoint } = Grid;

function JobSection() {
	const global_state = useSelector((state: any) => state.authReducer.user);
	const location: any = useLocation();
	const history = useHistory();
	const [jobs, setjobs] = useState<any>(null);

	const [jobsearch, setjobsearch] = useState({
		keywords: '',
		job_location: '',
		company: '',
	});

	useEffect(() => {
		if (
			location.state &&
			(location?.state?.keywords !== '' ||
				location?.state?.company !== '' ||
				location?.state?.job_location !== '')
		) {
			console.log('heloo', location.state);
			searchJob(
				global_state?.token,
				location?.state?.keywords,
				location?.state?.job_location,
				location?.state?.company
			)
				.then((res) => {
					setjobs(res.data.job);
					history.push({ pathname: '/all_jobs', state: null });
					location.state = null;
				})
				.catch((err) => {
					console.log(err.message);
				});
		} else {
			getJob(global_state.token).then((response) => {
				setjobs(response.data.jobs);
			});
		}
	}, []);

	const handleInputChange = (e: any) => {
		setjobsearch({ ...jobsearch, [e.target.id]: e.target.value });
	};

	const handleSearch = () => {
		searchJob(
			global_state.token,
			jobsearch.keywords,
			jobsearch.job_location,
			jobsearch.company
		)
			.then((res) => {
				setjobs(res.data.job);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const { md } = useBreakpoint();
	return (
		<section className="events-section">
			<div className="events-section-container">
				<Row className="events-section-head-row">
					<div className="events-section-head">
						<h1>Job Board</h1>
						<hr />
					</div>
				</Row>
				<Row>
					<Col xs={24} style={{ marginLeft: 10, marginBottom: 50 }}>
						<span>
							<Input
								type="text"
								placeholder="Search Keywords"
								id="keywords"
								onChange={handleInputChange}
								style={{ width: 200, margin: '0' }}
							/>
							<Input
								size="large"
								style={{ width: 200, margin: '0 8px' }}
								onChange={handleInputChange}
								id="job_location"
								placeholder="Location"
							></Input>

							<Input
								size="large"
								style={{ width: 200, margin: '0 8px' }}
								onChange={handleInputChange}
								id="company"
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
								onClick={handleSearch}
							>
								SEARCH
							</Button>
						</span>
					</Col>
				</Row>
				<Row className="events-section-items-row">
					{jobs ? (
						jobs?.map((job_element: any, idx: any) => (
							<Col
								key={idx}
								span={md ? 8 : 24}
								className="events-section-items-col"
							>
								<JobCard key={idx} job={job_element} />
							</Col>
						))
					) : (
						<Spin size="large" />
					)}
				</Row>
				<Row></Row>
			</div>
		</section>
	);
}

export default JobSection;
