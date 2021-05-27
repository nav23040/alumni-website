import { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, Alert } from 'antd';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import './contactUs.css';
import TextArea from 'antd/lib/input/TextArea';

function ContactUs() {
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState('');

	const handleSubmit = async (payload: any) => {
		try {
			setLoading(true);
			console.log(payload);
			// TODO: API call and send data to backend
			setLoading(false);
		} catch (err) {
			setErrors(err.message);
			setLoading(false);
		}
	};

	const [form] = Form.useForm();

	return (
		<div className="contact-container">
			<div className="contact-body">
				<div className="contact-head">
					<h1>Contact Us</h1>
					<hr />
				</div>
				<div className="contact-details">
					<p>
						{' '}
						Our Alumni Relations representatives are available
						Monday – Friday, 9 AM – 5 PM IST, to assist with any
						inquiries. If you have any query, let us know through
						the form below.{' '}
					</p>
				</div>
				<div className="contact-methods">
					<Row className="contact-methods-row">
						<Col className="contact-methods-col">
							<Card className="contact-methods-card">
								<div className="card-head">
									<MailOutlineIcon
										style={{
											fontSize: 25,
											color: '#375997',
										}}
									/>
									<h2> Message Us </h2>
								</div>
								<p>
									Send us a message at{' '}
									<a href="mailto:alumni@iitrpr.ac.in">
										alumni@iitrpr.ac.in
									</a>{' '}
									or via the form below.
								</p>
							</Card>
						</Col>
						<Col>
							<Card className="contact-methods-card">
								<div className="card-head">
									<LocationOnOutlinedIcon
										style={{
											fontSize: 25,
											color: '#375997',
										}}
									/>
									<h2>Visit us at Office</h2>
								</div>
								<p>
									We’d love to see you whenever you’re on
									campus.
								</p>
							</Card>
						</Col>
						<Col>
							<Card className="contact-methods-card">
								<div className="card-head">
									<PhoneIcon
										style={{
											fontSize: 25,
											color: '#375997',
										}}
									/>
									<h2>Phone</h2>
								</div>
								<p>Call us at (+91) 01881 242305.</p>
							</Card>
						</Col>
					</Row>
				</div>
				<hr />
				<div className="contact-query-form">
					<Form
						layout="vertical"
						form={form}
						autoComplete="off"
						onFinish={handleSubmit}
					>
						<Row className="contact-query-form-row">
							<Col className="contact-query-form-col">
								<Form.Item
									className="contact-form-formitem"
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
							<Col className="contact-query-form-col">
								<Form.Item
									className="contact-form-formitem"
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
						<Row className="contact-query-form-row">
							<Col className="contact-query-form-col">
								<Form.Item
									className="contact-form-formitem"
									name="email"
									label="Email Id"
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
							<Col className="contact-query-form-col">
								<Form.Item
									className="contact-form-formitem"
									name="contactno"
									label="Contact No."
									rules={[
										{
											required: false,
											message:
												'Please input your contact no.!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Form.Item
							className="contact-form-formitem"
							name="subject"
							label="Subject"
							rules={[
								{
									required: true,
									message: 'Please type your subject!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className="contact-form-formitem"
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
						<div className="contact-form-buttom">
							<Form.Item className="contact-form-formitem">
								<Button
									className="contact-form-formitem-submit"
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
			</div>
		</div>
	);
}

export default ContactUs;
