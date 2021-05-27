import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Card, Row, Col, Image, Grid } from 'antd';
import { useState } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './execTeam.css';
import { useEffect } from 'react';
import { getExecCommittee } from '../../../services/api/execCommittee';

const { useBreakpoint } = Grid;

function ExecTeam() {
	const [currViewOp, setCurrViewOp] = useState('All');
	const [error, setError] = useState('');
	const [members, setMembers] = useState<any>(null);

	useEffect(() => {
		getExecCommittee()
			.then((res) => {
				if (res?.data?.error) {
					throw new Error(res.data.message);
				} else {
					setMembers(res?.data?.members);
				}
			})
			.catch((err) => {
				setError(err);
				console.log(error);
			});
	}, []);

	const filterMenu = (
		<Menu className="execteam-dropdown-filter-menu">
			<Menu.Item
				key="1"
				className="execteam-dropdown-filter-menu"
				onClick={() => {
					setCurrViewOp('All');
				}}
			>
				All
			</Menu.Item>
			<Menu.Item
				key="2"
				className="execteam-dropdown-filter-menu"
				onClick={() => {
					setCurrViewOp('Leadership');
				}}
			>
				Leadership
			</Menu.Item>
			<Menu.Item
				key="3"
				className="execteam-dropdown-filter-menu"
				onClick={() => {
					setCurrViewOp('Ex-Officio');
				}}
			>
				Ex-Officio
			</Menu.Item>
			<Menu.Item
				key="4"
				className="execteam-dropdown-filter-menu"
				onClick={() => {
					setCurrViewOp('Council Members');
				}}
			>
				Council Members
			</Menu.Item>
			<Menu.Item
				key="5"
				className="execteam-dropdown-filter-menu"
				onClick={() => {
					setCurrViewOp('Batch Evangelist');
				}}
			>
				Batch Evangelist
			</Menu.Item>
			<Menu.Item
				key="6"
				className="execteam-dropdown-filter-menu"
				onClick={() => {
					setCurrViewOp('Ex-Council Members');
				}}
			>
				Ex-Council Members
			</Menu.Item>
		</Menu>
	);

	const Members = () => {
		switch (currViewOp) {
			case 'All':
				return members ? (
					Object.keys(members).map((currOp) => (
						<>
							<div className="execteam-description">
								<h1>{currOp}</h1>
								<hr />
							</div>
							{members[currOp]?.map((element: any) => (
								<ExecTeamProfileCard
									img={element.image.data}
									name={
										element.first_name +
										' ' +
										element.last_name
									}
									designation={element.position}
									profile={element.info}
									email={element.email}
									facebook={element.facebook}
									linkedIn={element.linkedIn}
									website={element.website}
								/>
							))}
						</>
					))
				) : (
					<h1>null</h1>
				);

			default:
				return members ? (
					<>
						<div className="execteam-description">
							<h1>{currViewOp}</h1>
							<hr />
						</div>
						{members[currViewOp]?.map((element: any) => (
							<ExecTeamProfileCard
								img={element.image.data}
								name={
									element.first_name + ' ' + element.last_name
								}
								designation={element.position}
								profile={element.info}
								email={element.email}
								facebook={element.facebook}
								linkedIn={element.facebook}
								website={element.website}
							/>
						))}
					</>
				) : null;
		}
	};

	return (
		<div className="execteam-container">
			<div className="execteam-body">
				<div className="execteam-head">
					<h1>Meet the Executive Committee</h1>
					<hr />
				</div>
				<div className="execTeam-filter">
					<Dropdown
						overlay={filterMenu}
						trigger={['click']}
						className="execteam-dropdown"
					>
						<Button className="execteam-dropdown-buttom">
							{currViewOp} <DownOutlined />
						</Button>
					</Dropdown>
				</div>
				{Members()}
			</div>
		</div>
	);
}

function ExecTeamProfileCard(props: any) {
	const {md} = useBreakpoint();
	return (
		<div className="execteam-profilecard-container">
			<Card className="execteam-profilecard">
				<Row className="execteam-profilecard-row">
					<Col span={1} />
					<Col span={6} className="execteam-profilecard-row-imgcol">
						<Image
							className="execteam-profilecard-row-img"
							width={md ? '11vw' : '20vw'}
							src={props.img}
							alt="Display picture"
							preview={false}
						/>
					</Col>
					<Col span={2} />
					<Col span={14} className="execteam-profilecard-row-details">
						<div className="execteam-profilecard-row-details-div">
							<Row className="person-info">
								<div className="person-info">
									<h2>{props.designation}</h2>
									<h1>{props.name}</h1>
									<hr />
									<span>{props.profile}</span>
								</div>
							</Row>
							<div className="person-social">
								<a
									href={'mailto:' + props.email}
									target="_blank"
								>
									<EmailIcon
										style={{ fontSize: 25 }}
										className="execteam-social-icon"
									/>
								</a>
								<a href={props.linkedIn} target="_blank">
									<LinkedInIcon
										style={{ fontSize: 25 }}
										className="execteam-social-icon"
									/>
								</a>
								<a href={props.facebook} target="_blank">
									<FacebookIcon
										style={{ fontSize: 25 }}
										className="execteam-social-icon"
									/>
								</a>
							</div>
						</div>
					</Col>
				</Row>
			</Card>
			<hr />
		</div>
	);
}

export default ExecTeam;
