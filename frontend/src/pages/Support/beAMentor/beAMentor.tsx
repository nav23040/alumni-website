import { useState } from 'react';
import { Row, Col, Form, Input, Button, Alert, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './beAMentor.css';

function BeAMentor() {
	const [fileList, updateFileList] = useState([] as any);
	const [img, setImage] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState<any>(undefined);

	const fileToBase = (file: any) => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = () => {
				console.log(file);
				resolve({
					name: file.name,
					file_type: file.type,
					data: reader.result,
					size: file.size,
				});
			};
			reader.readAsDataURL(file);
		});
	};

	const handleSubmit = async (payload: any) => {
		try {
			setLoading(true);
			const payloadFile: Array<any> = [];
			for (let i = 0; i < fileList.length; i++) {
				const res = await fileToBase(fileList[i]);
				payloadFile.push(res);
			}
			// TODO: API call and send data to backend
			console.log(payloadFile[0].data);
			setLoading(false);
		} catch (err) {
			setErrors(err.message);
			setLoading(false);
		}
	};

	const fileUploadProps = {
		accept: '.doc,.docx,.pdf,.png,.jpg,.jpeg,.zip',
		onRemove: (file: any) => {
			const index = fileList.indexOf(file, 0);
			const newFileList = fileList;
			newFileList.splice(index, 1);
			updateFileList(newFileList);
			return true;
		},
		beforeUpload: (file: any) => {
			updateFileList([...fileList, file]);
			return false;
		},
		fileList,
	};

	const [form] = Form.useForm();
	return (
		<div className="beamentor-container">
			<div className="beamentor-body">
				<div className="beamentor-head">
					<h1>Become A Mentor</h1>
					<hr />
				</div>
				<div className="beamentor-details">
					<p>
						{' '}
						Kindly Fill this form to express your interest to be a
						mentor. We'll be contacting you soon.{' '}
					</p>
				</div>
				<hr />
				<div className="beamentor-form">
					<Form
						layout="vertical"
						form={form}
						autoComplete="off"
						onFinish={handleSubmit}
					>
						<Row className="beamentor-form-row">
							<Col className="beamentor-form-col">
								<Form.Item
									className="beamentor-formitem"
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
							<Col className="beamentor-form-col">
								<Form.Item
									className="beamentor-formitem"
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
						<Row className="beamentor-form-row">
							<Col className="beamentor-form-col">
								<Form.Item
									className="beamentor-formitem"
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
									className="beamentor-formitem"
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
						<Row className="beamentor-form-row">
							<Col className="beamentor-form-col">
								<Form.Item
									className="beamentor-formitem"
									name="area_of_expertise"
									label="Area of Expertise"
									rules={[
										{
											required: true,
											message:
												'Please type your Area of Expertise!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col>
								<Form.Item
									className="beamentor-formitem"
									name="time_u_can_spend"
									label="Time you can spend"
									rules={[
										{
											required: true,
											message:
												'Please provide your availability!',
										},
									]}
								>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Form.Item
							className="beamentor-formitem"
							name="message"
							label="Message"
							rules={[
								{
									required: true,
									message: 'Please type your message!',
								},
							]}
						>
							<Input.TextArea rows={4} />
						</Form.Item>
						<Form.Item
							className="beamentor-formitem"
							name="attachment"
							label="Attachment"
							rules={[
								{
									required: false,
								},
							]}
						>
							{/* TODO: implement the upload functionality */}
							<Upload {...fileUploadProps}>
								<Button icon={<UploadOutlined />}>
									Select File
								</Button>
							</Upload>
							<br />
							<span className="beamentor-upload-info">
								<span style={{ color: 'red' }}>*</span>(Allowed
								file types:
								.doc,.docx,.pdf,.png,.jpg,.jpeg,.zip)
							</span>
							<br />
							<span className="beamentor-upload-info">
								<span style={{ color: 'red' }}>*</span>(File
								size should be less than 10 MB)
							</span>
						</Form.Item>
						<Form.Item className="beamentor-formitem">
							<Button
								className="beamentor-formitem-submit"
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

export default BeAMentor;
