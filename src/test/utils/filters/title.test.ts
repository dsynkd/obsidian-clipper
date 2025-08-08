import { title } from '@utils/filters/title'


describe('title filter', () => {
	it('Converts text to Title Case', () => {
		expect(title('hello world')).toBe('Hello World');
	});
});
