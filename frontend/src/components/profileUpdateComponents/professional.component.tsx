import { Form, Input, Button, InputNumber, message } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	addWorkExp,
	updateOverallExp,
	updateProfessHeadline,
} from '../../services/api/user';

function ProfessionalDetails(props: any) {
	const [isLoading, setLoading] = useState(false);
	const user = useSelector((state: any) => state.authReducer.user);
	const handleSubmitProfHeadForm = (payload: any) => {
		setLoading(true);
		updateProfessHeadline(payload, user.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					setLoading(false);
					message.success(
						'Successfully updated your professional headline'
					);
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
				setLoading(false);
			});
	};
	const handleSubmitOverallExpForm = (payload: any) => {
		setLoading(true);
		const roles = payload?.roles
			?.split(',')
			.map((item: any) => item.trim());

		const skills = payload?.skills
			?.split(',')
			.map((item: any) => item.trim());
		updateOverallExp(
			{ ...payload, skills: skills, roles: roles },
			user.token
		)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					setLoading(false);
					message.success(
						'Successfully updated your overall experience details'
					);
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
				setLoading(false);
			});
	};
	const handleSubmitWorkExpForm = (payload: any) => {
		setLoading(true);
		addWorkExp(payload, user.token)
			.then((res: any) => {
				if (res?.data?.error) {
					throw new Error(res?.data?.message);
				} else {
					message.success('Successfully updated work experience.');
					setLoading(false);
				}
			})
			.catch((err: any) => {
				message.error(err.message);
				console.log(err.message);
				setLoading(false);
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

	const [profHeadForm] = Form.useForm();
	const [overallExpForm] = Form.useForm();
	const [workExpForm] = Form.useForm();
	return (
		<div className="profileupdate-menu-wrapper">
			<div className="profileupdate-menu-head">
				<h1>Professional Details</h1>
				<span>
					Please update work experience and professional details to
					optimize your visibility
				</span>
			</div>
			<hr />
			<Form
				form={profHeadForm}
				name="profesionalHeadForm"
				{...formItemLayout}
				onFinish={handleSubmitProfHeadForm}
				labelAlign="left"
				initialValues={{ prefix: '91' }}
				scrollToFirstError
			>
				<Form.Item
					initialValue={props?.professional_info?.prof_head}
					name="prof_head"
					label="Professional headline"
					help="This appears on your profile card and immediately below
					your name on profile. A good headline tells others about
					you and helps to reach for right connections."
				>
					<Input placeholder="Ex.: SDE II at Amazon" />
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

			<div className="profileupdate-submenu-head">
				<h2>Overall Experience</h2>
				<span style={{ color: 'rgb(160, 160, 160)' }}>
					Summary of your work experience
				</span>
			</div>
			<hr />
			<Form
				form={overallExpForm}
				name="overallExpForm"
				{...formItemLayout}
				onFinish={handleSubmitOverallExpForm}
				labelAlign="left"
				initialValues={{ prefix: '91' }}
				scrollToFirstError
			>
				<Form.Item
					initialValue={props?.professional_info?.total_exp}
					name="total_exp"
					label="Total Experience"
				>
					<InputNumber placeholder="years" />
				</Form.Item>
				<Form.Item
					initialValue={props?.professional_info?.roles?.join(', ')}
					name="roles"
					label="Roles played"
					help="Enter multiple comma seperated fields"
				>
					<Input placeholder="Ex: SDE, SDM" />
				</Form.Item>
				<Form.Item
					initialValue={props?.professional_info?.skills?.join('. ')}
					name="skills"
					label="Skills"
					help="Enter multiple comma seperated fields"
				>
					<Input placeholder="skill_1, skill_2" />
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
			<div className="profileupdate-submenu-head">
				<h2>Work Experience</h2>
				<span style={{ color: 'rgb(160, 160, 160)' }}>
					Your Association with Organizations
				</span>
			</div>
			<hr />
			<Form
				form={workExpForm}
				name="workExpForm"
				{...formItemLayout}
				onFinish={handleSubmitWorkExpForm}
				labelAlign="left"
				initialValues={{ prefix: '91' }}
				scrollToFirstError
			>
				<Form.Item name="company" label="Organization">
					<Input placeholder="Organization" />
				</Form.Item>
				<Form.Item name="industry" label="Industry">
					<Input placeholder="Ex.: Software" />
				</Form.Item>
				<Form.Item name="exp" label="Experience">
					<InputNumber placeholder="Years" />
				</Form.Item>
				<Form.Item name="role" label="Role">
					<Input placeholder="Ex: SDE" />
				</Form.Item>
				<div className="signupCreate-form-submit-button-div">
					<Form.Item className="profileupdate-form-submit">
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
	);
}

export default ProfessionalDetails;
