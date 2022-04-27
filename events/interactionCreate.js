module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		}
		catch (err) {
			await interaction.reply({ content: 'There was an erro executing your command', ephemeral: true });
		}
	},
};


// 	if (!interaction.isCommand()) return;

// 	const command = client.commands.get(interaction.commandName);

// 	if (!command) return;

// 	try {
// 		await command.execute(interaction);
// 	}
// 	catch (error) {
// 		await interaction.reply({ content: 'there has been an error during execution', ephemeral: true });
// 	}
// });