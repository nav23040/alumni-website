import { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { uploadPImage } from '../../services/api/user';

const fileToBase = (file: any) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => {
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

function ProfileImageMenu(_props: any) {
	const [isLoading, setLoading] = useState(false);
	const user = useSelector((state: any) => state.authReducer.user);
	const [profileImage, setProfileImage] = useState<any>();

	const fileUploadProps = {
		maxCount: 1,
		multiple: true,
		accept: '.png,.jpg,.jpeg',
		onRemove: (_file: any) => {
			setProfileImage(null);
			return true;
		},
		beforeUpload: (file: any) => {
			setProfileImage(file);
			return false;
		},
		filelist: profileImage,
	};

	const handleUpdload = async () => {
		setLoading(true);
		if (!profileImage) {
			setLoading(false);
			message.warning('Please select an Image first!');
		} else {
			const f = await fileToBase(profileImage);
			uploadPImage(f, user.token)
				.then((res: any) => {
					if (res?.data?.error) {
						throw new Error(res?.data?.message);
					} else {
						message.success(
							'Successfully updated your profile image'
						);
						setLoading(false);
						window.location.reload();
					}
				})
				.catch((err: any) => {
					setLoading(false);
					message.error(err.message);
					console.log(err.message);
				});
		}
	};

	return (
		<div className="profileupdate-menu-wrapper">
			<div className="profileupdate-menu-head">
				<h1>Profile Image</h1>
				<span>Update your profile Image</span>
			</div>
			<hr />
			<div className="profileimage-section">
				<Upload.Dragger
					{...fileUploadProps}
					listType="picture"
					defaultFileList={profileImage ? [profileImage] : []}
				>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">
						Click or drag Image to this area to upload
					</p>
					<p className="ant-upload-hint"></p>
				</Upload.Dragger>
				<div className="signupCreate-form-submit-button-div">
					<Button
						type="primary"
						htmlType="submit"
						loading={isLoading}
						onClick={handleUpdload}
					>
						Update
					</Button>
				</div>
			</div>
		</div>
	);
}
export default ProfileImageMenu;
