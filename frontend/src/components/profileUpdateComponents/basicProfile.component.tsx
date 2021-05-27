import { useEffect, useState } from 'react';
import {
	Form,
	Input,
	Button,
	Radio,
	DatePicker,
	Select,
	AutoComplete,
	message,
} from 'antd';
import codes from '../../assets/country_codes';
import { getMyInfo, updateBasic } from '../../services/api/user';
import { useSelector } from 'react-redux';
import moment from 'moment';

function BasicProfileMenu(props: any) {
	const user = useSelector((state: any) => state.authReducer.user);
	const [form] = Form.useForm();
	const [, setSalut] = useState();
	const [ccode, setCCode] = useState('');
	const [, setGender] = useState();

	const { Option } = Select;

	const handleSubmit = (payload: any) => {
		const dob = payload.date_of_birth.unix() * 1000;
		const mob = [ccode, payload.mobile_num?.split(' ').join('')].join(' ');
		updateBasic(
			{
				...payload,
				mobile_num: mob,
				date_of_birth: dob,
			},
			user.token
		)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					message.success('Successfully Updated Basic info.');
					window.location.reload();
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
			});
	};

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

	return (
		<div className="profileupdate-menu-wrapper">
			<div className="profileupdate-menu-head">
				<h1>Basic profile</h1>
				<span>Please update profile details below</span>
			</div>
			<hr />
			<div className="profileupdate-menu-form">
				<Form
					className="signupCreate-form"
					form={form}
					name="basicProfile"
					{...formItemLayout}
					onFinish={handleSubmit}
					labelAlign="left"
					initialValues={{ prefix: '91' }}
					scrollToFirstError
				>
					<Form.Item
						initialValue={props?.basic_info?.salutation}
						name="salutation"
						label="Salutation"
					>
						<Radio.Group
							onChange={(e) => {
								setSalut(e.target.value);
							}}
						>
							<Radio value={'Mr'}>Mr</Radio>
							<Radio value={'Ms'}>Ms</Radio>
							<Radio value={'Dr'}>Dr</Radio>
							<Radio value={'Prof'}>Prof</Radio>
							<Radio value={'Other'}>Other</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						initialValue={props?.basic_info?.first_name}
						name="first_name"
						label="First Name"
						rules={[
							{
								required: true,
								message: 'Please input your First Name',
							},
						]}
					>
						<Input placeholder="First Name" />
					</Form.Item>

					<Form.Item
						initialValue={props?.basic_info.last_name}
						name="last_name"
						label="Last Name"
						rules={[
							{
								required: true,
								message: 'Please input your Last Name',
							},
						]}
					>
						<Input placeholder="Last Name" />
					</Form.Item>

					<Form.Item
						initialValue={props?.basic_info?.gender}
						name="gender"
						label="Gender"
					>
						<Radio.Group
							onChange={(e) => setGender(e.target.value)}
						>
							<Radio value={'Male'}>Male</Radio>
							<Radio value={'Female'}>Female</Radio>
							<Radio value={'Prefer not to say'}>
								Prefer not to say
							</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item
						initialValue={
							props?.basic_info?.date_of_birth
								? moment.unix(
										props?.basic_info?.date_of_birth / 1000
								  )
								: null
						}
						name="date_of_birth"
						label="Date of Birth"
					>
						<DatePicker />
					</Form.Item>
					<Form.Item
						name="mobile_num"
						label="Mobile No."
						rules={[
							{
								max: 10,
								message: 'Input valid Mobile Number',
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
									{Object.entries(codes).map(([key, val]) => (
										<Option key={key} value={key}>
											<>
												{[
													key,
													['(', val, ')'].join(''),
												].join(' ')}
											</>
										</Option>
									))}
								</Select>
								<Input
									placeholder="0123456789"
									style={{ width: '70%' }}
								/>
							</Input.Group>
						</div>
					</Form.Item>
					<Form.Item
						initialValue={props?.location_contact_info.current_city}
						name="current_city"
						label="Current City"
						rules={[
							{
								required: true,
								message: 'Please select your current city!',
							},
						]}
					>
						<AutoComplete
							className="city-search-autocomplete"
							placeholder="Type to search"
						/>
					</Form.Item>
					<div className="signupCreate-form-submit-button-div">
						<Form.Item className="profileupdate-form-submit">
							<Button
								type="primary"
								htmlType="submit"
								loading={props.isLoading}
							>
								Submit
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default BasicProfileMenu;
