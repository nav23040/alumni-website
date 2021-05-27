import { Row, Col, message } from 'antd';
import { useEffect, useState } from 'react';
import './Admindashboard.css';
import { Button } from 'antd';
import { Table, Tag, Space } from 'antd';
import { confirmNews, cancelNews } from '../../services/api/newsroom';
import { useDispatch, useSelector } from 'react-redux';
import { getPendPosts } from '../../services/api/newsroom';
import { useHistory } from 'react-router';

export default function PendingNews() {
	const global_state = useSelector((state: any) => state.authReducer.user);
	const [rowsregular, setrowsregular] = useState<any>(null);
	const [refresh, setrefresh] = useState(false);
	const history = useHistory();
	const handleConfirm = (newsid: any) => {
		console.log(newsid);
		confirmNews(newsid, global_state.token).then((response) => {
			if (response.data === 'success') {
				message.success('News confirmed');
				setrefresh(!refresh);
			} else message.error('Error in confirming news');
		});
	};

	const handleCancel = (eventid: any) => {
		cancelNews(eventid, global_state.token).then((response) => {
			if (response.data === 'success') {
				message.success('News cancelled');
				setrefresh(!refresh);
			} else message.error('Error in cancelling news');
		});
	};

	const columns = [
		{
			title: 'Title',
			key: 'title',
			dataIndex: 'title',
		},
		{
			title: 'Date Created',
			key: 'date_created',
			dataIndex: 'date_created',
		},
		{
			title: 'Time',
			key: 'news_time',
			dataIndex: 'news_time',
		},
		{
			title: 'Overview',
			key: 'overview',
			dataIndex: 'overview',
		},
		{
			title: 'Created By',
			key: 'created_by',
			dataIndex: 'created_by',
		},
		{
			title: 'Action',
			key: 'Action',
			dataIndex: 'Action',
		},
		{
			title: 'Cancel',
			key: 'Cancel',
			dataIndex: 'Cancel',
		},
		{
			title: 'View News Details',
			key: 'View',
			dataIndex: 'View',
		},
	];
	var rows_regular: any = [];
	useEffect(() => {
		getPendPosts(global_state.token).then((response) => {
			console.log(response.data.news);
			response.data.news.map((details: any) => {
				const news_date = new Date(details.date_created);
				const newsdate =
					news_date.getDate() +
					'-' +
					(news_date.getMonth() + 1) +
					'-' +
					news_date.getFullYear();

				var hours = news_date.getHours();
				var minutes = news_date.getMinutes() as number;
				var ampm = hours >= 12 ? 'pm' : 'am';
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
				var min2 = (minutes < 10 ? '0' + minutes : minutes) as string;
				var newstime = hours + ':' + min2 + ' ' + ampm;

				return rows_regular.push({
					title: details.title,
					date_created: newsdate,
					news_time: newstime,
					overview: details.overview,
					created_by: details.created_by,
					Action: (
						<Button
							color="primary"
							onClick={() => {
								handleConfirm(details._id);
							}}
							style={{
								backgroundColor: 'blue',
								color: 'white',
								fontWeight: 600,
							}}
						>
							Confirm
						</Button>
					),
					Cancel: (
						<Button
							color="secondary"
							onClick={() => {
								handleCancel(details._id);
							}}
							style={{
								backgroundColor: 'red',
								color: 'white',
								fontWeight: 600,
							}}
						>
							Cancel
						</Button>
					),
					View: (
						<Button
							color="lightsecondary"
							onClick={() =>
								history.push({
									pathname: `/newsroom/n/${details._id}`,
									state: details._id,
								})
							}
						>
							{' '}
							View{' '}
						</Button>
					),
				});
			});

			setrowsregular(rows_regular);
		});
	}, [refresh]);

	return (
		<div className="admin-contain">
			<div className="addash-contain">
				<Row>
					<Col span={6}>
						<h1 style={{ fontSize: 30, fontWeight: 400 }}>
							Pending News
						</h1>
					</Col>
				</Row>
				<Row>
					<Col span={23}>
						<Table
							columns={columns}
							dataSource={rowsregular}
							pagination={false}
						/>
					</Col>
				</Row>
			</div>
		</div>
	);
}
