import js from '@eslint/js';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.amd,
				...globals.browser,
				...globals.node,
			}
		},
		rules: {
			indent: [
				"error",
				"tab"
			],
			"linebreak-style": [
				"error",
				"unix"
			],
			quotes: [
				"error",
				"double"
			],
			semi: [
				"error",
				"always"
			],
		}
	},
	{
		files: ["test/*.mjs"],
		languageOptions: {
			globals: {
				...globals.mocha,
				...globals.node,
			}
		}
	}
];
