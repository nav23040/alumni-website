import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import {
	Button,
	Card,
	Form,
	Alert,
	Progress,
	Select,
	FormInstance,
	Input,
	DatePicker,
} from 'antd';
import AssignmentIndSharpIcon from '@material-ui/icons/AssignmentIndSharp';
import './signupDetails.css';
import AuthFooter from '../../../../components/Footer/authFooter/authFooter.component';
import AuthNavBar from '../../../../components/Navbar/authNavBar/authNavBar.component';
import {
	courseAvailableForStd,
	DepartmentAvailable,
	allDepts,
} from './coursesInfo';
import moment from 'moment';
import { ILocationState } from '../signupCreate/signupCreate';
import {
	initDetailsFaculty,
	initDetailsStd,
} from '../../../../services/api/user';

interface ICatForm {
	alumnusForm: FormInstance<any>;
	facultyForm: FormInstance<any>;
	studentForm: FormInstance<any>;
}

function SignUpDetails() {
	const [isLoading, setLoading] = useState(false);
	const [regCat, setRegCat] = useState('');
	const history = useHistory();
	const [error, setError] = useState('');
	const location: ILocationState = useLocation().state as ILocationState;
	const email: string = location.email as string;
	const accessToken: string = location.accessToken as string;

	const handleSubmitAsAlumnus = (profile_role: string) => async (
		payload: any
	) => {
		try {
			setLoading(true);
			const formData = { ...payload };
			formData.profile_role = profile_role;
			formData.start_date = payload.start_date.unix() * 1000;
			formData.end_date = payload.end_date.unix() * 1000;
			const res = await initDetailsStd(formData, accessToken);
			if (res?.data?.error === true) {
				throw new Error(res.data.message);
			}
			history.push('/auth/signin');
			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	const handleSubmitAsFaculty = async (payload: any) => {
		try {
			setLoading(true);
			const formData = { ...payload };
			formData.start_date = payload.start_date.unix() * 1000;
			formData.end_date = payload.end_date.unix() * 1000;
			const res = await initDetailsFaculty(formData, accessToken);
			if (res?.data?.error === true) {
				throw new Error(res.data.message);
			}
			history.push('/auth/signin');
			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	const [AlumnusForm] = Form.useForm();
	const [FacultyForm] = Form.useForm();
	const [StudentForm] = Form.useForm();

	return email ? (
		<>
			<AuthNavBar />
			<div className="auth-view">
				<div className="auth-container-wrapper">
					{error ? (
						<Alert
							className="signup-error"
							message={error}
							type="error"
							closable
							onClose={() => setError('')}
						/>
					) : null}
					<div className="signup-head">
						<h1>Registration</h1>
						<span>Connect with your alumni network</span>
					</div>
					<Card className="auth-form-wrapper">
						<div className="auth-form-create-page-info">
							<Progress type="circle" percent={50} width={75} />
							<h1>
								<AssignmentIndSharpIcon
									style={{ fontSize: 40 }}
								/>
								Batch / Faculty Details
							</h1>
						</div>
						<hr className="auth-hr" />
						<Card className="signup-details-wrapper">
							<h2 style={{ marginBottom: '25px' }}>
								Choose to register as an Alumni or currently
								enrolled student or as a faculty member.
							</h2>
							<p>
								<span style={{ color: 'red' }}>* </span>Either
								Please add the courses/programs that you
								pursued, if you are an alumnus/alumna, or add
								your department and designation details if you
								are a faculty member.
							</p>
							<div className="signup-details-options">
								<Button
									className="signup-details-options-buttons"
									onClick={() => setRegCat('alumnus')}
									disabled={
										regCat === 'alumnus' ? true : false
									}
								>
									As Alumnus
								</Button>
								<Button
									className="signup-details-options-buttons"
									onClick={() => setRegCat('faculty')}
									disabled={
										regCat === 'faculty' ? true : false
									}
								>
									As Faculty
								</Button>
								<Button
									className="signup-details-options-buttons"
									onClick={() => setRegCat('student')}
									disabled={
										regCat === 'student' ? true : false
									}
								>
									As Student
								</Button>
							</div>
							{RenderCatForm(
								regCat,
								({
									AlumnusForm,
									FacultyForm,
									StudentForm,
								} as unknown) as ICatForm,
								handleSubmitAsAlumnus('Alumnus'),
								handleSubmitAsFaculty,
								handleSubmitAsAlumnus('Student'),
								isLoading
							)}
							{regCat !== 'faculty' && regCat !== '' ? (
								<ul>
									<li>
										Graduation year is the year of
										completion of that particular course.
										Make sure you fill it correctly so that
										it will help us identify your batch.
									</li>
									<li>
										If you did not graduate from this
										institution or discontinued or still
										pursuing the course, please enter the
										year when your batchmates graduated or
										the year when you will be completing the
										course.
									</li>
								</ul>
							) : null}
						</Card>
					</Card>
				</div>
			</div>
			<AuthFooter />
		</>
	) : (
		<Redirect to={'/auth/signup'} />
	);
}

function RenderCatForm(
	cat: string,
	form: ICatForm,
	handleSubmitAsAlumnus: (payload: any) => Promise<void>,
	handleSubmitAsFaculty: (payload: any) => Promise<void>,
	handleSubmitAsStudent: (payload: any) => Promise<void>,
	isLoading: boolean
) {
	const [course, setCourse] = useState('');
	const { Option } = Select;
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

	const courseOptions = Object.entries(
		courseAvailableForStd
	).map(([, val]) => (
		<Option value={val.join(' - ')}>{val.join(' - ')}</Option>
	));

	const deptOptions = DepartmentAvailable[course]?.map((val: string) => (
		<Option value={val}>{val}</Option>
	));

	const changeCourse = (val: string) => {
		setCourse(val.split('-')[1].trim());
	};

	switch (cat) {
		case 'alumnus':
			return (
				<>
					<div className="signupDetails-form-div">
						<h2>Please select the course/program you pursued</h2>
						<Form
							className="signupDetails-form"
							{...formItemLayout}
							form={form.alumnusForm}
							name="alumnusForm"
							onFinish={handleSubmitAsAlumnus}
							labelAlign="left"
							initialValues={{ prefix: '91' }}
							scrollToFirstError
						>
							<Form.Item
								name="course"
								label="Course / Degree"
								rules={[{ required: true }]}
							>
								<Select
									className="signup-selector"
									showSearch
									placeholder="Select your course"
									onChange={changeCourse}
								>
									{courseOptions}
								</Select>
							</Form.Item>
							<Form.Item
								name="stream"
								label="Stream"
								rules={[{ required: true }]}
							>
								<Select
									className="signup-selector"
									showSearch
									placeholder="Select your stream"
								>
									{deptOptions}
								</Select>
							</Form.Item>
							<Form.Item
								name="start_date"
								label="Start Date"
								rules={[{ required: true }]}
							>
								<DatePicker
									picker="year"
									disabledDate={(current) =>
										current &&
										current.year() > moment().year()
									}
								/>
							</Form.Item>
							<Form.Item
								name="end_date"
								label="End Date(expected/left)"
								rules={[{ required: true }]}
							>
								<DatePicker
									picker="year"
									disabledDate={(current) =>
										current &&
										current.year() > moment().year() + 4
									}
								/>
							</Form.Item>
							<div className="signupDetails-form-submit-button-div">
								<Form.Item className="signupDetails-form-submit">
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
				</>
			);

		case 'faculty':
			return (
				<>
					<div className="signupDetails-form-div">
						<h2>Please select the course/program you pursued</h2>
						<Form
							className="signupDetails-form"
							{...formItemLayout}
							form={form.facultyForm}
							name="facultyForm"
							onFinish={handleSubmitAsFaculty}
							labelAlign="left"
							initialValues={{ prefix: '91' }}
							scrollToFirstError
						>
							<Form.Item
								name="job_title"
								label="Job Title"
								rules={[
									{
										required: true,
										message: 'Please enter your Job Title!',
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item label="Department">
								<Select
									className="signup-selector"
									showSearch
									placeholder="Select your Department"
								>
									{allDepts.map((val: string) => (
										<Option value={val}>{val}</Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								name="start_date"
								label="Start Date"
								rules={[{ required: true }]}
							>
								<DatePicker picker="month" />
							</Form.Item>
							<Form.Item name="end_date" label="End Date">
								<DatePicker picker="month" />
							</Form.Item>
							<p style={{ fontSize: '1.1em' }}>
								* Leave End date empty if you are currently a
								faculty at this institution.
							</p>
							<div className="signupDetails-form-submit-button-div">
								<Form.Item className="signupDetails-form-submit">
									<Button
										type="primary"
										htmlType="submit"
										loading={isLoading}
										disabled
									>
										Submit
									</Button>
								</Form.Item>
							</div>
						</Form>
					</div>
				</>
			);

		case 'student':
			return (
				<>
					<div className="signupDetails-form-div">
						<h2>
							Please select the course/program you are currently
							pursuing
						</h2>
						<Form
							className="signupDetails-form"
							{...formItemLayout}
							form={form.studentForm}
							name="studentForm"
							onFinish={handleSubmitAsStudent}
							labelAlign="left"
							initialValues={{ prefix: '91' }}
							scrollToFirstError
						>
							<Form.Item
								name="course"
								label="Course / Degree"
								rules={[{ required: true }]}
							>
								<Select
									className="signup-selector"
									showSearch
									placeholder="Select your course"
									onChange={changeCourse}
								>
									{courseOptions}
								</Select>
							</Form.Item>
							<Form.Item
								name="stream"
								label="Stream"
								rules={[{ required: true }]}
							>
								<Select
									className="signup-selector"
									showSearch
									placeholder="Select your stream"
								>
									{deptOptions}
								</Select>
							</Form.Item>
							<Form.Item
								name="start_date"
								label="Start Date"
								rules={[{ required: true }]}
							>
								<DatePicker
									picker="year"
									disabledDate={(current) =>
										current &&
										current.year() > moment().year()
									}
								/>
							</Form.Item>
							<Form.Item
								name="end_date"
								label="End Date(expected/left)"
								rules={[{ required: true }]}
							>
								<DatePicker
									picker="year"
									disabledDate={(current) =>
										current &&
										current.year() < moment().year()
									}
								/>
							</Form.Item>
							<div className="signupDetails-form-submit-button-div">
								<Form.Item className="signupDetails-form-submit">
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
				</>
			);

		default:
			return null;
	}
}

export default SignUpDetails;
