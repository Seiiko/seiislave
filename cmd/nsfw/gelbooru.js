const booru = require('booru');

module.exports.run = async (client, message, args) => {

  booru.search("gelbooru", [args[0], args[1]], {limit: 1, random: true})
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
  name: "gelbooru"

}