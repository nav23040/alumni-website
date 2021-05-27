import { Card, Image, Grid, Tag, Col, Row, Spin } from 'antd';
import ProfileInfo from '../../components/ProfileInfo/profileInfo.component';
import profileImg from '../../assets/profile.png';
import './profilePage.css';
import {
	CheckCircleOutlined,
	FacebookFilled,
	LinkedinFilled,
	GlobalOutlined,
	MailOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyInfo } from '../../services/api/user';
import moment from 'moment';
import { Link } from 'react-router-dom';

const { useBreakpoint } = Grid;

function ProfilePage() {
	const { xl, md } = useBreakpoint();
	const [userInfo, setUserInfo] = useState<any>(null);
	const user = useSelector((state: any) => state.authReducer.user);
	useEffect(() => {
		getMyInfo(user.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					setUserInfo(res?.data?.user);
				}
			})
			.catch((err: any) => console.log(err.message));
	}, []);

	const batch = moment
		.unix(userInfo?.educational_info[0]?.end_date / 1000)
		.format('YYYY');
	return (
		<div className="profilepage">
			<div className="profilepage-container">
				{userInfo ? (
					<>
						<Card className="profilepage-introsection-container">
							<div className="profilepage-profile-introsection">
								<Image
									className="profilepage-profile-pic"
									src={
										userInfo?.profileImg?.data ?? profileImg
									}
									width={xl ? 250 : md ? 200 : 130}
								/>
							</div>
							<Row className="profilepage-profile-introdetails-container">
								<Col span={md ? 18 : 24}>
									<Row className="profilepage-profile-introdetails">
										<div>
											<h1>
												{userInfo?.basic_info
													?.first_name +
													' ' +
													userInfo?.basic_info
														?.last_name}
												<CheckCircleOutlined
													style={{
														marginLeft: '10px',
														marginBottom: '20px',
														fontSize: '0.9em',
														color: userInfo?.registered_user
															? 'green'
															: 'grey',
													}}
												/>
											</h1>

											<span>
												{userInfo?.educational_info[0]
													?.degree_name +
													' - ' +
													userInfo
														?.educational_info[0]
														?.stream_name +
													' - ' +
													batch}
											</span>
										</div>
									</Row>
									<Row className="profilepage-profile-sociallinks">
										<SocialLink
											{...userInfo?.location_contact_info
												?.social_profiles}
										/>
									</Row>
									{/* <Button>
								{' '}
								<EditOutlined />
								Edit{' '}
							</Button> */}
								</Col>
								<Col className="tag" span={md ? 6 : 24}>
									<Tag
										color="#0cb800"
										style={{ fontSize: '1.2em' }}
									>
										{userInfo?.basic_info?.profile_role}
									</Tag>
								</Col>
							</Row>
						</Card>
						<ProfileInfo />
					</>
				) : (
					<Spin size="large" />
				)}
			</div>
		</div>
	);
}

function SocialLink(props: any) {
	return (
		<>
			<a href={'mailto:' + props.facebook} target="_blank">
				<MailOutlined style={{ fontSize: 25 }} />
			</a>
			<a href={props.facebook} target="_blank">
				<FacebookFilled style={{ fontSize: 25 }} />
			</a>
			<a href={props.linkedin} target="_blank">
				<LinkedinFilled style={{ fontSize: 25 }} />
			</a>
			<a href={props.website} target="_blank">
				<GlobalOutlined style={{ fontSize: 25 }} />
			</a>
		</>
	);
}

export default ProfilePage;
