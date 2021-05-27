import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../../services/api/auth';
import { useDispatch } from 'react-redux';
import { signInPayload } from '../../../services/actions/auth';
import { LOGIN_SUCCESS } from '../../../services/actions/actionTypes';
import { Button, Card, Form, Input, Col, Grid, Row, Alert } from 'antd';

import {
	GoogleOutlined,
	LinkedinFilled,
	FacebookFilled,
	EyeInvisibleOutlined,
	EyeTwoTone,
} from '@ant-design/icons';
import './signin.css';
import AuthFooter from '../../../components/Footer/authFooter/authFooter.component';
import AuthNavBar from '../../../components/Navbar/authNavBar/authNavBar.component';

function SignIn() {
	const [isLoading, setLoading] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const screen = Grid.useBreakpoint();

	const handleSubmit = async (payload: signInPayload) => {
		try {
			setLoading(true);
			const res = await loginUser(payload);
			if (res?.data?.error === true) {
				throw new Error(res.data.message);
			}
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			history.push({
				pathname: '/',
				state: payload.email,
			});
			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	const [checkEmail] = Form.useForm();

	return (
		<>
			<AuthNavBar />
			<div className="auth-view">
				<div className="auth-container-wrapper">
					<div className="signin-wrapper">
						{error ? (
							<Alert
								className="signin-error"
								message={error}
								type="error"
								closable
								onClose={() => setError('')}
							/>
						) : null}
						<div className="signin-head">
							<h1>Login</h1>
						</div>
						<Card className="auth-form-container">
							<Row className="auth-form-container-row1">
								<Col
									className="auth-form-container-col1"
									span={!screen.md ? 24 : 11}
								>
									<div className="signin-form">
										<Form
											layout="vertical"
											form={checkEmail}
											autoComplete="off"
											onFinish={handleSubmit}
										>
											<div className="signin-form-items">
												<Col
													span={!screen.md ? 24 : 20}
												>
													<Form.Item
														className="signin-items"
														name="email"
														label="Email Id"
														rules={[
															{
																type: 'email',
																required: true,
																message:
																	'Please Enter valid Email Address',
															},
														]}
													>
														<Input />
													</Form.Item>
													<Form.Item
														className="signin-items"
														name="password"
														label="Password"
														rules={[
															{
																required: true,
																message:
																	'Password is Required',
															},
														]}
													>
														<Input.Password
															iconRender={(
																visible
															) =>
																visible ? (
																	<EyeTwoTone />
																) : (
																	<EyeInvisibleOutlined />
																)
															}
														/>
													</Form.Item>
												</Col>
												<Col>
													<Form.Item className="signin-button">
														<Button
															className=""
															type="primary"
															htmlType="submit"
															loading={isLoading}
														>
															Submit
														</Button>
													</Form.Item>
												</Col>
											</div>
										</Form>
									</div>
									{/* <HRBreak /> */}
									<div className="auth-alternate">
										<Link
											to="#"
											className="auth-alternate-link"
										>
											Forgotten password?
										</Link>
									</div>
									<div className="auth-alternate">
										Don't have an account?
										<Link
											to="/auth/signup"
											className="auth-alternate-link"
											style={{ paddingLeft: '10px' }}
										>
											Register
										</Link>
									</div>
								</Col>
								<Col
									className="ant-col auth-form-container-col2"
									span={!screen.md ? 24 : 2}
								>
									<div />
								</Col>
								<Col
									className="ant-col auth-form-container-col3"
									span={!screen.md ? 24 : 11}
								>
									<h3>
										Connect from your existing social
										profiles
									</h3>
									<div className="other-signin-options-container">
										<OtherSignInOption
											csname={
												'google-signin-option-button'
											}
											linkTo=""
											txt="SignIn with Google"
											icon={<GoogleOutlined />}
										/>
										<OtherSignInOption
											csname={
												'facebook-signin-option-button'
											}
											linkTo=""
											txt="SignIn with Facebook"
											icon={<FacebookFilled />}
										/>
										<OtherSignInOption
											csname={
												'linkedin-signin-option-buttom'
											}
											linkTo=""
											txt="SignIn with LinkedIn"
											icon={<LinkedinFilled />}
										/>
									</div>
								</Col>
							</Row>
						</Card>
					</div>
				</div>
			</div>
			<AuthFooter />
		</>
	);
}

export function OtherSignInOption({ csname, linkTo, txt, icon }: any) {
	return (
		<div className="other-signin-options">
			<Button
				className={csname}
				type="primary"
				htmlType="submit"
				onClick={() => <Link to={linkTo} />}
				style={{
					minHeight: '40px',
					minWidth: '220px',
					margin: '15px 0 15px 0',
					fontSize: '1.15em',
				}}
			>
				{icon}
				{txt}
			</Button>
		</div>
	);
}

export default SignIn;
