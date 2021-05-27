import { Form, Input, Button, Divider } from 'antd';
import { useState } from 'react';
import {
	LinkedinFilled,
	FacebookFilled,
	GoogleSquareFilled,
} from '@ant-design/icons';

function SocialAccountMenu(props: any) {
	return (
		<div className="profileupdate-menu-wrapper">
			<div className="profileupdate-menu-head">
				<h1>Connect Social Accounts</h1>
				<span>
					You can connect to your social profiles. By connecting your
					social accounts, you will be able to login using your social
					account from next time.
				</span>
			</div>
			<hr />

			<div className="socialAccount-connect">
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FacebookFilled
						style={{
							fontSize: '2em',
							marginRight: '10px',
							color: '#4267B2',
						}}
					/>{' '}
					<span>Facebook</span>{' '}
				</div>
				<Button disabled>Connect</Button>
			</div>
			<Divider />
			<div className="socialAccount-connect">
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<LinkedinFilled
						style={{
							fontSize: '2em',
							marginRight: '10px',
							color: '#0e76a8',
						}}
					/>{' '}
					<span>linkedIn</span>{' '}
				</div>
				<Button disabled>Connect</Button>
			</div>
			<Divider />
			<div className="socialAccount-connect">
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<GoogleSquareFilled
						style={{
							fontSize: '2em',
							marginRight: '10px',
							color: '#DB4437',
						}}
					/>{' '}
					<span>Google</span>{' '}
				</div>
				<Button disabled>Connect</Button>
			</div>
			<Divider />
		</div>
	);
}

export default SocialAccountMenu;
