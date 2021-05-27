import {
	Form,
	Input,
	Button,
	Select,
	Grid,
	Col,
	Row,
	Divider,
	DatePicker,
	message,
	Modal,
	Spin,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
	addEduInfo,
	deleteEduInfo,
	getMyEduInfo,
	updateEduInfo,
} from '../../services/api/user';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { useBreakpoint } = Grid;

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

function EducationalMenu(props: any) {
	const user = useSelector((state: any) => state.authReducer.user);
	const [form] = Form.useForm();
	const { Option } = Select;
	const [eds, setEds] = useState<any>(null);

	useEffect(() => {
		getMyEduInfo(user?.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					setEds(res?.data?.edu_info);
				}
			})
			.catch((err: any) => console.log(err.message));
	}, []);

	const handleSubmit = (payload: any) => {
		const start = payload.start_date.unix() * 1000;
		const end = payload.end_date.unix() * 1000;
		addEduInfo({ ...payload, start_date: start, end_date: end }, user.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					message.success('Successfully added education info.');
					window.location.reload();
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
			});
	};

	return (
		<div className="profileupdate-menu-wrapper">
			<div className="profileupdate-menu-head">
				<h1>Educational Details</h1>
				<span>Add or update your educational details.</span>
			</div>
			<hr />
			<div className="eduinfo-card">
				{eds ? (
					eds.map((ed: any, idx: any) => (
						<EduCard key={idx} {...ed} token={user.token} />
					))
				) : (
					<Spin />
				)}
			</div>
			<Divider>Add a new Education Entry</Divider>
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
						name="name_of_organization"
						label="Institute Name"
						rules={[
							{
								required: true,
								message: 'Please input the institute name',
							},
						]}
					>
						<Input placeholder="Institute Name" />
					</Form.Item>

					<Form.Item
						name="degree_name"
						label="Degree"
						rules={[
							{
								required: true,
								message: 'Please input your Degree Name',
							},
						]}
					>
						<Input placeholder="Degree Name" />
					</Form.Item>

					<Form.Item
						name="stream_name"
						label="Stream"
						rules={[
							{
								required: true,
								message: 'Please input your Stream Name',
							},
						]}
					>
						<Input placeholder="Stream Name" />
					</Form.Item>

					<Form.Item
						name="start_date"
						label="Start Date"
						rules={[{ required: true }]}
					>
						<DatePicker />
					</Form.Item>

					<Form.Item
						name="end_date"
						label="End Date(expected/left)"
						rules={[{ required: true }]}
					>
						<DatePicker />
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

function EduCard(props: any) {
	const { md } = useBreakpoint();
	const batch = moment.unix(props.end_date / 1000).format('YYYY');
	const handleRemove = (id: any) => {
		deleteEduInfo(id, props.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					message.success('Successfully removed Education info');
					window.location.reload();
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
			});
	};

	const handleEdit = (payload: any) => {
		const start = payload.start_date.unix() * 1000;
		const end = payload.end_date.unix() * 1000;
		updateEduInfo(
			{ ...props, ...payload, start_date: start, end_date: end },
			props.token
		)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					setVisible(false);
					message.success('Successfully updated Education info');
					window.location.reload();
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
			});
	};

	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	return (
		<Col span={md ? 16 : 24} className="educard-wrapper">
			<Row className="educard-row">
				<Col span={md ? 16 : 24} className="educard-col1">
					<h4>{props.name_of_organization}</h4>
					<p>
						{props.degree_name +
							' - ' +
							props.stream_name +
							' - ' +
							batch}
					</p>
				</Col>
				<Col span={md ? 8 : 24} className="educard-col">
					<Button
						disabled={!props.editable}
						type="text"
						onClick={() => setVisible(true)}
					>
						<EditOutlined style={{ fontSize: '1.3em' }} />
					</Button>
					<Button
						disabled={!props.editable}
						danger={true}
						type="text"
						onClick={() => handleRemove(props.id)}
					>
						<DeleteOutlined style={{ fontSize: '1.3em' }} />
					</Button>
				</Col>
				<Modal
					visible={visible}
					title={'Education Edit'}
					onOk={form.submit}
					width={1000}
					onCancel={() => setVisible(false)}
				>
					<div className="profileupdate-menu-form">
						<Form
							className="signupCreate-form"
							layout={md ? 'horizontal' : 'vertical'}
							form={form}
							name="basicProfile"
							{...formItemLayout}
							onFinish={handleEdit}
							labelAlign="left"
							initialValues={{ prefix: '91' }}
							scrollToFirstError
						>
							<Form.Item
								initialValue={props?.name_of_organization}
								name="name_of_organization"
								label="Institute Name"
								rules={[
									{
										required: true,
										message:
											'Please input the institute name',
									},
								]}
							>
								<Input placeholder="Institute Name" />
							</Form.Item>

							<Form.Item
								initialValue={props?.degree_name}
								name="degree_name"
								label="Degree"
								rules={[
									{
										required: true,
										message:
											'Please input your Degree Name',
									},
								]}
							>
								<Input placeholder="Degree Name" />
							</Form.Item>

							<Form.Item
								initialValue={props?.stream_name}
								name="stream_name"
								label="Stream"
								rules={[
									{
										required: true,
										message:
											'Please input your Stream Name',
									},
								]}
							>
								<Input placeholder="Stream Name" />
							</Form.Item>

							<Form.Item
								initialValue={moment.unix(
									props?.start_date / 1000
								)}
								name="start_date"
								label="Start Date"
								rules={[{ required: true }]}
							>
								<DatePicker />
							</Form.Item>

							<Form.Item
								initialValue={moment.unix(
									props?.end_date / 1000
								)}
								name="end_date"
								label="End Date(expected/left)"
								rules={[{ required: true }]}
							>
								<DatePicker />
							</Form.Item>
						</Form>
					</div>
				</Modal>
			</Row>
		</Col>
	);
}

export default EducationalMenu;
