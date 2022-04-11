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
					.setEmoji("😤")
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
			content: "Ban the user?",
			// HOW YOU WANT THE COMPONENTS ARRANGED IN A ROW
			components: [row, linkRow],
			ephemeral: true,
		});

		// FILTER CREATED TO MAKE SURE PERSON REACTING TO THE BUTTON IS THE SAME PERSON WHO RANG THIS COMMAND INITIALLY

		const filter = (btnInt: Interaction) => {
			return msgInt.user.id === btnInt.user.id;
		};

		// NOW CREATING COLLECTOR USING THE FILTER. THIS WILL LISTEN FOR THE EVENT, THEN COLLECT THE INTERACTION

		const collector = channel.createMessageComponentCollector({
			filter,
			// MAX NUMBER OF BUTTONS USER CAN CLICK
			max: 1,
			// HOW LONG THEY HAVE TO CLICK
			time: 10000 * 15,
		});

		collector.on("collect", (i: ButtonInteraction) => {
			i.reply({ content: "You clicked a button", ephemeral: true });
		});

		// LOGIC FOR AFTER BUTTON PRESSES OCCURS HERE. ASYNC USED TO EDIT REPLY AFTER THE BUTTON PRESS AND REMOVE CHOICES FROM SCREEN.

		collector.on("end", async (collection) => {
			collection.forEach((click) => {
				console.log(click.user.id, click.customId);
			});
			if (collection.first()?.customId === "ban_yes") {
				//ban the user logic would go here
			}
			await msgInt.editReply({
				content: "Thank you for your help banning this awful person",
				components: [],
			});
		});
	},
} as ICommand;
