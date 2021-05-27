import { Badge, Row, Col, Grid, Affix } from 'antd';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import WorkTwoToneIcon from '@material-ui/icons/WorkTwoTone';
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import AnnouncementTwoToneIcon from '@material-ui/icons/AnnouncementTwoTone';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import './privateNav.component.css';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
dotenv.config();
export let url = process.env.REACT_APP_SERVER_URL;

const { useBreakpoint } = Grid;

const PrivateNav: React.FC<{ username: string }> = ({ username }) => {
	const user_name =
		username.length > 8 ? username.slice(0, 8) + '...' : username;
	const { md } = useBreakpoint();
	const [user, setUser] = useState<any>();
	const global_state = useSelector((state: any) => state.authReducer.user);
	useEffect(() => {
		axios
			.get(`${url}/user/me`, {
				withCredentials: true,
				headers: {
					authorization: 'Bearer ' + global_state.token,
				},
			})
			.then((res) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					setUser(res?.data?.user);
				}
			})
			.catch((err: any) => console.log(err.message));
	}, []);
	const home = (
		<Link to="/">
			<HomeTwoToneIcon
				style={{
					fontSize: 30,
					marginBottom: '5px',
				}}
			/>
			{md ? <span>Home</span> : null}
		</Link>
	);

	const dashboard = (
		<Link to="/dashboard">
			<DashboardTwoToneIcon
				style={{
					fontSize: 30,
					marginBottom: '5px',
				}}
			/>
			{md ? <span>Dashboard</span> : null}
		</Link>
	);

	const job_board = (
		<Link to="/job_portal">
			<WorkTwoToneIcon
				style={{
					fontSize: 30,
					marginBottom: '5px',
				}}
			/>
			{md ? <span>Job Board</span> : null}
		</Link>
	);

	const members = (
		<Link to="/members">
			<GroupTwoToneIcon
				style={{
					fontSize: 30,
					marginBottom: '5px',
				}}
			/>
			{md ? <span>Members</span> : null}
		</Link>
	);

	const events = (
		<Link to="/events">
			<EventTwoToneIcon
				style={{
					fontSize: 30,
					marginBottom: '5px',
				}}
			/>
			{md ? <span>Events</span> : null}
		</Link>
	);

	const newsroom = (
		<Link to="/newsroom">
			<AnnouncementTwoToneIcon
				style={{
					fontSize: 30,
					marginBottom: '5px',
				}}
			/>
			{md ? <span>Newsroom</span> : null}
		</Link>
	);

	const menu = (
		<Menu>
			{user?.isAdmin && (
				<Menu.Item>
					<Link to="/admin_dashboard">Admin Panel</Link>
				</Menu.Item>
			)}
			<Menu.Item>
				<Link to="/profile">Profile Page</Link>
			</Menu.Item>
		</Menu>
	);

	const profile = (
		<>
			<AccountBoxTwoToneIcon
				style={{
					fontSize: 35,
					marginRight: '5px',
				}}
			/>
			{user_name}
		</>
	);

	const profiledd = (
		<Dropdown overlay={menu} trigger={['click']}>
			<div className="ant-dropdown-link" style={{ cursor: 'pointer' }}>
				<>
					{profile} <DownOutlined />
				</>
			</div>
		</Dropdown>
	);

	return !md ? (
		// <Affix offsetTop={0} className="privatenav-block-affix">
		<nav className="privatenav">
			<Row className="privatenav-wrapper-row">
				<Col span={24} className="privatenav-wrapper-col">
					<Col span={24} className="privatenav-block">
						<Col span={4} className="privatenav-block-item">
							{home}
						</Col>
						<Col span={4} className="privatenav-block-item">
							{dashboard}
						</Col>
						<Col span={4} className="privatenav-block-item">
							{job_board}
						</Col>
						<Col span={4} className="privatenav-block-item">
							{members}
						</Col>
						<Col span={4} className="privatenav-block-item">
							{events}
						</Col>
						<Col span={4} className="privatenav-block-item">
							{newsroom}
						</Col>
					</Col>
					<Col span={24} className="privatenav-block1">
						<Col span={12} className="private-block1-item">
							<Badge>
								{/* <Link to="" style={{ color: 'black' }}> */}
								<NotificationsNoneRoundedIcon />
								{/* </Link> */}
							</Badge>
							<Badge count={0}>
								{/* <Link to="" style={{ color: 'black' }}> */}
								<MailOutlineRoundedIcon />
								{/* </Link> */}
							</Badge>
						</Col>
						<Col span={12} className="private-block1-item">
							{profiledd}
						</Col>
					</Col>
				</Col>
			</Row>
		</nav>
	) : (
		// </Affix>
		<Affix offsetTop={0} className="privatenav-block-affix">
			<nav className="privatenav">
				<Row className="privatenav-wrapper-row">
					<Col span={24} className="privatenav-wrapper-col">
						<Col span={2} className="privatenav-block-item">
							{home}
						</Col>
						<Col span={2} className="privatenav-block-item">
							{dashboard}
						</Col>
						<Col span={2} className="privatenav-block-item">
							{job_board}
						</Col>
						<Col span={2} className="privatenav-block-item">
							{members}
						</Col>
						<Col span={2} className="privatenav-block-item">
							{events}
						</Col>
						<Col span={2} className="privatenav-block-item">
							{newsroom}
						</Col>
						<Col span={6} className="privatenav-block-item">
							<Col span={12}>
								<Badge count={0}>
									{/* <Link to="" style={{ color: 'black' }}> */}
									<NotificationsNoneRoundedIcon />
									{/* </Link> */}
								</Badge>
								<Badge count={0}>
									{/* <Link to="" style={{ color: 'black' }}> */}
									<MailOutlineRoundedIcon />
									{/* </Link> */}
								</Badge>
							</Col>
							<Col span={12} className="profile">
								{profiledd}
							</Col>
						</Col>
					</Col>
				</Row>
			</nav>
		</Affix>
	);
};

export default PrivateNav;
