const randomTits = require('random-boobs');

module.exports.run = async (client, message, args) => {

    // Send the boob picture.
    randomTits()
      .then(url => {
        message.channel.send(url);
      })

}

module.exports.info = {

    // Set the command name.
    name: "boobs"

}