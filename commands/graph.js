const { FACEIT_API_KEY } = require('../config.json');
const faceit = require('../helpers/faceit/faceit-api');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
var fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('graph')
		.setDescription('Last 2000 Matches Graphed From FACEIT')
		.addStringOption(option => option.setName('username').setDescription('Enter a faceit username').setRequired(true))
		.addStringOption(option => option.setName('linecolor').setDescription('Line Color (Hex)'))
		.addStringOption(option => option.setName('graphcolor').setDescription('Graph Background Color (Hex)')),
	
	async execute(interaction) {
		const username = interaction.options.getString('username');
		const linecolor = interaction.options.getString('linecolor');
		const graphcolor = interaction.options.getString('graphcolor');

		try{
			let res = await faceit.getMatchHistory(username);

			const elo_history = res.data.map((match)=>match.elo).filter((elo)=> elo !== undefined).reverse();
			const count = elo_history.map((elo, index)=>{return (index+1).toString()})
			//Chart default settings
			const width = 700; //px
			const height = 500; //px

			const backgroundColour = !graphcolor ? '#dadada' : graphcolor;
			const borderColor = !linecolor ? 'rgb(75, 192, 192)' : linecolor;

			const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});
			//Chart data
			const data = {
			  labels: count,
			  datasets: [{
			    label: username,
			    data: elo_history,

			    pointRadius: 0,
			    fill: false,
			    borderColor: borderColor,
			    tension: 0.3
			  }]
			};
			//Chart config
			const configuration = {
			  "type": 'line',
			  "data": data,
			  "options": {
			  	scales: {
			  	      x: {
			  	      	ticks:{
			  	      		font:{
			  	      			size:20,
			  	      			weight:"bold",
			  	      			color:"#FFFFFF"
			  	      		}
			  	      	},
			  	      },
			  	      y: {
			  	      	ticks:{
			  	      		font:{
			  	      			size:20,
			  	      			weight:"bold",
			  	      			color:"#FFFFFF"
			  	      		}
			  	      	},
			  	      },
			  	    },
			  	plugins: {
	  	            legend: {
	  	                labels: {
	  	                	//display:false,
	  	                    font: {
	  	                        size: 25,
	  	                        weight:"bold",
	  	                        color:"#FFFFFF"
	  	                    }
	  	                }
	  	            }
	  	        },
			  	layout: { padding: 30},
			  },
			  "plugins": [
				]
			};
			//Save chart to local folder
			const image = await chartJSNodeCanvas.renderToBuffer(configuration);
			fs.writeFile('./img/graph.png', image, 'buffer', function(err){});
			const file = new MessageAttachment('./img/graph.png');

			const messageEmbed = new MessageEmbed()
				.setColor('#ff5500')
				.setImage('attachment://graph.png')
				.setAuthor({ 
					name: `${username}'s elo graph`, 
					iconURL: "https://assets.faceit-cdn.net/organizer_avatar/faceit_1551450699251.jpg", 
					url: `https://www.faceit.com/en/players/${username}` });

			await interaction.reply({embeds: [messageEmbed], files: [file]});

		}catch(err){
			await interaction.reply("Player not found?");
		}
	},
};