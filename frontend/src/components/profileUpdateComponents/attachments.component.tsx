import { useEffect, useState } from 'react';
import {
	Form,
	Input,
	Button,
	Select,
	Upload,
	message,
	Tag,
	Grid,
	Col,
	Row,
	Divider,
	Spin,
} from 'antd';
import {
	UploadOutlined,
	DownloadOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
	deleteAttach,
	getAllAttach,
	postAttach,
} from '../../services/api/user';
import { useHistory } from 'react-router-dom';

const { useBreakpoint } = Grid;

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

function AttachmentsMenu(props: any) {
	const [form] = Form.useForm();
	const [isLoading, setLoading] = useState(false);
	const user = useSelector((state: any) => state.authReducer.user);
	const [file, setFile] = useState<any>(null);
	const [attachType, setAttachType] = useState('Resume');
	const [attachs, setAttachs] = useState<any>(null);
	const attachTypes: string[] = [
		'Resume',
		'Published work',
		'Other documents',
	];
	const { Option } = Select;

	const formItemLayout = {
		labelCol: {
			xs: { span: 16 },
			sm: { span: 5 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 12 },
		},
	};

	const fileUploadProps = {
		maxCount: 1,
		multiple: true,
		accept: '.doc,.docx,.pdf',
		onRemove: (_file: any) => {
			setFile(null);
			return true;
		},
		beforeUpload: (file: any) => {
			setFile(file);
			return false;
		},
		filelist: file,
	};

	useEffect(() => {
		getAllAttach(user.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					setAttachs(res?.data?.attachs);
				}
			})
			.catch((err) => console.log(err.message));
	}, []);

	const handleSubmit = async (payload: any) => {
		try {
			setLoading(true);
			if (!file) {
				throw new Error('No file selected!');
			}
			const f: any = await fileToBase(file);
			console.log({ ...payload, attachment: f?.data });
			const res = await postAttach(
				{ ...payload, attachment: f?.data },
				user.token
			);
			if (res.data.error) {
				throw new Error(res.data.message);
			} else {
				message.success('Successfully added attachment');
				setLoading(false);
				window.location.reload();
			}
			// setLoading(false);
		} catch (err) {
			message.error(err.message);
			setLoading(false);
			console.log(err.message);
		}
	};

	return (
		<div className="profileupdate-menu-wrapper">
			<div className="profileupdate-menu-head">
				<h1>Attachements</h1>
				<span>
					Manage Attachments like Resume, published work, documents
					etc.
				</span>
			</div>
			<hr />
			<div className="attachinfo-cards">
				{attachs ? (
					attachs.map((item: any, idx: any) => (
						<AttachCard
							title={item.title}
							type={item.attachment_type}
							link={item.attachement}
							_id={item.id}
							user={user}
							key={idx}
						/>
					))
				) : (
					<Spin />
				)}
			</div>
			<Divider>Add a new attachment</Divider>
			<div className="profileupdate-menu-form">
				<Form
					className="attach-form"
					form={form}
					name="basicProfile"
					{...formItemLayout}
					onFinish={handleSubmit}
					labelAlign="left"
					initialValues={{ prefix: '91' }}
					scrollToFirstError
				>
					<Form.Item
						name="title"
						label="Title"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input placeholder="Title" />
					</Form.Item>

					<Form.Item
						name="attach_type"
						label="Attachment Type"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select
							className="mobile-num-selector"
							placeholder="type"
							onChange={(newType: string) =>
								setAttachType(newType)
							}
						>
							{attachTypes.map(
								(element: string, index: number) => (
									<Option value={element} key={index}>
										{element}
									</Option>
								)
							)}
						</Select>
					</Form.Item>

					<Form.Item
						name="attachment"
						label="Attachment"
						help={`(Allowed file types: .doc,.docx,.pdf)`}
						tooltip="(File size should
							be less than 2 MB)"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Upload {...fileUploadProps}>
							<Button icon={<UploadOutlined />}>
								Select File
							</Button>
						</Upload>
					</Form.Item>

					<div className="signupCreate-form-submit-button-div">
						<Form.Item className="profileupdate-form-submit">
							<Button
								type="primary"
								htmlType="submit"
								loading={isLoading}
							>
								Upload
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</div>
	);
}

function AttachCard(props: any) {
	const { md } = useBreakpoint();
	const history = useHistory();
	const handleRemove = () => {
		deleteAttach(props._id, props.user.token).then((res: any) => {
			if (res?.data?.error) {
				throw new Error(res?.data?.message);
			} else {
				window.location.reload();
			}
		});
	};
	return (
		<Col span={md ? 16 : 24} className="attachcard-wrapper">
			<Row className="attachcard">
				<Col span={md ? 16 : 24} className="attachcard-col1">
					<span>{props.title}</span>
					<Tag color="green">{props.type} </Tag>
				</Col>
				<Col span={md ? 8 : 24} className="attachcard-col">
					<Button
						type="text"
						href={props.link}
						target="_blank"
						download={props.title + '.' + props.link.type}
					>
						<DownloadOutlined style={{ fontSize: '1.4em' }} />
					</Button>
					<Button danger={true} type="text" onClick={handleRemove}>
						<DeleteOutlined style={{ fontSize: '1.4em' }} />
					</Button>
				</Col>
			</Row>
		</Col>
	);
}

export default AttachmentsMenu;
