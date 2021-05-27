import ReactMde from 'react-mde';
import { useState } from 'react';
// import Showdown from 'showdown';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'react-mde/lib/styles/css/react-mde-all.css';
import './mdEditor.component.css';

interface inputType {
	value: string;
	onChange: any;
}

function MDEditor({ value = '', onChange }: inputType) {
	const [selectedTab, setSelectedTab] =
		useState<'write' | 'preview'>('write');

	// const converter = new Showdown.Converter({
	// 	tables: true,
	// 	simplifiedAutoLink: true,
	// 	strikethrough: true,
	// 	tasklists: true,
	// });
	return (
		<ReactMde
			value={value}
			onChange={onChange}
			selectedTab={selectedTab}
			onTabChange={setSelectedTab}
			generateMarkdownPreview={(markdown) =>
				// Promise.resolve(converter.makeHtml(markdown))
				Promise.resolve(
					<ReactMarkdown remarkPlugins={[gfm]} children={markdown} />
				)
			}
			childProps={{
				writeButton: {
					tabIndex: -1,
				},
			}}
		/>
	);
}

export default MDEditor;
