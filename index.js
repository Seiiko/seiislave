// SETUP THE BOT
const Discord = require('discord.js');
const client = new Discord.Client();

// DEFINE THE PREFIX
const prefix = ".";

// SET BOT STATUS
client.on('ready', () => { // When the bot is ready.
    client.user.setPresence({ game: { name: 'with Sei', type: 0 } }); // Set the bot's status.
});
    
// GIVING ROLE ON JOIN
client.on("guildMemberAdd", member => { // Listener event: user joining the server.
    
    // Getting the pretended role.
    var role = member.guild.roles.find("name", "Kinky Peasant"); // Get a variable referring to the role.

    // Adding the role.
    member.addRole(role);
    
    // Sending message to main channel.
    const welcomeChannel = client.channels.find("name", "welcome") //Create a variable referring to the selected channel.
    // Sending the message.
    welcomeChannel.send("Welcome to the NSFW Heaven, <@!"+member.user.id+">. We sure do hope you have a pleasure of a time here. Make sure to read the rules and have fun.");
    
});


// SELFROLE COMMAND
client.on("message", function(message) {
    
    // Defining the variables.
    let msg  = message.content.toUpperCase(); // Make message not case sensitive.
    let sender = message.member; // Find who the message's author is.
    
    // Getting the pretended roles.
    var gore = message.guild.roles.find("name", "Gore Access"); // Define a variable referring to the gore access role.
    var scat = message.guild.roles.find("name", "Scat Access"); // Define a variable referring to the scat access role.
    
    // Command for gore.
    if (msg.startsWith(prefix + "IAM GORE")) { // Check if the command starts with !iam and verify the arguments.    
        
        if(!message.member.roles.some(r=>["Gore Access"].includes(r.name)) ) { // If the user doesn't have the role already. 
            sender.addRole(gore) // Give the message author the role.
            message.channel.send(":white_check_mark: | You now have access to the **gore** channels.") // Send message to channel.
        } else { // If the user has the role already.
            message.channel.send(":skull_crossbones: | You obviously already have that role, duh...") // Send message to channel.
            
        }
    
    }
    
    //Command for scat.
    if (msg.startsWith(prefix + "IAM SCAT")) { // Check if the command starts with !iam and verify the arguments.    
        
        if(!message.member.roles.some(r=>["Scat Access"].includes(r.name)) ) { // If the user doesn't have the role already. 
            sender.addRole(scat) // Give the message author the role.
            message.channel.send(":white_check_mark: | You now have access to the **scat** channels.") // Send message to channel.
        } else { // If the user has the role already.
            message.channel.send(":skull_crossbones: | You obviously already have that role, duh...") // Send message to channel.
            
        }    
    
    }    
    
});

// REGULAR COMMANDS
client.on("message", async message => { // Message handler event.
  
  // Ignore other bots, including itself.
  if(message.author.bot) return;
  
  // Ignore messages without prefix.
  if(message.content.indexOf(prefix) !== 0) return;
  
  // Separate the "command" name, and our "arguments" for the command.
  const args = message.content.slice(prefix.length).trim().split(/ +/g); // Define the arguments constant.
  const command = args.shift().toLowerCase(); // Define the command constant.
   
  // HELP COMMAND (TEMPORARY) 
  if(command === "help") { // Check if the command is !help.
      
    //Send a message to the channel.
    message.channel.send("What do you need help with? I offer blowjobs, titjobs, licking, grabbing, vaginal, anal... Just choose!")
      
  }
  
  // INSERT COMMAND
  if(command === "insert") { // Check if the command is !insert.
    
    // Check what role the user has.
    if(message.member.roles.some(r=>["Kink Goddess"].includes(r.name)) ) // If the user has the Owner role.
        message.channel.send("A-aah~! You're the best, dear Sei! ♡") // Send message to the channel.
    else if (message.member.roles.some(r=>["Sly Licker"].includes(r.name))) // If the user has the Sly role.
        message.channel.send("A-aah~! Shouldn't you be doing that to Sei? ♡") // Send message to the channel.
    else // If the user has any other role.
        message.channel.send("A-aah~! ♡") // Send message to the channel.
      
  }

    
    // FUCK COMMAND
    if(command === "fuck") { // Check if the command is !fuck.
    
    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.reply("You want to fuck someone who doesn't exist? Talk about desperation."); // Send message to channel.
 
    // Fuck the member.
    if (member.roles.some(r=>["Sei's Slave"].includes(r.name)) && message.member.roles.some(r=>["Kink Goddess"].includes(r.name))) { // If Sei mentions the bot.
      message.channel.send(`For sure, my sweet Sei... I'm ready for you. We shall do this... privately. ;3`); // Send message to the channel.
    } else if (member.roles.some(r=>["Sei's Slave"].includes(r.name)) && message.member.roles.some(r=>["Sly Licker"].includes(r.name))) { // If Sly mentions the bot.
      message.channel.send(`I'll only do it if Sei's a part of it, Sly.`); // Send message to the channel.
    } else if (member.roles.some(r=>["Sei's Slave"].includes(r.name))) { // If other member mentions the bot.
      message.channel.send(`I'm sorry, sweetie, only Sei can fuck me.`); // Send message to the channel.
    } else { // If the bot isn't mentioned.
      message.channel.send(`:sweat_drops: | <@!${member.user.id}> and <@!${message.member.id}> are now having some fun. Don't moan too loud!`); // Send message to the channel.
    }

  }

  // BEST MEMBER COMMAND
  if(command === "bestmember") { // Check if the command is !bestmember.
    
    // Define variables.
    var members = ["Definitely my dear Seiko.", "Most certainly Sly.", "It's clearly Silver.", "I am. Duh."]; // Possible answers.
    var bestMember = members[Math.floor(Math.random() * members.length)]; // Variable which stores the random answer.
  
    // Send the message
    message.channel.send(bestMember)
      
  } 
    
});

// GET THE BOT'S TOKEN, DON'T CHANGE
client.login(process.env.BOT_TOKEN);
