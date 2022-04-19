// import { Client, TextChannel } from "discord.js";
// import WOKCommands from "wokcommands";
// import mongoose from "mongoose";
import { User } from "../mongodb";

export default () => {
	const userEventEmitter = User.watch();

	userEventEmitter.on("change", (change) =>
		console.log(
			"\n\nTheres been a change in the remote database\n\n",
			console.log(JSON.stringify(change))
		)
	);
};

// 	// Listen for new members joining a guild
// 	client.on("guildMemberAdd", (member) => {
// 		// Access the guild that they joined
// 		const { guild } = member;

// 		// Get the channel named "welcome"
// 		const channel = guild.channels.cache.find(
// 			(channel) => channel.name === "welcome"
// 		) as TextChannel;

// 		// Ensure this channel exists
// 		if (!channel) {
// 			return;
// 		}

// 		// Send the welcome message
// 		channel.send({
// 			content: `Welcome ${member} to the server!`,
// 		});
// 	});
// };

// Configuration for this feature
const config = {
	// The display name that server owners will see.
	// This can be changed at any time.
	displayName: "Welcome Message",

	// The name the database will use to set if it is enabled or not.
	// This should NEVER be changed once set, and users cannot see it.
	dbName: "WELCOME MESSAGE",
};

export { config };
