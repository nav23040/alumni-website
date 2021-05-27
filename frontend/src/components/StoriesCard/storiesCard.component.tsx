import { Card } from 'antd';
import './storiesCard.component.css';

function StoriesCard(props: any) {
	const linkText: string = props.title;
	return (
		<Card className="stories-items-card">
			<div className="stories-items-card-items">
				<a href={`/newsroom/n/${props.id}`}>
					<img
						src={
							props.thumbnail ??
							'https://source.unsplash.com/random/800x600'
						}
					/>
					<div className="story-link">
						<span>{linkText}</span>
					</div>
				</a>
			</div>
		</Card>
	);
}

export default StoriesCard;
