import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import {
	Button,
	Card,
	Form,
	Input,
	Alert,
	DatePicker,
	Radio,
	Progress,
	AutoComplete,
	Select,
} from 'antd';
import AssignmentIndSharpIcon from '@material-ui/icons/AssignmentIndSharp';
import './signupCreate.css';
import AuthFooter from '../../../../components/Footer/authFooter/authFooter.component';
import AuthNavBar from '../../../../components/Navbar/authNavBar/authNavBar.component';
import ReactCountryFlag from 'react-country-flag';
import { registerUser } from '../../../../services/api/auth';
import codes from '../../../../assets/country_codes';

export interface ILocationState {
	email: string;
	accessToken: string;
}

function SignUpCreate() {
	const [isLoading, setLoading] = useState(false);
	const [, setSalut] = useState();
	const [ccode, setCCode] = useState('');
	const history = useHistory();
	const salutation_dict: { [id: string]: string } = {
		1: 'Mr',
		2: 'Ms',
		3: 'Dr',
		4: 'Prof',
		5: 'Other',
	};
	const [, setGender] = useState();
	const gender_dict: { [id: string]: string } = {
		1: 'Male',
		2: 'Female',
		3: 'Prefer not to say',
	};
	const [error, setError] = useState('');
	const location = useLocation();
	const email: string = location.state as string;

	const [basicInfoForm] = Form.useForm();
	const { Option } = Select;

	const handleSubmit = async (payload: any) => {
		try {
			setLoading(true);
			const formBody = { ...payload };
			formBody.salutation = salutation_dict[payload.salutation as string];
			formBody.gender = gender_dict[payload.gender as string];
			formBody.date_of_birth = payload.date_of_birth.unix() * 1000;
			formBody.mobile_num = [
				ccode,
				payload.mobile_num?.split(' ').join(''),
			].join(' ');
			const res = await registerUser(formBody);
			if (res?.data?.error === true) {
				throw new Error(res.data.message);
			}
			const locState: ILocationState = {
				email: payload.email,
				accessToken: res.data.accessToken,
			};
			history.push({
				pathname: '/auth/signup/create/batch',
				state: locState,
			});
			console.log(formBody);
			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 7 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 },
		},
	};

	return email ? (
		<>
			<AuthNavBar />
			<div className="auth-view">
				<div className="auth-container-wrapper">
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
						<h1>Registration</h1>
						<span>Connect with your alumni network</span>
					</div>
					<Card className="auth-form-wrapper">
						<div className="auth-form-create-page-info">
							<Progress type="circle" percent={0} width={75} />
							<h1>
								<AssignmentIndSharpIcon
									style={{ fontSize: 40 }}
								/>
								Basic Info
							</h1>
						</div>
						<hr />
						<div className="signupCreate-form-div">
							<Form
								className="signupCreate-form"
								{...formItemLayout}
								form={basicInfoForm}
								name="register"
								onFinish={handleSubmit}
								labelAlign="left"
								initialValues={{ prefix: '91' }}
								scrollToFirstError
							>
								<Form.Item
									initialValue={email}
									className="signupCreate-form-email"
									name="email"
									tooltip="This email will be used as login email Id"
									label="Primary Email Id"
									rules={[
										{
											type: 'email',
											required: true,
											message:
												'Please Enter valid Email Address',
										},
									]}
								>
									<Input disabled />
								</Form.Item>
								<Form.Item
									name="salutation"
									label="Salutation"
									rules={[{ required: true }]}
								>
									<Radio.Group
										onChange={(e) => {
											setSalut(e.target.value);
										}}
									>
										<Radio value={1}>Mr</Radio>
										<Radio value={2}>Ms</Radio>
										<Radio value={3}>Dr</Radio>
										<Radio value={4}>Prof</Radio>
										<Radio value={5}>Other</Radio>
									</Radio.Group>
								</Form.Item>
								<Form.Item
									name="first_name"
									label="First Name"
									rules={[
										{
											required: true,
											message:
												'Please input your First Name',
										},
									]}
								>
									<Input placeholder="First Name" />
								</Form.Item>

								<Form.Item
									name="last_name"
									label="Last Name"
									rules={[
										{
											required: true,
											message:
												'Please input your Last Name',
										},
									]}
								>
									<Input placeholder="Last Name" />
								</Form.Item>

								<Form.Item
									name="gender"
									label="Gender"
									rules={[{ required: true }]}
								>
									<Radio.Group
										onChange={(e) =>
											setGender(e.target.value)
										}
									>
										<Radio value={1}>Male</Radio>
										<Radio value={2}>Female</Radio>
										<Radio value={3}>
											Prefer not to say
										</Radio>
									</Radio.Group>
								</Form.Item>

								<Form.Item
									name="date_of_birth"
									label="Date of Birth"
									rules={[
										{
											required: true,
											message: 'Please select your DOB!',
										},
									]}
								>
									<DatePicker />
								</Form.Item>
								<Form.Item
									name="mobile_num"
									label="Mobile No."
									rules={[
										{
											required: true,
											message:
												'Please input your mobile number!',
										},
										{
											max: 10,
											message:
												'Input valid Mobile Number',
										},
									]}
								>
									<div className="mobile-num">
										<Input.Group compact>
											<Select
												showSearch
												className="mobile-num-selector"
												placeholder="--"
												style={{ width: '20%' }}
												onChange={(val: string) =>
													setCCode(codes[val])
												}
											>
												{Object.entries(codes).map(
													([key, val]) => (
														<Option value={key}>
															<>
																<ReactCountryFlag
																	countrtCode={
																		key
																	}
																/>
																{[
																	key,
																	[
																		'(',
																		val,
																		')',
																	].join(''),
																].join(' ')}
															</>
														</Option>
													)
												)}
											</Select>
											<Input
												placeholder="0123456789"
												style={{ width: '70%' }}
											/>
										</Input.Group>
									</div>
								</Form.Item>
								<Form.Item
									name="current_city"
									label="Current City"
									rules={[
										{
											required: true,
											message:
												'Please select your current city!',
										},
									]}
								>
									<AutoComplete
										className="city-search-autocomplete"
										placeholder="Type to search"
									/>
								</Form.Item>
								<Form.Item
									className="signupCreate-form-password"
									name="password"
									label="Password"
									rules={[
										{
											required: true,
											message: 'Please enter password',
										},
									]}
								>
									<Input.Password />
								</Form.Item>
								<div className="signupCreate-form-submit-button-div">
									<Form.Item className="signupCreate-form-submit">
										<Button
											type="primary"
											htmlType="submit"
											loading={isLoading}
										>
											Submit
										</Button>
									</Form.Item>
								</div>
							</Form>
						</div>
					</Card>
				</div>
			</div>
			<AuthFooter />
		</>
	) : (
		<Redirect to={'/auth/signup'} />
	);
}

export default SignUpCreate;
