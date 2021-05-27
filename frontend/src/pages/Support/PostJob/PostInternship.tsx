import { useState } from 'react';
import {
  Form,
  Input,
  Cascader,
  Select,
  Radio,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,DatePicker
} from 'antd';
import './PostInternship.css';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector } from 'react-redux';
import { postJob } from '../../../services/api/job';
import { useHistory } from 'react-router';

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

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info : any) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

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

function PostInternship() {
  const global_state = useSelector((state: any) => state.authReducer.user);
  const history = useHistory();

  const classes = useStyles();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    postJob(values, global_state.token)
      .then(response => {
        console.log(response.data)
        history.push('/admin_dashboard')
      })
    
  };

  

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  

  

  const [, setJob] = useState();
	const Job_dict: { [id: string]: string } = {
		1: 'Job',
		2: 'Internship',
	};

  return (
    <Container fixed>
      <div className="postjob-body">
      <div className={classes.root}>
					<Grid container spacing={6}>
						<Grid item xs={6} justify="center" >
      <div className="postjob-head">
								<h1>Post a Job/Internship</h1>
								<hr />
			</div>
      </Grid>
      <br></br>
      <Grid item xs={6} >
        <h1></h1>
      </Grid>
      
      <Grid item xs={6}>
    <Form
      {...formItemLayout}
      form={form}
      name="postjob"
      onFinish={onFinish} labelAlign="left"
      

      
      scrollToFirstError
    >

       <Form.Item
        name="job_type"
        label="Type"
        rules={[
          {
            required: true,
                      },
        ]}
      >
        <Radio.Group
										onChange={(e) =>
											setJob(e.target.value)
										}
									>
										<Radio value="Job">Job</Radio>
										<Radio value="Internship">Internship</Radio>
										
									</Radio.Group>        
        
      </Form.Item>

        <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
                      },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="company_name"
        label="Company Name"
        rules={[
          {
            
          },
        ]}
      >
        <Input />
      </Form.Item>
      
      
      

      <Form.Item name="experience_level" label="Experience Level" rules={[{  }]}>
          <Select
            placeholder="Years"
            allowClear
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
            <Option value="13">13</Option>
            <Option value="14">14</Option>
            <Option value="15">15</Option>
            <Option value="16">16</Option>
            <Option value="17">17</Option>
            <Option value="18">18</Option>
            <Option value="19">19</Option>
            <Option value="20">20</Option>
            <Option value="21">21</Option>
            <Option value="22">22</Option>
            <Option value="23">23</Option>
            <Option value="24">24</Option>
            <Option value="25">25</Option>
            
            
            
          </Select>
        </Form.Item>

        <Form.Item
        name="location"
        label="Location"
        rules={[
          {
            message: 'Seperate locations with a Comma (,)'
                      },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="contact_email"
        label="Contact Email"
        rules={[
          {
            required: true,
                      },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="skills"
        label="Relevant Skills"
        rules={[
          {
            
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="job_desc"  label="Description" rules={[{}]}>
        <TextArea rows={6} />
      </Form.Item>

      <Form.Item name="application_deadline" label="Application Deadline" rules={[
          {
            required: true,
            
          },
        ]}>
        <DatePicker />
      </Form.Item>
         
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      
    </Form>
    </Grid>

       




    </Grid>
    </div>
    </div>
    </Container>
  );
};

export default PostInternship;