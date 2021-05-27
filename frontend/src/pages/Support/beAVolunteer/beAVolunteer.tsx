import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Row, Col, Form, Input, Button, Alert, Upload } from 'antd';
import './beAVolunteer.css';

function BeAVolunteer() {
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState('');

	const handleSubmit = async (payload: any) => {
		try {
			setLoading(true);
			// TODO: API call and send data to backend
			setLoading(false);
		} catch (err) {
			setErrors(err.message);
			setLoading(false);
		}
	};

	const [form] = Form.useForm();
	return (
		<div className="beavolunteer-container">
			<div className="beavolunteer-body">
				<div className="beavolunteer-head">
					<h1>Become A Volunteer</h1>
					<hr />
				</div>
				<div className="beavolunteer-details">
					<p>
						{' '}
						Kindly Fill this form to express your interest to be a
						volunteer. We'll be contacting you soon.{' '}
					</p>
				</div>
				<hr />
				<div className="beavolunteer-form">
					<Form
						layout="vertical"
						form={form}
						autoComplete="off"
						onFinish={handleSubmit}
					>
						<Row className="beavolunteer-form-row">
							<Col className="beavolunteer-form-col">
								<Form.Item
									className="beavolunteer-formitem"
									name="firstname"
									label="First Name"
									rules={[
										{
											required: true,
											message:
												'Please input your Firstname!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col className="beavolunteer-form-col">
								<Form.Item
									className="beavolunteer-formitem"
									name="lastname"
									label="Last Name"
									rules={[
										{
											required: false,
											message:
												'Please input your lastname!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row className="beavolunteer-form-row">
							<Col className="beavolunteer-form-col">
								<Form.Item
									className="beavolunteer-formitem"
									name="email"
									label="Personal Email Id"
									rules={[
										{
											required: true,
											message: 'Please input your email!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col>
								<Form.Item
									className="beavolunteer-formitem"
									name="contactno"
									label="Contact No."
									rules={[
										{
											required: true,
											message:
												'Please input your contact no.!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row className="beavolunteer-form-row">
							<Col className="beavolunteer-form-col">
								<Form.Item
									className="beavolunteer-formitem"
									name="area_of_expertise"
									label="Area of Expertise"
									rules={[
										{
											required: false,
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col>
								<Form.Item
									className="beavolunteer-formitem"
									name="interest"
									label="Interest"
									rules={[
										{
											required: false,
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Form.Item
							className="beavolunteer-formitem"
							name="time_u_can_spend"
							label="Time you can spend"
							rules={[
								{
									required: false,
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className="beavolunteer-formitem"
							name="message"
							label="Message"
							rules={[
								{
									required: true,
									message: 'Please type your message!',
								},
							]}
						>
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item className="beavolunteer-formitem">
							<Button
								className="beavolunteer-formitem-submit"
								type="primary"
								htmlType="submit"
								loading={isLoading}
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default BeAVolunteer;
