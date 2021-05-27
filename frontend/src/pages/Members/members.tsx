import { Layout, Row, Col, Divider, Menu, Spin } from 'antd';
import { useEffect, useState } from 'react';
import FileDownload from 'js-file-download';
import './members.css';
import querystring from 'querystring';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessIcon from '@material-ui/icons/Business';
import SchoolIcon from '@material-ui/icons/School';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { Tabs, Input, Button, Tooltip, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Avatar } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import RollbackOutlined from '@ant-design/icons';
import img1 from '../../assets/profile.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
	exportMembers,
	getMembers,
	memberSearch,
} from '../../services/api/members';
import { DriveEtaTwoTone } from '@material-ui/icons';
import { apiURL } from '../../services/api/common';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { getMyInfo } from '../../services/api/user';

const { Meta } = Card;

const { TabPane } = Tabs;
const { Option } = Select;

const { Content } = Layout;

export default function Members() {
	const user = useSelector((state: any) => state.authReducer.user);
	const [members, setmembers] = useState<any>(null);
	const [userA, setUserA] = useState<any>(null);
	const location_web: any = useLocation();
	const history = useHistory();

	useEffect(() => {
		getMyInfo(user.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					setUserA(res?.data?.user);
				}
			})
			.catch((err: any) => console.log(err.message));
	}, []);
	useEffect(() => {
		if (location_web?.state === undefined) {
			const fetchMembers = async () => {
				try {
					const memb = await getMembers(
						1 as unknown as string,
						user.token
					);
					if (memb?.data?.error) {
						throw new Error(memb?.data?.message);
					} else {
						setmembers(memb?.data.users);
					}
				} catch (err) {
					console.log(err.message);
				}
			};
			fetchMembers();
		} else {
			if (location_web?.state?.company !== undefined) {
				axios
					.get(
						`${apiURL}/members/search?company=` +
							location_web?.state?.company,
						{
							withCredentials: true,
							headers: {
								authorization: `Bearer ${user.token}`,
							},
						}
					)
					.then((response) => {
						if (response?.data?.error) {
							throw new Error(response?.data?.message);
						} else {
							setmembers(response.data.user);
						}
					})
					.catch((err) => {
						console.log(err.message);
					});
			} else if (location_web?.state?.city !== undefined) {
				axios
					.get(
						`${apiURL}/members/search?city=` +
							location_web?.state?.city,
						{
							withCredentials: true,
							headers: {
								authorization: `Bearer ${user.token}`,
							},
						}
					)
					.then((response) => {
						if (response?.data?.error) {
							throw new Error(response?.data?.message);
						} else {
							setmembers(response.data.user);
						}
					})
					.catch((err) => {
						console.log(err.message);
					});
			} else if (location_web?.state?.institute !== undefined) {
				axios
					.get(
						`${apiURL}/members/search?institute=` +
							location_web?.state?.institute,
						{
							withCredentials: true,
							headers: {
								authorization: `Bearer ${user.token}`,
							},
						}
					)
					.then((response) => {
						if (response?.data?.error) {
							throw new Error(response?.data?.message);
						} else {
							setmembers(response.data.user);
						}
					})
					.catch((err) => {
						console.log(err.message);
					});
			} else if (location_web?.state?.role !== undefined) {
				axios
					.get(
						`${apiURL}/members/search?role=` +
							location_web?.state?.role,
						{
							withCredentials: true,
							headers: {
								authorization: `Bearer ${user.token}`,
							},
						}
					)
					.then((response) => {
						if (response?.data?.error) {
							throw new Error(response?.data?.message);
						} else {
							setmembers(response.data.user);
						}
					})
					.catch((err) => {
						console.log(err.message);
					});
			} else if (location_web?.state?.skill !== undefined) {
				axios
					.get(
						`${apiURL}/members/search?skill=` +
							location_web?.state?.skill,
						{
							withCredentials: true,
							headers: {
								authorization: `Bearer ${user.token}`,
							},
						}
					)
					.then((response) => {
						if (response?.data?.error) {
							throw new Error(response?.data?.message);
						} else {
							setmembers(response.data.user);
						}
					})
					.catch((err) => {
						console.log(err.message);
					});
			} else if (location_web?.state?.industry !== 'undefined') {
				axios
					.get(
						`${apiURL}/members/search?industries=` +
							location_web?.state?.industry,
						{
							withCredentials: true,
							headers: {
								authorization: `Bearer ${user.token}`,
							},
						}
					)
					.then((response) => {
						if (response?.data?.error) {
							throw new Error(response?.data?.message);
						} else {
							setmembers(response.data.user);
						}
					})
					.catch((err) => {
						console.log(err.message);
					});
			}
			history.push('/members', undefined);
		}
	}, []);

	const handleExportMemb = async () => {
		try {
			let ids: any[] = [];
			members?.forEach((mem: any) => ids.push(mem._id));
			console.log(ids);
			const res = await exportMembers({ ids: ids }, user.token);
			FileDownload(res?.data, 'members.csv');
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const [values, setvalues] = useState('location');
	const [name_s, setname_s] = useState('');
	const [email, setemail] = useState('');
	const [degree, setdegree] = useState('');
	const [course, setcourse] = useState('');
	const [stream, setstream] = useState('');
	const [city, setcity] = useState('');
	const { md } = useBreakpoint();
	const [location, setlocation] = useState({
		city: '',
		state: '',
		country: '',
	});

	const [professional, setprofessional] = useState({
		role: '',
		industry: '',
		skills: '',
	});
	const [company, setcompany] = useState('');
	const [year, setyear] = useState('');

	const handleInputChange = (e: any) => {
		setname_s(e.target.value);
	};

	const handleEmailChange = (e: any) => {
		setemail(e.target.value);
	};

	const handleLocationChange = (e: any) => {
		setlocation({ ...location, [e.target.id]: e.target.value });
	};

	const handleClick = ({ e }: { e: any }) => {
		setvalues(e.key);
	};

	const handleCompanyChange = (e: any) => {
		setcompany(e.target.value);
	};

	const handleCourseSelect = (option: any) => {
		setcourse(option);
	};

	const handleProfessionalChange = (e: any) => {
		setprofessional({ ...professional, [e.target.id]: e.target.value });
	};

	const handleStreamSelect = (option: any) => {
		setstream(option);
	};

	const handleYearSelect = (option: any) => {
		setyear(option);
	};

	const handleNameSubmit = (e: any) => {
		axios
			.get(`${apiURL}/members/search?name=${name_s}&email=${email}`, {
				withCredentials: true,
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			})
			.then((response) => {
				setmembers(response.data.user);
			});
	};

	const handleCourseSubmit = (e: any) => {
		axios
			.get(
				`${apiURL}/members/search?course=` +
					course +
					'&stream=' +
					stream +
					'&year=' +
					year,
				{
					withCredentials: true,
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			)
			.then((response) => {
				setmembers(response.data.user);
			})
			.catch((err) => console.log(err.message));
	};

	const handleLocationSubmit = (e: any) => {
		axios
			.get(
				`${apiURL}/members/search?city=` +
					location.city +
					'&state=' +
					location.state +
					'&country=' +
					location.country,
				{
					withCredentials: true,
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			)
			.then((response) => {
				setmembers(response.data.user);
			})
			.catch((err) => console.log(err));
	};

	const handleCompanySubmit = () => {
		axios
			.get(`${apiURL}/members/search?company=` + company, {
				withCredentials: true,
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			})
			.then((response) => {
				setmembers(response.data.user);
			})
			.catch((err) => console.log(err));
	};

	const handleProfessionalSubmit = () => {
		axios
			.get(
				`${apiURL}/members/search?roles=` +
					professional.role +
					`&industries=` +
					professional.industry +
					`&skills=` +
					professional.skills,
				{
					withCredentials: true,
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			)
			.then((response) => {
				setmembers(response.data.user);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="main-contain">
			<div className="member-contain">
				<div style={{ marginLeft: '10vh', marginBottom: '20px' }}>
					<span style={{ fontSize: 40, fontWeight: 400 }}>
						Members{' '}
					</span>
					<span
						style={{
							fontSize: 25,
							fontWeight: 400,
							color: 'gray',
						}}
					>
						Browse members by
					</span>
				</div>
				<Row style={{ marginLeft: '10vh', marginTop: -15 }}>
					<Col span={21}>
						<Menu mode="horizontal">
							<Menu.Item
								key="location"
								style={{
									color: 'grey',
									fontSize: '2vh',
									fontWeight: 'bold',
								}}
								icon={
									<LocationOnIcon
										style={{
											fontSize: '2vh',
											color: 'blue',
										}}
									/>
								}
							>
								<Link
									to="/members/location"
									style={{
										color: 'grey',
										fontSize: '2vh',
										fontWeight: 'bold',
									}}
								>
									Location
								</Link>
							</Menu.Item>
							<Menu.Item
								key="company"
								style={{
									color: 'grey',
									fontSize: '2vh',
									fontWeight: 'bold',
								}}
								icon={
									<BusinessIcon
										style={{
											fontSize: '2vh',
											color: 'blue',
										}}
									/>
								}
							>
								<Link
									to="/members/company"
									style={{
										color: 'grey',
										fontSize: '2vh',
										fontWeight: 'bold',
									}}
								>
									Company
								</Link>
							</Menu.Item>

							<Menu.Item
								key="institute"
								style={{
									color: 'grey',
									fontSize: '2vh',
									fontWeight: 'bold',
								}}
								icon={
									<SchoolIcon
										style={{
											fontSize: '2vh',
											color: 'blue',
										}}
									/>
								}
							>
								<Link
									to="/members/institute"
									style={{
										color: 'grey',
										fontSize: '2vh',
										fontWeight: 'bold',
									}}
								>
									Institute
								</Link>
							</Menu.Item>
							<Menu.Item
								key="roles"
								style={{
									color: 'grey',
									fontSize: '2vh',
									fontWeight: 'bold',
								}}
								icon={
									<BusinessCenterIcon
										style={{
											fontSize: '2vh',
											color: 'blue',
										}}
									/>
								}
							>
								<Link
									to="/members/roles"
									style={{
										color: 'grey',
										fontSize: '2vh',
										fontWeight: 'bold',
									}}
								>
									Roles
								</Link>
							</Menu.Item>
							<Menu.Item
								key="professional"
								style={{
									color: 'grey',
									fontSize: '2vh',
									fontWeight: 'bold',
								}}
								icon={
									<ReceiptIcon
										style={{
											fontSize: '2vh',
											color: 'blue',
										}}
									/>
								}
							>
								<Link
									to="/members/prof_skills"
									style={{
										color: 'grey',
										fontSize: '2vh',
										fontWeight: 'bold',
									}}
								>
									Professional Skills
								</Link>
							</Menu.Item>
							<Menu.Item
								key="industry"
								style={{
									color: 'grey',
									fontSize: '2vh',
									fontWeight: 'bold',
								}}
								icon={
									<ApartmentIcon
										style={{
											fontSize: '2vh',
											color: 'blue',
										}}
									/>
								}
							>
								<Link
									to="/members/industry"
									style={{
										color: 'grey',
										fontSize: '2vh',
										fontWeight: 'bold',
									}}
								>
									Industry
								</Link>
							</Menu.Item>
						</Menu>
					</Col>
				</Row>
				<Row style={{ marginTop: '1vh', marginLeft: '10vh' }}>
					<Col
						span={21}
						style={{
							backgroundColor: 'white',
							paddingBottom: '1vh',
						}}
					>
						<div className="card-container">
							<Tabs type="card">
								<TabPane tab="Name, Email" key="1">
									<Row style={{ marginTop: '2vh' }}>
										<Col span={8}>
											<Input
												placeholder="Name"
												id="name"
												size="large"
												onChange={handleInputChange}
											/>
										</Col>
										<Col span={1}></Col>
										<Col span={8}>
											<Input
												placeholder="Email"
												id="email"
												size="large"
												onChange={handleEmailChange}
											/>
										</Col>
										<Col span={1}></Col>
										<Col span={2}>
											<Tooltip title="search">
												<Button
													type="primary"
													size="large"
													shape="circle"
													icon={<SearchOutlined />}
													style={{
														color: 'white',
														backgroundColor:
															'green',
													}}
													onClick={handleNameSubmit}
												/>
											</Tooltip>
										</Col>
										{userA?.isAdmin && (
											<Button onClick={handleExportMemb}>
												Export Data
											</Button>
										)}
									</Row>
								</TabPane>
								<TabPane tab="Course & Year" key="2">
									<Row style={{ marginTop: '2vh' }}>
										<Col span={md ? 7 : 24}>
											<Select
												placeholder="Select Course"
												onSelect={handleCourseSelect}
												size="large"
												style={{ width: '80%' }}
											>
												<Option value="Bachelor of Technology - B.Tech.">
													Bachelor of Technology -
													B.Tech.
												</Option>
												<Option value="Master of Science - M.Sc.">
													Master of Science - M.Sc.
												</Option>
												<Option value="Master of Technology - M.Tech.">
													Master of Technology -
													M.Tech.
												</Option>
												<Option value="Doctor of Philosophy - Ph.D.">
													Doctor of Philosophy - Ph.D.
												</Option>
												<Option value="Dual Degree (Bachelor of Technology + Master of Technology) - B.Tech. + M.Tech.">
													Dual Degree (Bachelor of
													Technology + Master of
													Technology) - B.Tech. +
													M.Tech.
												</Option>
											</Select>
										</Col>
										<Col span={md ? 7 : 24}>
											<Select
												placeholder="Select Stream"
												onSelect={handleStreamSelect}
												size="large"
												style={{ width: '80%' }}
											>
												<Option value="">
													-- Select Stream --
												</Option>
												<Option value="Biomedical Engineering">
													Biomedical Engineering
												</Option>
												<Option value="Chemical Engineering">
													Chemical Engineering
												</Option>
												<Option value="Chemistry">
													Chemistry
												</Option>
												<Option value="Civil Engineering">
													Civil Engineering
												</Option>
												<Option value="Computer Science and Engineering">
													Computer Science &
													Engineering
												</Option>
												<Option value="Electrical Engineering">
													Electrical Engineering
												</Option>
												<Option value="Humanities and Social Sciences">
													Humanities and Social
													Sciences
												</Option>
												<Option value="Materials and Energy Engineering">
													Materials & Energy
													Engineering
												</Option>
												<Option value="Mathematics">
													Mathematics
												</Option>
												<Option value="Mechanical Engineering">
													Mechanical Engineering
												</Option>
												<Option value="Physics">
													Physics
												</Option>
											</Select>
										</Col>
										<Col span={md ? 7 : 24}>
											<Select
												placeholder="Select Graduation Year"
												onSelect={handleYearSelect}
												size="large"
												style={{ width: '80%' }}
											>
												<Option value="">
													Graduation Year
												</Option>
												<Option value="2008">
													2008
												</Option>
												<Option value="2009">
													2009
												</Option>
												<Option value="2010">
													2010
												</Option>
												<Option value="2011">
													2011
												</Option>
												<Option value="2012">
													2012
												</Option>
												<Option value="2013">
													2013
												</Option>
												<Option value="2014">
													2014
												</Option>
												<Option value="2015">
													2015
												</Option>
												<Option value="2016">
													2016
												</Option>
												<Option value="2017">
													2017
												</Option>
												<Option value="2018">
													2018
												</Option>
												<Option value="2019">
													2019
												</Option>
												<Option value="2020">
													2020
												</Option>
												<Option value="2021">
													2021
												</Option>
												<Option value="2022">
													2022
												</Option>
												<Option value="2023">
													2023
												</Option>
												<Option value="2024">
													2024
												</Option>
												<Option value="2025">
													2025
												</Option>
												<Option value="2026">
													2026
												</Option>
											</Select>
										</Col>
										<Col span={1} style={{}}>
											<Tooltip title="search">
												<Button
													type="primary"
													shape="circle"
													size="large"
													icon={<SearchOutlined />}
													style={{
														color: 'white',
														backgroundColor:
															'green',
													}}
													onClick={handleCourseSubmit}
												/>
											</Tooltip>
										</Col>
										{userA?.isAdmin && (
											<Button onClick={handleExportMemb}>
												Export Data
											</Button>
										)}
									</Row>
								</TabPane>
								<TabPane tab="Location" key="3">
									<Row style={{ marginTop: '2vh' }}>
										<Col span={6}>
											<Input
												size="large"
												placeholder="City"
												id="city"
												onChange={handleLocationChange}
											/>
										</Col>

										<Col span={1}> </Col>

										<Col span={2}>
											<Tooltip title="search">
												<Button
													type="primary"
													size="large"
													shape="circle"
													icon={<SearchOutlined />}
													style={{
														color: 'white',
														backgroundColor:
															'green',
													}}
													onClick={
														handleLocationSubmit
													}
												/>
											</Tooltip>
										</Col>
										{userA?.isAdmin && (
											<Button onClick={handleExportMemb}>
												Export Data
											</Button>
										)}
									</Row>
								</TabPane>
								<TabPane tab="Company" key="4">
									<Row style={{ marginTop: '2vh' }}>
										<Col span={7}>
											<Input
												size="large"
												placeholder="Company Name"
												id="company"
												onChange={handleCompanyChange}
											/>
										</Col>
										<Col span={1}></Col>
										<Col span={2}>
											<Tooltip title="search">
												<Button
													type="primary"
													size="large"
													shape="circle"
													onClick={
														handleCompanySubmit
													}
													icon={<SearchOutlined />}
													style={{
														color: 'white',
														backgroundColor:
															'green',
													}}
												/>
											</Tooltip>
										</Col>
										{userA?.isAdmin && (
											<Button onClick={handleExportMemb}>
												Export Data
											</Button>
										)}
									</Row>
								</TabPane>
								<TabPane tab="Professional Skills" key="5">
									<Row style={{ marginTop: '2vh' }}>
										<Col
											span={4}
											style={{ marginRight: '1vh' }}
										>
											<Input
												size="large"
												placeholder="Roles"
												id="role"
												onChange={
													handleProfessionalChange
												}
											/>
										</Col>

										<Col
											span={4}
											style={{ marginRight: '1vh' }}
										>
											<Input
												size="large"
												placeholder="Industries"
												id="industry"
												onChange={
													handleProfessionalChange
												}
											/>
										</Col>
										<Col
											span={4}
											style={{ marginRight: '1vh' }}
										>
											<Input
												size="large"
												placeholder="Skill"
												id="skills"
												onChange={
													handleProfessionalChange
												}
											/>
										</Col>

										<Col span={2}>
											<Tooltip title="search">
												<Button
													type="primary"
													size="large"
													shape="circle"
													icon={<SearchOutlined />}
													style={{
														color: 'white',
														backgroundColor:
															'green',
													}}
													onClick={
														handleProfessionalSubmit
													}
												/>
											</Tooltip>
										</Col>
										{userA?.isAdmin && (
											<Button onClick={handleExportMemb}>
												Export Data
											</Button>
										)}
									</Row>
								</TabPane>
							</Tabs>
						</div>
					</Col>
				</Row>
				<Row
					style={{
						marginLeft: '90px',
						marginTop: '2vh',
						marginRight: '1vw',
					}}
				>
					{members ? (
						members.map((member: any, idx: any) => (
							<Col
								key={idx}
								span={md ? 5 : 20}
								style={{
									marginBottom: '2vh',
									marginRight: '3vh',
								}}
							>
								<Card
									key={idx}
									className="members-card"
									style={{
										// height: '35vh',
										minHeight: '350px',
										alignItems: 'center',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Avatar
										style={{
											marginTop: '2vh',
											left: '25%',
										}}
										size={100}
										icon={
											<img
												src={
													member?.profileImg?.data ??
													img1
												}
											/>
										}
									/>
									<Divider />
									<Row key={idx}>
										<h1
											key={idx}
											style={{
												fontSize: '1.2em',
												marginBottom: '0',
												marginLeft: '6vh',
												left: '50%',
											}}
										>
											{member.basic_info.first_name +
												' ' +
												member.basic_info.last_name}
										</h1>
										<h3
											key={idx}
											style={{
												fontSize: 16,
												fontWeight: 300,
												marginLeft: '6vh',
											}}
										>
											{member.educational_info[0]
												?.degree_name +
												' ' +
												formatDate(
													member.educational_info[0]
														?.end_date
												)}
										</h3>
									</Row>
								</Card>
							</Col>
						))
					) : (
						<Spin size="large" />
					)}
				</Row>
			</div>
		</div>
	);
}

const formatDate = (date: number) => {
	const year = new Date(date);
	return year.getFullYear();
};
