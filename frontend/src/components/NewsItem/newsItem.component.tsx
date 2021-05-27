import { Row, Col, Grid, Divider, Tag, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import readingTime from 'reading-time';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './newsItem.component.css';
import { cancelNews, getAPost } from '../../services/api/newsroom';

const { useBreakpoint } = Grid;

function NewsItem(props: any) {
	const { md } = useBreakpoint();
	const history = useHistory();
	const clickHandler = () => {
		history.push({ pathname: `/newsroom/n/${props.id}`, state: props.id });
	};
	return (
		<div className="newsItem-container">
			<Col span={md ? 10 : 24} className="newsItem-thumbnail">
				<a onClick={clickHandler}>
					<img
						src={
							props.thumbnail ??
							'https://source.unsplash.com/random/800x600'
						}
						alt="thumbnail"
					/>
				</a>
			</Col>
			<Col span={md ? 14 : 24} className="newsItem-details">
				<a onClick={clickHandler}>
					<div className="newsItem-title">{props.title}</div>
				</a>
				<p className="newsItem-overview">{props.overview}</p>
			</Col>
		</div>
	);
}

export function NewsItemIndiv() {
	const loc = useLocation();
	const history = useHistory();
	const user = useSelector((state: any) => state.authReducer.user);
	const news_id: string =
		(loc.state as string) ?? loc.pathname.split('/n/')[1];
	const [readTime, setReadTime] = useState(0);
	const [news, setNews] = useState<any>(null);

	useEffect(() => {
		getAPost(news_id, user.token)
			.then((res: any) => {
				if (res.data.error) {
					throw new Error(res.data.message);
				} else {
					setNews(res.data.news);
					console.log('news: ', news);
					const stats = readingTime(res.data.news.body);
					setReadTime(stats.minutes);
				}
			})
			.catch((err) => console.log(err.message));
	}, []);

	const handleRemove = (id: any) => {
		cancelNews(id, user.token)
			.then((_res: any) => {
				history.push('/newsroom');
			})
			.catch((err: any) => console.log(err.message));
	};

	const { md } = useBreakpoint();
	return (
		<div className="newsroom-details-wrapper indiv">
			{news ? (
				<>
					<div className="newsroom-head">
						{(news?.tags as string)
							?.split(';')
							.map((tag: string) => (
								<Tag className="tag">{tag.trim()}</Tag>
							))}
						<h1>{news.title}</h1>
						<hr />
						<div>{news.overview}</div>
					</div>
					<Divider />
					<div className="newsroom-content-meta">
						<div className="author">
							<PersonIcon
								style={{ fontSize: 25, marginRight: '10px' }}
							/>
							Posted by: {news.created_by}
						</div>
						<div className="readtime">
							<QueryBuilderIcon
								style={{ fontSize: 25, marginRight: '10px' }}
							/>
							Read time: {readTime} minutes
						</div>
						{news.created_by_id === user._id ? (
							<div className="change-funcs">
								<div
									className="edit"
									onClick={() => {
										history.push({
											pathname: `/newsroom/${news._id}/edit`,
											state: news,
										});
									}}
								>
									<CreateIcon
										style={{
											fontSize: 25,
											marginRight: '10px',
										}}
									/>
									Edit
								</div>
								<div
									className="edit"
									style={{
										backgroundColor: 'red',
										color: 'white',
									}}
									onClick={() => {
										handleRemove(news._id);
									}}
								>
									<DeleteForeverIcon
										style={{
											fontSize: 25,
											marginRight: '10px',
										}}
									/>
									Remove
								</div>
							</div>
						) : null}
					</div>
					<Row className="newsroom-content-container">
						<Col
							span={md ? 18 : 24}
							className="newsroom-content-display-card"
						>
							<img
								src={
									news.thumbnail ??
									'https://source.unsplash.com/random/800x600'
								}
								alt="thumbnail"
							/>
							<div className="textbody">
								<ReactMarkdown remarkPlugins={[gfm]}>
									{news.body}
								</ReactMarkdown>
							</div>
						</Col>
					</Row>
				</>
			) : (
				<Spin size="large" />
			)}
		</div>
	);
}

export default NewsItem;
