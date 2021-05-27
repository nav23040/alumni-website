import { useEffect, useState } from 'react';
import { Menu, Card, Row, Col, Grid } from 'antd';
import BasicProfileMenu from '../profileUpdateComponents/basicProfile.component';
import ContactsMenu from '../profileUpdateComponents/contacts.component';
import EducationalMenu from '../profileUpdateComponents/educational.component';
import ProfessionalMenu from '../profileUpdateComponents/professional.component';
import AttachmentsMenu from '../profileUpdateComponents/attachments.component';
import AccountDetailMenu from '../profileUpdateComponents/accountDetails.component';
import SocialAccountMenu from '../profileUpdateComponents/socialAccount.component';
import './profileInfo.component.css';
import ProfileImageMenu from '../profileUpdateComponents/profileImage.component';
import { useSelector } from 'react-redux';
import { getMyInfo } from '../../services/api/user';

const { useBreakpoint } = Grid;

function ProfileInfo() {
	const { md } = useBreakpoint();
	const user = useSelector((state: any) => state.authReducer.user);
	const [menu, setMenu] = useState(1);
	const [userInfo, setUserInfo] = useState<any>(null);

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

	const menuItemClickHandler = (key: any) => () => {
		setMenu(key);
	};

	const menuItems = (
		<>
			<Menu.Item key="1" onClick={menuItemClickHandler(1)}>
				Basic Profile
			</Menu.Item>
			<Menu.Item key="2" onClick={menuItemClickHandler(2)}>
				Profile Image
			</Menu.Item>
			<Menu.Item key="3" onClick={menuItemClickHandler(3)}>
				Location & Contact details
			</Menu.Item>
			<Menu.Item key="4" onClick={menuItemClickHandler(4)}>
				Educational Detail
			</Menu.Item>
			<Menu.Item key="5" onClick={menuItemClickHandler(5)}>
				Work / Professional Details
			</Menu.Item>
			<Menu.Item key="6" onClick={menuItemClickHandler(6)} disabled>
				Achievements
			</Menu.Item>
			<Menu.Item key="7" onClick={menuItemClickHandler(7)}>
				Resume & Attachments
			</Menu.Item>
			<Menu.Item key="8" onClick={menuItemClickHandler(8)}>
				Account Details
			</Menu.Item>
			<Menu.Item key="9" onClick={menuItemClickHandler(9)}>
				Social Connections
			</Menu.Item>
			<Menu.Item key="0" onClick={menuItemClickHandler(10)} disabled>
				Additional Details
			</Menu.Item>
		</>
	);

	const fixedMenu = (
		<div className="profile-details-sidemenu-wrapper">
			<Menu className="profile-details-sidemenu" mode="inline">
				{menuItems}
			</Menu>
		</div>
	);

	return (
		<div className="profile-details-wrapper">
			<Row className="profile-details-container">
				<Col
					span={md ? 7 : 24}
					className="profile-details-sidemenu-col"
				>
					{fixedMenu}
				</Col>
				<Col
					span={md ? 17 : 24}
					className="profile-details-display-col"
				>
					{userInfo && (
						<Card className="profile-details-display-card">
							{getCurrentMenu(menu, userInfo)}
						</Card>
					)}
				</Col>
			</Row>
		</div>
	);
}

export default ProfileInfo;

function getCurrentMenu(menu: number, props: any) {
	switch (menu) {
		case 1:
			return <BasicProfileMenu {...props} />;
		case 2:
			return <ProfileImageMenu {...props} />;
		case 3:
			return <ContactsMenu {...props} />;
		case 4:
			return <EducationalMenu />;
		case 5:
			return <ProfessionalMenu {...props} />;
		case 6:
			return null;
		case 7:
			return <AttachmentsMenu />;
		case 8:
			return <AccountDetailMenu {...props} />;
		case 9:
			return <SocialAccountMenu />;
		case 10:
			return null;
		default:
			return null;
	}
}
