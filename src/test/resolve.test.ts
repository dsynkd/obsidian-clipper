/* eslint-env jest */
import fs from 'fs';
import path from 'path';
import defuddle from 'defuddle';
import { resolveVariables } from '@utils/variables/resolve';
import dayjs from 'dayjs';
import { JSDOM } from 'jsdom';

describe('Variable Resolution', () => {
	let presetVariables: { [key: string]: string };

	beforeAll(async () => {
		const domain = 'https://example.com';
		const html = fs.readFileSync(path.join(__dirname, 'data', 'sample.html'), 'utf8');
		const { window } = new JSDOM(html);
		const doc = window.document;
		const defuddled = new defuddle(doc, { url: '' }).parse();
		presetVariables = {
			'{{author}}': defuddled.author.trim(),
			'{{content}}': defuddled.content.trim(),
			'{{contentHtml}}': '',
			'{{date}}': dayjs().format('YYYY-MM-DDTHH:mm:ssZ').trim(),
			'{{time}}': dayjs().format('YYYY-MM-DDTHH:mm:ssZ').trim(),
			'{{description}}': defuddled.description.trim(),
			'{{domain}}': domain,
			'{{favicon}}': defuddled.favicon,
			'{{fullHtml}}': html,
			'{{highlights}}': '',
			'{{image}}': defuddled.image,
			'{{noteName}}': 'Test Note',
			'{{published}}': defuddled.published,
			'{{site}}': defuddled.site,
			'{{title}}': defuddled.title,
			'{{url}}': domain,
			'{{words}}': defuddled.wordCount.toString(),
		};
	});
  
	it('should resolve preset variables from ContentResponse', () => {
		const template = 'Title: {{title}}, URL: {{url}}';
		const result = resolveVariables({
			text: template,
			presetVars: presetVariables,
		});
		expect(result).toContain(presetVariables['{{title}}']);
		expect(result).toContain(presetVariables['{{url}}']);
	});

	it('should resolve custom variables that reference other custom variables (global only)', () => {
		const globalCustomVars = {
			'{{A}}': '{{B}}',
			'{{B}}': 'foobar',
		};
		const text = 'A resolves to: {{A}}';
		const result = resolveVariables({ text, presetVars: presetVariables, globalCustomVars });
		expect(result).toBe('A resolves to: foobar');
	});

	it('should prefer clip custom variables over global when resolving chains', () => {
		const globalCustomVars = {
			'{{A}}': '{{B}}',
			'{{B}}': 'global',
		};
		const clipCustomVars = {
			'{{B}}': 'clip',
		};
		const text = 'A={{A}} B={{B}}';
		const result = resolveVariables({ text, presetVars: presetVariables, globalCustomVars, clipCustomVars });
		expect(result).toBe('A=clip B=clip');
	});

	it('should resolve multi-step chains', () => {
		const globalCustomVars = {
			'{{A}}': '{{B}}',
			'{{B}}': '{{C}}',
			'{{C}}': 'end',
		};
		const result = resolveVariables({ text: 'Value: {{A}}', presetVars: presetVariables, globalCustomVars });
		expect(result).toBe('Value: end');
	});

	it('should resolve a custom variable that references a preset variable', () => {
		const globalCustomVars = {
			'{{A}}': '{{title}}',
		};
		const result = resolveVariables({ text: 'A: {{A}}', presetVars: presetVariables, globalCustomVars });
		expect(result).toBe(`A: ${presetVariables['{{title}}']}`);
	});

	it('should throw on circular reference between two custom variables', () => {
		const globalCustomVars = {
			'{{A}}': '{{B}}',
			'{{B}}': '{{A}}',
		};
		expect(() => resolveVariables({ text: '{{A}}', presetVars: presetVariables, globalCustomVars }))
			.toThrow(/Circular reference/);
	});

	it('should throw on deeper circular reference chain', () => {
		const globalCustomVars = {
			'{{A}}': '{{B}}',
			'{{B}}': '{{C}}',
			'{{C}}': '{{A}}',
		};
		expect(() => resolveVariables({ text: 'Value {{A}}', presetVars: presetVariables, globalCustomVars }))
			.toThrow(/Circular reference/);
	});
});