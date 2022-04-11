import DiscordJS from "discord.js";
import { ICommand } from "wokcommands";

export default {
	category: "Testing",
	description: "Testing",
	slash: "both",
	testOnly: true,

	minArgs: 2,
	expectedArgs: "<num1> <num2>",

	options: [
		{
			name: "num1",
			description: "The first number",
			required: true,
			type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
		},
		{
			name: "num2",
			description: "The second number",
			required: true,
			type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
		},
	],

	callback: ({ args }) => {
		const num1 = parseInt(args[0]);
		const num2 = parseInt(args[1]);

		return `The sum is ${num1 + num2}`;
	},
} as ICommand;
