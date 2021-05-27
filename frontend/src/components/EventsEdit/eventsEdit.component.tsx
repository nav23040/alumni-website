import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Select, Button, DatePicker, Grid } from 'antd';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MDEditor from '../MDEditor/mdEditor.component';
import { createNewEvent, updateEvent } from '../../services/api/event';
import { useHistory, useLocation } from 'react-router-dom';
import './eventsEdit.component.css';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		rootm: {
			maxWidth: 345,
		},
		media: {
			height: 140,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	})
);

const { Option } = Select;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const { useBreakpoint } = Grid;

function Event() {
	const global_state = useSelector((state: any) => state.authReducer.user);
	const [desc, setDesc] = useState('');
	const classes = useStyles();
	const history = useHistory();
	const loc = useLocation();
	const props: any = loc.state;
	const [isLoading, setLoading] = useState(false);

	const [form] = Form.useForm();

	const onFinish = (payload: any) => {
		setLoading(true);
		const start = payload.event_start.unix() * 1000;
		const end = payload.event_end.unix() * 1000;
		if (!props) {
			createNewEvent(
				{ ...payload, event_start: start, event_end: end },
				global_state.token
			)
				.then((res: any) => {
					if (res.data.error) {
						throw new Error(res.data.message);
					} else {
						setLoading(false);
						history.push('/events');
						console.log(res);
					}
				})
				.catch((err: any) => {
					setLoading(false);
					console.log(err.message);
				});
		} else {
			updateEvent(
				{ ...props, ...payload, event_start: start, event_end: end },
				global_state.token
			)
				.then((res: any) => {
					if (res.data.error) {
						throw new Error(res.data.message);
					} else {
						setLoading(false);
						history.push('/events');
						console.log(res);
					}
				})
				.catch((err: any) => {
					setLoading(false);
					console.log(err.message);
				});
		}
	};

	const { md } = useBreakpoint();
	return (
		<div className="event-container">
			<div className="register-body">
				<div className={classes.root}>
					<div className="register-head">
						<h1>Enter Event Details</h1>
						<hr />
					</div>

					<Form
						{...formItemLayout}
						layout={md ? 'horizontal' : 'vertical'}
						form={form}
						name="event-edit"
						onFinish={onFinish}
						labelAlign="left"
						initialValues={{
							prefix: '91',
						}}
						scrollToFirstError
					>
						<Form.Item
							initialValue={props?.event_category}
							name="event_category"
							label="Category"
							rules={[{ required: true }]}
						>
							<Select placeholder="Select an option" allowClear>
								<Option value="General Meetup">
									General Meetup
								</Option>
								<Option value="Reunions">Reunions</Option>
								<Option value="Webinars">Webinars</Option>
							</Select>
						</Form.Item>

						<Form.Item
							initialValue={props?.event_name}
							name="event_name"
							label="Title"
							rules={[
								{
									required: true,
									message: 'Please input Title',
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							initialValue={
								props?.event_start &&
								moment.unix(props?.event_start / 1000)
							}
							name="event_start"
							label="Event Date/Time"
							rules={[
								{
									required: true,
									message: 'Please input Event Date',
								},
							]}
						>
							<DatePicker
								disabledDate={(current) =>
									current &&
									current < moment().subtract(0, 'day')
								}
								showSecond={false}
								showTime
								showToday
							/>
						</Form.Item>

						<Form.Item
							initialValue={
								props?.event_end &&
								moment.unix(props?.event_end / 1000)
							}
							name="event_end"
							label="Event End Date/Time"
							rules={[
								{
									required: true,
									message: 'Please input Event End Date',
								},
							]}
						>
							<DatePicker
								disabledDate={(current) =>
									current &&
									current < moment().subtract(0, 'day')
								}
								showSecond={false}
								showTime
								showToday
							/>
						</Form.Item>

						<Form.Item
							initialValue={props?.event_venue}
							name="event_venue"
							label="Venue"
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							initialValue={props?.address}
							name="address"
							label="Complete Address"
							rules={[{ required: true }]}
						>
							<Input.TextArea rows={4} />
						</Form.Item>

						<Form.Item
							initialValue={props?.event_description}
							name="event_description"
							label="Description"
							rules={[{}]}
						>
							<MDEditor value={desc} onChange={setDesc} />
						</Form.Item>

						{/* <Form.Item {...tailFormItemLayout}> */}
						<div className="signupCreate-form-submit-button-div">
							<Form.Item className="newsForm-submit">
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
			</div>
		</div>
	);
}

export default Event;
