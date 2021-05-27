import { Form, Input, Button, Divider, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { changePass, changePE, removeMe } from '../../services/api/user';
import { useSelector } from 'react-redux';

function AccountDetails(props: any) {
	const user = useSelector((state: any) => state.authReducer.user);
	const [error, setError] = useState('');
	const [updateEmail, setUpdateEmail] = useState(false);
	const handleSubmit = () => {};
	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 7 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 24 },
		},
	};

	const updateLoginIdFormSubmit = (payload: any) => {
		changePE(payload, user.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					message.success(
						'Successfully Raised a request to change primary Email Id'
					);
					window.location.reload();
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
			});
	};

	const updatePassFormSubmit = (payload: any) => {
		changePass(payload, user.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					message.success('Successfully Changed your password');
					window.location.reload();
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
			});
	};

	const [updateLoginIdForm] = Form.useForm();
	const [updatePassForm] = Form.useForm();
	return (
		<div className="profileupdate-menu-wrapper">
			<div className="profileupdate-menu-head">
				<h1>Account Details</h1>
				<span>Modify & Review your Account credentials.</span>
			</div>
			<hr />
			<Form
				form={updateLoginIdForm}
				name="updateLoginIdForm"
				{...formItemLayout}
				onFinish={updateLoginIdFormSubmit}
				labelAlign="left"
				initialValues={{ prefix: '91' }}
				scrollToFirstError
			>
				<Form.Item
					initialValue={props?.primary_email}
					className="signupCreate-form-email"
					name="email"
					tooltip="This email will be used as login email Id"
					label="Primary Email Id"
					help={
						!updateEmail ? (
							<span style={{ color: 'rgb(160, 160, 160)' }}>
								<a onClick={() => setUpdateEmail(true)}>
									Click here
								</a>{' '}
								to update login Email Id
							</span>
						) : (
							<span style={{ color: 'rgb(160, 160, 160)' }}>
								This action will request the admin to review and
								verify your updated email Id.
							</span>
						)
					}
					rules={[
						{
							type: 'email',
							required: true,
							message: 'Please Enter valid Email Address',
						},
					]}
				>
					<Input disabled={!updateEmail} />
				</Form.Item>

				{updateEmail ? (
					<div className="signupCreate-form-submit-button-div">
						<Form.Item
							initialValue={props?.primary_email}
							className="profileupdate-form-submit"
						>
							<Button
								type="primary"
								htmlType="submit"
								loading={props.isLoading}
							>
								Update
							</Button>
							<Button
								style={{ marginLeft: '20px' }}
								onClick={() => {
									setUpdateEmail(false);
									updateLoginIdForm.setFieldsValue({
										email: props?.primary_email,
									});
								}}
							>
								Cancel
							</Button>
						</Form.Item>
					</div>
				) : null}
			</Form>

			<div className="profileupdate-submenu-head">
				<h2>Change Password</h2>
				<span style={{ color: 'rgb(160, 160, 160)' }}>
					Change your account password
				</span>
			</div>
			<hr />
			<Form
				form={updatePassForm}
				name="updatePassForm"
				{...formItemLayout}
				onFinish={updatePassFormSubmit}
				labelAlign="left"
				initialValues={{ prefix: '91' }}
				scrollToFirstError
			>
				<Form.Item
					name="curr_pass"
					label="Current Password"
					rules={[
						{
							required: true,
							message: 'Please enter current password',
						},
					]}
				>
					<Input.Password placeholder="Enter password" />
				</Form.Item>
				<Form.Item
					name="new_pass"
					label="New Password"
					rules={[
						{
							required: true,
							message: 'Please enter new password',
						},
					]}
				>
					<Input.Password placeholder="Enter password" />
				</Form.Item>
				<Form.Item
					name="confirm_pass"
					label="Confirm Password"
					hasFeedback
					dependencies={['new_pass']}
					rules={[
						{
							required: true,
							message: 'Please confirm your password',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue('new_pass') === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										'The two passwords that you entered do not match!'
									)
								);
							},
						}),
					]}
				>
					<Input.Password placeholder="Enter password" />
				</Form.Item>
				<div className="signupCreate-form-submit-button-div">
					<Form.Item className="profileupdate-form-submit">
						<Button
							type="primary"
							htmlType="submit"
							loading={props.isLoading}
						>
							Update
						</Button>
					</Form.Item>
				</div>
			</Form>
			<div className="profileupdate-submenu-head">
				<Divider style={{ fontSize: '1.5em' }}>Delete Account</Divider>
				<span style={{ color: 'rgb(160, 160, 160)' }}>
					If you do not wish to continue being a member of this
					network, you may request the admin to delete your account.
					<br />
					<strong>
						Re-registeration and admin approval are mandatory to
						re-join the network.
					</strong>
				</span>
			</div>
			<div className="signupCreate-form-submit-button-div">
				<Button danger onClick={ModalConfirm}>
					Click Here
				</Button>
			</div>
		</div>
	);
}

export function ModalConfirm(token: any) {
	const handleOk = () => {
		removeMe({}, token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					message.success(
						'Successfully Rasised a request to remove your account'
					);
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
			});
	};
	return Modal.confirm({
		title: 'Delete Account',
		icon: <ExclamationCircleOutlined />,
		content: (
			<div>
				<p>Press confirm to delete your account</p>
				<p> It is an irreverrsible step</p>
			</div>
		),
		okText: 'Confirm',
		onOk() {
			handleOk();
		},
		cancelText: 'Cancel',
		okButtonProps: { danger: true },
	});
}

export default AccountDetails;
