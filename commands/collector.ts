import { Message, MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
	category: "Testing",
	description: "Testing",
	testOnly: true,
	ephemeral: true,

	callback: ({ message, channel }) => {
		message.reply("Please confirm this action");
		message.react("😀");

		// MESSAGE COLLECTOR. FILTER MAKES SURE MESSAGES BEING COLLECTED ARE ACTUALLY FROM PERSON WHO SENT THE COMMAND

		// const filter = (m: Message) => {
		// 	return m.author.id === message.author.id;
		// };

		// const collector = channel.createMessageCollector({
		// 	filter,
		// 	max: 1,
		// 	time: 1000 * 5,
		// });

		// REACTION COLLECTOR

		const filter = (reaction: MessageReaction, user: User) => {
			return user.id === message.author.id;
		};

		const collector = message.createReactionCollector({
			filter,
			max: 1,
			time: 1000 * 20,
		});
		collector.on("collect", (reaction) => {
			console.log(reaction.emoji);
		});

		collector.on("end", (collected) => {
			if (collected.size === 0) {
				message.reply("You did not react in time");
				return;
			}

			let text = "Collected:\n\n";

			collected.forEach((message) => {
				text += `${message.emoji.name}\n`;
			});

			message.reply(text);
		});
	},
} as ICommand;
