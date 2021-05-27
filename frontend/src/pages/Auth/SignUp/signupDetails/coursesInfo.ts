export const courseAvailableForStd: { [id: string]: Array<string> } = {
	1: ['Bachelor of Technology', 'B.Tech.'],
	2: ['Master of Science', 'M.Sc.'],
	3: ['Master of Technology', 'M.Tech.'],
	4: ['MS by Research', 'MS by Research'],
	5: ['Doctor of Philosophy', 'Ph.D.'],
	6: [
		'Dual Degree (Bachelor of Technology + Master of Technology)',
		'B.Tech. + M.Tech.',
	],
};

export const DepartmentAvailable: { [id: string]: Array<string> } = {
	'B.Tech.': [
		'Biomedical Engineering',
		'Chemical Engineering',
		'Civil Engineering',
		'Computer Science and Engineering',
		'Electrical Engineering',
		'Humanities and Social Sciences',
		'Materials and Energy Engineering',
		'Mechanical Engineering',
		'Physics',
	],
	'M.Sc.': ['Physics', 'Chemistry', 'Maths'],
	'M.Tech.': [
		'Biomedical Engineering',
		'Chemical Engineering',
		'Civil Engineering',
		'Computer Science & Engineering',
		'Mechanical Engineering',
	],
	'MS by Research': [
		'Computer Science & Engineering',
		'Electrical Engineering',
		'Physics',
	],
	'Ph.D.': [
		'Biomedical Engineering',
		'Chemical Engineering',
		'Civil Engineering',
		'Computer Science & Engineering',
		'Electrical Engineering',
		'Humanities and Social Sciences',
		'Materials & Energy Engineering',
		'Mechanical Engineering',
		'Physics',
		'Chemistry',
		'Maths',
	],
	'B.Tech. + M.Tech.': ['Mechanical Engineering'],
};

export const allDepts: Array<string> = [
	'Biomedical Engineering',
	'Chemical Engineering',
	'Civil Engineering',
	'Computer Science & Engineering',
	'Electrical Engineering',
	'Humanities and Social Sciences',
	'Materials & Energy Engineering',
	'Mechanical Engineering',
	'Physics',
	'Chemistry',
	'Maths',
	'Other'
];
