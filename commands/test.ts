import {
	ButtonInteraction,
	Interaction,
	MessageActionRow,
	MessageButton,
} from "discord.js";
import { ICommand } from "wokcommands";

export default {
	category: "testing",
	description: "testing",
	slash: true,
	testOnly: true,
	callback: async ({ interaction: msgInt, channel }) => {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("ban_yes")
					.setLabel("Confirm")
					.setStyle("SUCCESS")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("ban no")
					.setLabel("Cancel")
					.setStyle("DANGER")
			);

		const linkRow = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL("https://tinyurl.com/2j7yhp5t")
				.setLabel("Visit EmblemDAO")
				.setStyle("LINK")
		);
		await msgInt.reply({
			content: "Are you sure?",
			components: [row, linkRow],
			ephemeral: true,
		});

		const filter = (btnInt: Interaction) => {
			return msgInt.user.id === btnInt.user.id;
		};

		const collector = channel.createMessageComponentCollector({
			filter,
			max: 1,
			time: 10000 * 15,
		});

		collector.on("collect", (i: ButtonInteraction) => {
			i.reply({ content: "You clicked a button", ephemeral: true });
		});

		collector.on("end", async (collection) => {
			collection.forEach((click) => {
				console.log(click.user.id, click.customId);
			});
			if (collection.first()?.customId === "ban_yes") {
				//ban the user
			}
			await msgInt.editReply({
				content: "An action has already been taken",
				components: [],
			});
		});
	},
} as ICommand;
