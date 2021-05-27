import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './Dashboard.css';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Row, Col, Card, Avatar, Input } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { Upload, message, Button, List, Space } from 'antd';
import {
	UploadOutlined,
	LikeOutlined,
	CalendarTwoTone,
} from '@ant-design/icons';
import axios from 'axios';
import { couldStartTrivia } from 'typescript';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import * as dotenv from 'dotenv';
import { getConfRecentEvents } from '../../services/api/event';
import MDEditor from '../../components/MDEditor/mdEditor.component';
import { getRecentPosts } from '../../services/api/newsroom';
dotenv.config();
export let url = process.env.REACT_APP_SERVER_URL;

const { TextArea } = Input;
const { Meta } = Card;

const IconText = ({ icon, text }: { icon: any; text: string }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		rootm: {
			maxWidth: 345,
		},
		media: {
			height: 140,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	})
);

const props = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info: any) {
		if (info.file.status !== 'uploading') {
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};

const tabListNoTitle = [
	{
		key: 'Make_Post',
		tab: 'Make Post',
	},
	{
		key: 'Photos_Videos',
		tab: 'Photos/Videos',
	},
];

const initialValues = {
	noTitleKey: 'Make_Post',
};

export default function Dash() {
	const global_state = useSelector((state: any) => state.authReducer.user);
	const [post_des, setpost_des] = useState('');
	const [likechange, setlikechange] = useState(false);
	const [refresh, setrefresh] = useState(false);
	const [events, setevents] = useState<any>([]);
	const [news, setnews] = useState<any>([]);
	const history = useHistory();

	const handlePostChange = (e: any) => {
		setpost_des(e.target.value);
	};

	const handleLikeClick = (post_id: any) => {
		axios
			.post(
				`${url}/posts/add_likes`,
				{
					_id: post_id,
				},
				{
					withCredentials: true,

					headers: {
						authorization: 'Bearer ' + global_state.token,
					},
				}
			)
			.then((response) => {
				setlikechange(!likechange);
			})
			.catch((error) => console.log(error));
	};

	const handlePostSubmit = (_e: any) => {
		axios
			.post(
				`${url}/posts/create_post`,
				{
					content: post_des,
				},
				{
					withCredentials: true,

					headers: {
						authorization: 'Bearer ' + global_state.token,
					},
				}
			)
			.then((response) => {
				setrefresh(!refresh);
				setpost_des('');

				console.log(response.data);
			});
	};

	const getDate_custom = (date: any) => {
		const _date = new Date(date);
		var time = _date.toLocaleTimeString('en-US');
		const time1 = time.substring(0, 5);
		const time2 = time.substring(9, 11);
		time = time1 + ' ' + time2;
		return `${_date.getDate()}-${_date.getMonth()}-${_date.getFullYear()} ${time}`;
	};

	const contentListNoTitle: { [id: string]: any } = {
		Make_Post: (
			<Grid container direction="column">
				<Grid item xs style={{ marginBottom: '1vh' }}>
					<MDEditor value={post_des} onChange={setpost_des} />
				</Grid>
				<Grid item xs>
					<Button type="primary" onClick={handlePostSubmit}>
						Post
					</Button>
				</Grid>
			</Grid>
		),
		Photos_Videos: (
			<Upload {...props}>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>
		),
	};
	const [values, setvalues] = useState(initialValues);
	const [posts, setposts] = useState<any[]>([]);

	const eventdate = (event_date: any) => {
		const event_Date = new Date(event_date);
		return (
			event_Date.getDate() +
			'-' +
			(event_Date.getMonth() + 1) +
			'-' +
			event_Date.getFullYear()
		);
	};

	const newstime = (newsdate: any) => {
		const news_date = new Date(newsdate);
		var hours = news_date.getHours();
		var minutes = news_date.getMinutes() as number;
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		var min2 = (minutes < 10 ? '0' + minutes : minutes) as string;
		return hours + ':' + min2 + ' ' + ampm;
	};

	useEffect(() => {
		axios
			.get(`${url}/posts/all_posts`, {
				withCredentials: true,

				headers: {
					authorization: `Bearer ${global_state.token}`,
				},
			})
			.then((response) => {
				setposts(response.data);
			});
	}, [likechange, refresh]);

	useEffect(() => {
		getConfRecentEvents().then((res) => {
			setevents(res.data.events);
			getRecentPosts().then((resp) => {
				setnews(resp?.data?.news);
			});
		});
	}, [refresh, likechange]);

	const onTabChange = (key: any, type: any) => {
		setvalues({
			...values,
			[type]: key,
		});
	};
	const classes = useStyles();
	return (
		<div className="dashboard-container">
			<div className="dashboard-body">
				<div className={classes.root}>
					<Grid container spacing={2}>
						<Grid item xs={7}>
							<Grid container direction="row" spacing={1}>
								{' '}
								<Grid item>
									<div className="dashboard-heading">
										Welcome, {global_state.first_name}!
									</div>
								</Grid>
								<Grid item>
									{' '}
									<div className="dashboard-sub-heading">
										See What's Happening
									</div>
								</Grid>
							</Grid>
							<Card
								style={{ width: 'auto', marginTop: 30 }}
								tabList={tabListNoTitle}
								activeTabKey={values.noTitleKey}
								onTabChange={(key) => {
									onTabChange(key, 'noTitleKey');
								}}
							>
								{' '}
								{contentListNoTitle[values.noTitleKey]}
							</Card>
						</Grid>

						<Grid item xs={4} style={{ marginLeft: 70 }}>
							<h1>News</h1>
							<div className="news_line"></div>
							<br></br>
							<Card
								style={{ width: 'xs' }}
								actions={[
									<ReadOutlined
										onClick={() => {
											history.push({
												pathname: `/newsroom/n/${news[0]._id}`,
												state: news[0]._id,
											});
										}}
									/>,
								]}
							>
								<Meta
									avatar={
										<Avatar
											src={
												news[0]?.thumbnail ??
												'https://source.unsplash.com/random/800x600'
											}
											alt="thumbnail"
										/>
									}
									title={
										<Grid
											container
											direction="column"
											spacing={0}
										>
											<h2
												style={{
													color: 'green',
													marginBottom: 0,
												}}
											>
												{news[0]?.title?.slice(0, 30)}
											</h2>
											<h5>
												{eventdate(
													news[0]?.date_created
												) +
													'  ' +
													newstime(
														news[0]?.date_created
													)}
											</h5>
										</Grid>
									}
									description={<h3>{news[0]?.overview}</h3>}
								/>
							</Card>
							<br></br>
							<Card
								style={{ width: 'xs' }}
								actions={[
									<ReadOutlined
										onClick={() => {
											history.push({
												pathname: `/newsroom/n/${news[1]._id}`,
												state: news[1]._id,
											});
										}}
									/>,
								]}
							>
								<Meta
									avatar={
										<Avatar
											src={
												news[1]?.thumbnail ??
												'https://source.unsplash.com/random/800x600'
											}
											alt="thumbnail"
										/>
									}
									title={
										<Grid
											container
											direction="column"
											spacing={0}
										>
											<h2
												style={{
													color: 'green',
													marginBottom: 0,
												}}
											>
												{news[1]?.title}
											</h2>
											<h5>
												{eventdate(
													news[1]?.date_created
												) +
													'  ' +
													newstime(
														news[1]?.date_created
													)}
											</h5>
										</Grid>
									}
									description={<h3>{news[1]?.overview}</h3>}
								/>
							</Card>
							<Grid
								container
								direction="column"
								alignItems="flex-end"
							>
								<Button type="link" href="/newsroom">
									See More
								</Button>
							</Grid>
						</Grid>
						<Grid item xs={7} style={{ marginTop: '5%' }}>
							<List
								itemLayout="vertical"
								style={{ marginTop: -90 }}
								size="large"
								pagination={{
									onChange: (page) => {},
									pageSize: 7,
								}}
								dataSource={posts}
								renderItem={(item) => (
									<div className="list-border">
										<List.Item
											key={item?.user_name as string}
											actions={[
												<Button
													icon={
														<IconText
															icon={LikeOutlined}
															text={
																item.like_count
															}
															key="list-vertical-like-o"
														/>
													}
													size="small"
													style={{
														width: 'auto',
														border: 'none',
													}}
													onClick={() => {
														handleLikeClick(
															item._id
														);
													}}
												></Button>,
											]}
											/*extra={
												<img
													width={272}
													alt="logo"
													src="https://englishtribuneimages.blob.core.windows.net/gallary-content/2020/9/2020_9$largeimg_1283253066.jpg"
												/>
											}*/
										>
											<List.Item.Meta
												avatar={
													<Avatar
														src={item?.avatar}
													/>
												}
												title={
													<a href={item.href}>
														{item?.user_name}
													</a>
												}
												description={
													eventdate(item.post_date) +
													'  ' +
													newstime(item.post_date)
												}
											/>
											<ReactMarkdown
												remarkPlugins={[gfm]}
											>
												{item.content}
											</ReactMarkdown>
										</List.Item>
									</div>
								)}
							/>
						</Grid>
						<Grid item xs={4} style={{ marginLeft: 70 }}>
							<Grid container direction="column">
								<h1>Invite</h1>
								<div className="news_line"></div>
								<br></br>
								<Card
									style={{ width: 'xs' }}
									actions={[
										<Grid
											container
											direction="column"
											alignItems="flex-start"
										>
											<Button
												type="primary"
												style={{ marginLeft: 16 }}
											>
												Invite By Email
											</Button>
										</Grid>,
									]}
								>
									<Meta
										description={
											<h3>
												Spread the word about the
												network to your friends and help
												us build the Alumni Network
											</h3>
										}
									/>
								</Card>
								<br></br>

								<h1>Events</h1>
								<div className="news_line"></div>
								<br></br>
								<Card
									hoverable
									style={{ width: 'xs' }}
									actions={[]}
									onClick={() =>
										history.push({
											pathname: `/events/e/${events[0]?.event_id}`,
											state: events[0]?._id,
										})
									}
								>
									<Meta
										avatar={
											<CalendarTwoTone
												style={{
													fontSize: 40,
													marginBottom: 16,
												}}
											/>
										}
										title={
											<h2 style={{ color: 'orange' }}>
												{events[0]?.event_name.slice(
													0,
													20
												)}
												<br></br>
											</h2>
										}
									/>
									<Card>
										{' '}
										<Meta
											description={
												<Grid
													container
													direction="column"
												>
													<h3>
														Date :{' '}
														{eventdate(
															events[0]
																?.event_start
														)}
													</h3>
													<h3>
														Category :{' '}
														{
															events[0]
																?.event_category
														}
													</h3>
													<h3>
														Venue :{' '}
														{events[0]?.event_venue}
													</h3>
												</Grid>
											}
										/>
									</Card>
								</Card>
								<br></br>
								<Card
									hoverable
									style={{ width: 'xs' }}
									actions={[]}
									onClick={() =>
										history.push({
											pathname: `/events/e/${events[1]?.event_id}`,
											state: events[1]?._id,
										})
									}
								>
									<Meta
										avatar={
											<CalendarTwoTone
												style={{
													fontSize: 40,
													marginBottom: 16,
												}}
											/>
										}
										title={
											<h2 style={{ color: 'orange' }}>
												{events[1]?.event_name}
												<br></br>
											</h2>
										}
									/>
									<Card>
										{' '}
										<Meta
											description={
												<Grid
													container
													direction="column"
												>
													<h3>
														Date :{' '}
														{eventdate(
															events[1]
																?.event_start
														)}
													</h3>
													<h3>
														Category :{' '}
														{
															events[1]
																?.event_category
														}
													</h3>
													<h3>
														Venue :{' '}
														{events[1]?.event_venue}
													</h3>
												</Grid>
											}
										/>
									</Card>
								</Card>
								<Grid
									container
									direction="column"
									alignItems="flex-end"
								>
									<Button type="link" href="/events">
										See More
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
}
