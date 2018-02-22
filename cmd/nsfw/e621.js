const booru = require('booru');

module.exports.run = async (client, message, args) => {

  // Check if channel is NSFW.
  if(message.channel.id !== "408579882084466688" && message.channel.id !== "408582748157116416")
    return message.channel.send(":no_entry_sign:  |  This is not a NSFW channel!");

  booru.search("e621", [args[0], args[1]], {limit: 1, random: true})
  .then(booru.commonfy)
  .then(images => {

    // Send the direct link to each image
    for (let image of images) {

      message.channel.send(image.common.file_url);

    }

  })
  .catch(err => {

    if (err.name === 'booruError') {

      // It's a custom error thrown by the package
      message.channel.send(":warning:  |  Couldn't find any results!");

    } else {

      // This means I messed up. Whoops.
      console.log(err);

    }

  })

}

module.exports.info = {

  // Set the command name.
  name: "e621"

}