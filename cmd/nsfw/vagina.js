const randomPussy = require('random-vagina');

module.exports.run = async (client, message, args) => {

    // Send the vagina picture.
    randomPussy()
      .then(url => {
        message.channel.send(url);
      })

}

module.exports.info = {

    // Set the command name.
    name: "vagina"

}