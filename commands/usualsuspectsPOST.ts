import { ICommand } from "wokcommands";
import mongoose from "mongoose";
import { User } from "../mongodb";

export default {
	category: "Testing",
	description: "Posts ethAddress and DiscordID ",

	slash: "both",
	testOnly: true,

	callback: async () => {
		// await mongoose.connect("proces.env.DATABASE_URI");

		let randomString = Math.random().toString(36).substring(2, 20);

		let randomNumber = Math.floor(Math.random() * 99999999 + 11111111);

		const usualsuspect = new User({
			ethAddress: randomString,
			discordId: randomNumber,
		});

		usualsuspect.save();

		return "New usualsuspect has been posted";
	},
} as ICommand;
