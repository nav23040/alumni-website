import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Card, Row, Col, Grid, Spin } from 'antd';
import NewsItem from '../../components/NewsItem/newsItem.component';
import { getConfPosts } from '../../services/api/newsroom';
import './newsroom.css';

const { useBreakpoint } = Grid;

function NewsRoom() {
	const { md } = useBreakpoint();
	const user = useSelector((state: any) => state.authReducer.user);
	const [menu, setMenu] = useState(1);

	const menuItemClickHandler = (key: any) => () => {
		setMenu(key);
	};

	// const menuItems = ();

	return (
		<div className="newsroom-details-wrapper">
			<div className="newsroom-head">
				<h1>Explore All IIT Ropar Alumnus News/Stories</h1>
				<hr />
			</div>
			<Row className="newsroom-details-container">
				<Col
					span={md ? 17 : 24}
					className="newsroom-details-display-card"
				>
					{GetAllCards()}
				</Col>
				<Col
					span={md ? 7 : 24}
					className="newsroom-details-sidemenu-col"
				>
					{user && (
						<a href="/newsroom/create">
							<div className="add-news">Add new story</div>
						</a>
					)}
				</Col>
			</Row>
		</div>
	);
}

function GetAllCards() {
	const user = useSelector((state: any) => state.authReducer.user);
	const [newsItems, setItems] = useState<any>(null);

	useEffect(() => {
		const fetchItems = async (token: any) => {
			try {
				const posts = await getConfPosts(token);
				if (posts?.data?.error) {
					throw new Error(posts.data.error);
				} else {
					setItems(posts.data.news);
				}
			} catch (err) {
				console.log(err.message);
			}
		};
		fetchItems(user.token);
	}, []);
	return (
		<div className="newsItems">
			{newsItems ? (
				newsItems.map((item: any) => (
					<NewsItem
						id={item._id}
						thumbnail={item.thumbnail}
						title={item.title}
						overview={item.overview}
					/>
				))
			) : (
				<Spin size="large" />
			)}
		</div>
	);
}

export default NewsRoom;
