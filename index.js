// SETUP THE BOT
const Discord = require('discord.js');
const client = new Discord.Client();

// DEFINE THE PREFIX
const prefix = "!";

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

// PURGE COMMAND
client.on("message", function(message) {
    
    // Define the variables.
    let msg  = message.content.toUpperCase(); // Make message not case sensitive.
    let sender = message.author; // Find who the message's author is.
    let cont = message.content.slice(prefix.length).split(" "); // Slice off the prefix, put the rest in array based off the spaces.
    let args = cont.slice(1); // Slice off the command in cont, only leaving the number left.
    
    // Command.
    if (msg.startsWith(prefix + "PURGE")) { // Check if the command starts with !purge.
         async function purge() { // Wrap in an async.
            message.delete(); // Delete the command message.
            
            // Verify is user has the Owner role.
            if (!message.member.roles.find("name", "Kink Goddess")){ // If user doesn't have the Owner role.
                message.channel.send("You're not important enough for this, hun.") // Sends a message to the channel.
                return; //Cancels the command.
            }
             
            // Verify if the variable is a number.
            if (isNaN(args[0])) {
                message.message.send("Please specify how many messages you want deleted.") // Send a message to the channel.
                return; // Cancels the command.
            }
             
            const fetched = await message.channel.fetchMessages({limit: args[0]}); //Grab the number used in the !purge command.
            
            //Deleting the messages.
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send("Error: ${error}")); // In case of error, post it in the channel.
         }
         
        //Calling the function.
        purge();
        
    }
             
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
            message.channel.send(":white_check_mark: You now have access to the **gore** channels.") // Send message to channel.
        } else { // If the user has the role already.
            message.channel.send(":skull_crossbones: You obviously already have that role, duh...") // Send message to channel.
            
        }
    
    }
    
    //Command for scat.
    if (msg.startsWith(prefix + "IAM SCAT")) { // Check if the command starts with !iam and verify the arguments.    
        
        if(!message.member.roles.some(r=>["Scat Access"].includes(r.name)) ) {// If the user doesn't have the role already. 
            sender.addRole(scat) // Give the message author the role.
            message.channel.send(":white_check_mark: You now have access to the **scat** channels.") // Send message to channel.
        } else { // If the user has the role already.
            message.channel.send(":skull_crossbones: You obviously already have that role, duh...") // Send message to channel.
            
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
  
  // PING COMMAND
  if(command === "ping") { // Check if the command is !ping.
    
    // Calculate the user's ping.
    const m = await message.channel.send("And..."); // Temporary message while calculating the ping.
    m.edit(`Your ping is ${m.createdTimestamp - message.createdTimestamp}ms.`) // Edit the message to show the user's ping.
      
  }
  
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
  
  // SAY COMMAND
  if(command === "say") { // Check if the command is !say.
      
    // Limit it to admins.
    if(!message.member.roles.some(r=>["Kink Goddess", "Kink Royalty"].includes(r.name)) ) // If user doesn't have the Owner or Admin role.
      return message.reply("you don't control me, hun."); // If user doesn't have the Owner or Admin role.
    
    // Get the message 
    const sayMessage = args.join(" ");
    
    // Delete the command message.
    message.delete()
    
    // Get the bot to say the message.
    message.channel.send(sayMessage);
      
  }
    
    // FUCK COMMAND
  if(command === "fuck") { // Check if the command is !fuck.
    
    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.reply("You want to fuck someone who doesn't exist? Talk about desperation."); // Send message to channel.
 
    // Fuck the member.
    message.channel.send(`${member.user.tag} and ${message.author.tag} are now having some fun. Don't moan too loud!`);

  }
  
  // KICK COMMAND
  if(command === "kick") { // Check if the command is !kick.
      
    // Limit it to admins.
    if(!message.member.roles.some(r=>["Kink Goddess", "Kink Royalty"].includes(r.name)) ) // If user doesn't have the Owner or Admin role.
      return message.reply("you're not important enough to use this."); // If user doesn't have the Owner or Admin role.
    
    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.reply("I'm afraid you're imagining members who do not exist."); // Send message to channel.
    if(!member.kickable) // If the member has a higher role than the bot.
      return message.reply("I cannot kick this user, dummy."); // Send message to channel.
    
    // Get the reason.
    let reason = args.slice(1).join(' '); // Define the reason variable.
    if(!reason) // If there's no reason.
      return message.reply("why do you wanna kick them? Use the command again and include a reason!"); // Send message to channel.
    
    // Kick the member.
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  // BAN COMMAND
  if(command === "ban") { // Check if the command is !ban.

    // Limit it to admins.
    if(!message.member.roles.some(r=>["Kink Goddess", "Kink Royalty"].includes(r.name)) ) // If user doesn't have the Owner or Admin role.
      return message.reply("please, as if *you* could ban anyone."); // If user doesn't have the Owner or Admin role.
    
    // Check if there the member is valid.
    let member = message.mentions.members.first(); // Define the member variable.
    if(!member) // If the member doesn't exist.
      return message.reply("I'm afraid you're imagining members who do not exist.");  // Send message to channel.
    if(!member.bannable) // If the member has a higher role than the bot.
      return message.reply("I cannot ban this user, dummy."); // Send message to channel.

    // Get the reason.
    let reason = args.slice(1).join(' '); // Define the reason variable.
    if(!reason) // If there's no reason.
      return message.reply("why do you wanna ban them?"); // Send message to channel.
    
    // Ban the member.
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  
  }

  // BEST MEMBER COMMAND
  if(command === "bestmember") { // Check if the command is !bestmember.
    
    // Define variables.
    var members = ["Definitely my dear Seiko.", "Most certainly Sly.", "It's clearly Silver.", "I am. Duh."]; // Possible answers.
    var bestMember = members[Math.floor(Math.random() * members.length)]; // Variable which stores the random answer.
  
    // Send the message
    message.channel.send(bestMember)
      
  }    
      
  // PICTURE TEST COMMAND (TEMPORARY)
  if(command === "testpic") { // Check if the command is !testpic.
      
      // Send the test pic
      message.channel.send("Sending test picture.", { // Send message before picture.
        file: "https://i.ytimg.com/vi/yaqe1qesQ8c/maxresdefault.jpg" // Send the actual picture.
      }) 
  }
    
});

// GET THE BOT'S TOKEN, DON'T CHANGE
client.login(process.env.BOT_TOKEN);
