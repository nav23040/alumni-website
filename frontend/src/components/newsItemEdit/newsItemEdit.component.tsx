import { useState } from 'react';
import { Form, Input, Button, Grid, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MDEditor from '../MDEditor/mdEditor.component';
import { submitAPost, updateAPost } from '../../services/api/newsroom';
import './newsItemEdit.component.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

const { useBreakpoint } = Grid;

const fileToBase = (file: any) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(file);
	});
};

function NewsItemEdit() {
	const { md } = useBreakpoint();
	const history = useHistory();
	const loc = useLocation();
	const props: any = loc.state;
	const user = useSelector((state: any) => state.authReducer.user);
	const [text, setText] = useState<string>('');
	const [thumbFile, setThumbFile] = useState<any>(null);
	const handleSubmit = async (payload: any) => {
		try {
			setLoading(true);
			let tfile = null;
			if (thumbFile) {
				tfile = await fileToBase(thumbFile);
			}
			if (!props) {
				const res = await submitAPost(
					{ ...payload, thumbnail: tfile },
					user.token
				);
				if (res.data.error) {
					throw new Error(res.data.error);
				}
			} else {
				const res = await updateAPost(
					{ ...props, ...payload, thumbnail: tfile },
					user.token
				);
				if (res.data.error) {
					throw new Error(res.data.error);
				}
			}
			setLoading(false);
			history.push('/newsroom');
		} catch (err) {
			setLoading(false);
			console.log(err.message);
		}
	};
	const [isLoading, setLoading] = useState(false);

	const fileUploadProps = {
		accept: '.png,.jpg,.jpeg',
		maxCount: 1,
		multiple: false,
		onRemove: (_file: any) => {
			setThumbFile(null);
			return true;
		},
		beforeUpload: (file: any) => {
			setThumbFile(file);
			return false;
		},
		filelist: thumbFile,
	};

	const [form] = Form.useForm();
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
	return (
		<div className="newsItemEdit-container">
			<div className="newsroom-head">
				<h1>Post New Story on newsroom</h1>
				<hr />
			</div>
			<Form
				className="createNews"
				{...formItemLayout}
				layout={md ? 'horizontal' : 'vertical'}
				form={form}
				autoComplete="off"
				onFinish={handleSubmit}
			>
				<Form.Item
					initialValue={props?.title}
					className="createNews-title"
					name="title"
					label="Title"
					rules={[
						{
							required: true,
							message: 'Please type the title',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					initialValue={props?.overview}
					className="createNews-title"
					name="overview"
					label="Brief overview"
					rules={[
						{
							required: true,
							message: 'Please type the title',
						},
					]}
				>
					<Input.TextArea />
				</Form.Item>
				<Form.Item
					className="createNews-title"
					name="thumbnail"
					label="Image Thumbnail"
					rules={[
						{
							required: false,
						},
					]}
				>
					<Upload {...fileUploadProps}>
						<Button icon={<UploadOutlined />}>Select File</Button>
					</Upload>
					<br />
					<span className="beamentor-upload-info">
						<span style={{ color: 'red' }}>*</span>(Allowed file
						types: .png,.jpg,.jpeg)
					</span>
					<br />
					<span className="beamentor-upload-info">
						<span style={{ color: 'red' }}>*</span>(File size should
						be less than 10 MB)
					</span>
				</Form.Item>
				<Form.Item
					initialValue={props?.body}
					className="createNews-body"
					name="body"
					label="Body"
					rules={[
						{
							required: true,
							message: 'Please type the body',
						},
					]}
				>
					<MDEditor value={text} onChange={setText} />
				</Form.Item>
				<Form.Item
					initialValue={props?.tags}
					className="createNews-title"
					name="tags"
					label="Tags"
					rules={[
						{
							required: false,
						},
					]}
				>
					<Input placeholder={'Ex: tag1;tag2;tag3'} />
					{/* <span className="beamentor-upload-info">
						Type tags with semicolon in between two tags
					</span> */}
				</Form.Item>
				<div className="signupCreate-form-submit-button-div">
					<Form.Item className="newsForm-submit">
						<Button
							type="primary"
							htmlType="submit"
							loading={isLoading}
						>
							Post
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
}

export default NewsItemEdit;
