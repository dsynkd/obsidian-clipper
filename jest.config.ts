import type {Config} from 'jest';


const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^utils/(.*)$': '<rootDir>/src/utils/$1',
		'^managers/(.*)$': '<rootDir>/src/managers/$1',
		'^icons$': '<rootDir>/src/icons',
		'^core/(.*)$': '<rootDir>/src/core/$1',
		'^types/(.*)$': '<rootDir>/src/types/$1',
		'^styles/(.*)$': '<rootDir>/src/styles/$1',
	},
};

export default config;
