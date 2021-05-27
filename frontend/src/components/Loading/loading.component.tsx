import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './loading.component.css';

function Spinner() {
	const antIcon = (
		<LoadingOutlined style={{ fontSize: 60, color: '#375997' }} spin />
	);

	return (
		<div className="spinner-screen">
			<div className="spinner">
				<Spin indicator={antIcon} />
				<h1>Loading ...</h1>
			</div>
		</div>
	);
}

export default Spinner;
