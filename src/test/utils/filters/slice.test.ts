import { slice } from '@utils/filters/slice'


describe('slice filter', () => {
	it('slices arrays', () => {
		expect(slice('["a","b","c","d"]', '1,3')).toBe('["b","c"]');
	});
	it('if single parameter provided, slices from that index to the end', () => {
		expect(slice('["a","b","c","d"]', '2')).toBe('["c","d"]');
	});
	it('negative indices count from the end', () => {
		expect(slice('["a","b","c","d"]', '-3')).toBe('["b","c","d"]');
	});
	it('second param is exclusive', () => {
		expect(slice('["a","b","c","d"]', '1,4')).toBe('["b","c","d"]');
	});
	it('negative second param excludes elements from the end', () => {
		expect(slice('["a","b","c","d"]', '0,-2')).toBe('["a","b"]');
	});
});
