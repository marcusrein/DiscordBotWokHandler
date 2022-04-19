import { ICommand } from "wokcommands";

export default {
	category: "Testing",
	description: "Give you a link to connect a wallet",

	slash: "both",
	testOnly: true,
	callback: () => {
		const link = "http://127.0.0.1:5500/";
		return `Click this link to connect your wallet: ${link}`;
	},
} as ICommand;
