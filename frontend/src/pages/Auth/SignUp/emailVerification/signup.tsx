import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Form, Input, Col, Grid, Row, Alert } from 'antd';
import { verifyEmail } from '../../../../services/api/auth';
import './signup.css';
import '../../auth.css';
import {
	GoogleOutlined,
	LinkedinFilled,
	FacebookFilled,
} from '@ant-design/icons';
import AuthFooter from '../../../../components/Footer/authFooter/authFooter.component';
import AuthNavBar from '../../../../components/Navbar/authNavBar/authNavBar.component';
import { OtherSignInOption } from '../../SignIn/signin';

function SignUp() {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const history = useHistory();
	const screen = Grid.useBreakpoint();

	const handleSubmit = async (payload: any) => {
		try {
			setLoading(true);
			const res = await verifyEmail({ email: payload.email });
			if (res?.data?.error === true) {
				throw new Error(res.data.message);
			}
			history.push({
				pathname: '/auth/signup/create',
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
					<div className="signup-wrapper">
						{error ? (
							<Alert
								className="signup-error"
								message={error}
								type="error"
								closable
								onClose={() => setError('')}
							/>
						) : null}
						<div className="signup-head">
							<h1>Register</h1>
							<span>Connect with your alumni network</span>
						</div>
						<Card className="auth-form-container">
							<Row className="auth-form-container-row1">
								<Col
									className="auth-form-container-col1"
									span={!screen.md ? 24 : 11}
								>
									<div className="signup-email-check">
										<Form
											layout="vertical"
											form={checkEmail}
											autoComplete="off"
											onFinish={handleSubmit}
										>
											<div className="signup-email-check-items">
												<Col
													span={!screen.md ? 24 : 20}
												>
													<Form.Item
														className="email-check"
														name="email"
														label="Please enter your Primary Email Id"
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
												</Col>
												<Col>
													<Form.Item className="email-check-button">
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
										Have An Account?
										<Link
											to="/auth/signin"
											className="auth-alternate-link"
											style={{ paddingLeft: '10px' }}
										>
											Login
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
										Join from your existing social
										profiles
									</h3>
									<div className="other-signin-options-container">
										<OtherSignInOption
											csname={
												'google-signin-option-button'
											}
											linkTo=""
											txt="SignUp with Google"
											icon={<GoogleOutlined />}
										/>
										<OtherSignInOption
											csname={
												'facebook-signin-option-button'
											}
											linkTo=""
											txt="SignUp with Facebook"
											icon={<FacebookFilled />}
										/>
										<OtherSignInOption
											csname={
												'linkedin-signin-option-buttom'
											}
											linkTo=""
											txt="SignUp with LinkedIn"
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

export function HRBreak() {
	return (
		<div className="hrbreak">
			<div className="left-hr"></div>
			<div className="or-text">OR</div>
			<div className="right-hr"></div>
		</div>
	);
}

export function HR() {
	return <div className="hr"></div>;
}

export default SignUp;
