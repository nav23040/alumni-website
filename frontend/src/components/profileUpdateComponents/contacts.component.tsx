import { useState } from 'react';
import { Form, Input, Button, Select, AutoComplete, message } from 'antd';
import codes from '../../assets/country_codes';
import { updateContacts } from '../../services/api/user';
import { useSelector } from 'react-redux';

function ContactsMenu(props: any) {
	const user = useSelector((state: any) => state.authReducer.user);
	const [isLoading, setLoading] = useState(false);
	const [ccode1, setCCode1] = useState('');
	const [ccode2, setCCode2] = useState('');
	const [ccode3, setCCode3] = useState('');
	const { Option } = Select;

	const handleSubmit = (payload: any) => {
		setLoading(true);
		const mobile_num = [
			ccode1,
			payload.mobile_num?.split(' ').join(''),
		].join(' ');
		const home_phone_num = [
			ccode2,
			payload.home_phone_num?.split(' ').join(''),
		].join(' ');
		const work_phone_num = [
			ccode3,
			payload.work_phone_nums?.split(' ').join(''),
		].join(' ');
		try {
			updateContacts(
				{
					...payload,
					mobile_num: mobile_num,
					home_phone_num: home_phone_num,
					work_phone_num: work_phone_num,
				},
				user.token
			).then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					message.success('Successfully updated ');
					setLoading(false);
					window.location.reload();
				}
			});
		} catch (err) {
			setLoading(false);
			message.error(err.message);
			console.log(err.message);
		}
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

	const [contactForm] = Form.useForm();
	return (
		<div className="profileupdate-menu-wrapper">
			<div className="profileupdate-menu-head">
				<h1>Location and Contact Information</h1>
				<span>
					Please update your current location and contact details
				</span>
			</div>
			<hr />
			<Form
				className="signupCreate-form"
				form={contactForm}
				name="locationInfo"
				{...formItemLayout}
				onFinish={handleSubmit}
				labelAlign="left"
				initialValues={{ prefix: '91' }}
				scrollToFirstError
			>
				<Form.Item
					initialValue={props?.location_contact_info?.current_city}
					name="current_city"
					label="Current City"
					rules={[
						{
							required: true,
							message: 'Please select your current city',
						},
					]}
				>
					<Input placeholder="Current city" />
				</Form.Item>

				<Form.Item
					initialValue={props?.location_contact_info?.home_town}
					name="home_town"
					label="Home Town"
				>
					<Input placeholder="Home town" />
				</Form.Item>
				<div className="profileupdate-submenu-head">
					<h2>Address for correspondence</h2>
				</div>
				<hr />
				<Form.Item
					initialValue={
						props?.location_contact_info?.correspondance_address
					}
					name="corrs_address"
					label="Address"
				>
					<Input placeholder="Correspondence Address" />
				</Form.Item>
				<Form.Item
					initialValue={
						props?.location_contact_info?.correspondance_location
					}
					name="corrs_location"
					label="Location"
				>
					<Input placeholder="Correspondence Location" />
				</Form.Item>
				<Form.Item
					initialValue={
						props?.location_contact_info?.correspondance_postal_code
					}
					name="corrs_postal_code"
					label="Postal Code"
				>
					<Input placeholder="postal code" />
				</Form.Item>
				<div className="profileupdate-submenu-head">
					<h2>Contact Details</h2>
				</div>
				<hr />
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
								placeholder="Country"
								style={{ width: '20%' }}
								onChange={(val: string) =>
									setCCode1(codes[val])
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
					name="home_phone_num"
					label="Home Phone No."
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
								placeholder="Country"
								style={{ width: '20%' }}
								onChange={(val: string) =>
									setCCode2(codes[val])
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
					name="work_phone_num"
					label="Work Phone No."
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
								placeholder="Country"
								style={{ width: '20%' }}
								onChange={(val: string) =>
									setCCode3(codes[val])
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
					initialValue={
						props?.location_contact_info?.alternative_email_id[0]
					}
					name="alternate_email"
					label="Alternate Email Id"
					rules={[
						{
							type: 'email',
							message: 'Please Enter valid Email Address',
						},
					]}
				>
					<Input />
				</Form.Item>
				<div className="profileupdate-submenu-head">
					<h2>Social Profiles</h2>
				</div>
				<hr />
				<Form.Item
					initialValue={
						props?.location_contact_info?.social_profiles?.website
					}
					name="website"
					label="Website/Portfolio/Blog"
				>
					<Input />
				</Form.Item>
				<Form.Item
					initialValue={
						props?.location_contact_info?.social_profiles?.facebook
					}
					name="facebook"
					label="Facebook Profile"
				>
					<Input />
				</Form.Item>
				<Form.Item
					initialValue={
						props?.location_contact_info?.social_profiles?.linkedin
					}
					name="linkedin"
					label="LinkedIn Profile"
				>
					<Input />
				</Form.Item>
				<Form.Item
					initialValue={
						props?.location_contact_info?.social_profiles?.twitter
					}
					name="twitter"
					label="Twitter Profile"
				>
					<Input />
				</Form.Item>
				<Form.Item
					initialValue={
						props?.location_contact_info?.social_profiles?.youtube
					}
					name="youtube"
					label="Youtube Profile"
				>
					<Input />
				</Form.Item>
				<Form.Item
					initialValue={
						props?.location_contact_info?.social_profiles?.instagram
					}
					name="instagram"
					label="Instagram Profile"
				>
					<Input />
				</Form.Item>
				<div className="signupCreate-form-submit-button-div">
					<Form.Item className="profileupdate-form-submit">
						<Button
							type="primary"
							htmlType="submit"
							loading={isLoading}
						>
							Update
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
}

export default ContactsMenu;
