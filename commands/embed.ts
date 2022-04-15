import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

// TUTORIAL HAS SOMETHING ABOUT JSON DATA - UNSURE HOW TO IMPLEMENT JSON DATA. COULDNT GET JSON TO WORK BUT EMBED WORKDS.

export default {
	category: "Testing",
	description: "Sends an embed",

	testOnly: true,

	permissions: ["ADMINISTRATOR"], // sets permissions for who can use this command

	callback: async ({ message, text }) => {
		const embed = new MessageEmbed()
			.setDescription("Hello World!")
			.setTitle("Title")
			.setColor("RED")
			.setAuthor({ name: "Marcus" })
			.setFooter({ text: "Footer" })
			.addFields([
				{ name: "name", value: "value", inline: true },
				{ name: "name two", value: "value two", inline: true },
			])
			.addField("name three", "value three");

		const newMessage = await message.reply({ embeds: [embed] });

		// shows you can change the embed after a certain amount of time

		await new Promise((resolve) => setTimeout(resolve, 5000));

		const newEmbed = newMessage.embeds[0];

		newEmbed.setTitle("Edited Title");

		newMessage.edit({ embeds: [newEmbed] });
	},
} as ICommand;
