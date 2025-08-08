import type {Config} from 'jest';


const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
};

export default config;
