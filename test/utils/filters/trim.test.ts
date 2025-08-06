import { trim } from '@utils/filters/trim'


describe('trim filter', () => {
	it('Removes white space from both ends of a string', () => {
		expect(trim(' hello world ')).toBe('hello world');
	});
});
