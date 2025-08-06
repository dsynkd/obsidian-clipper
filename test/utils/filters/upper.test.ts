import { upper } from '@utils/filters/upper'


describe('upper filter', () => {
	it('uppers docs example', () => {
		expect(upper('hello world')).toBe('HELLO WORLD');
	});
});
