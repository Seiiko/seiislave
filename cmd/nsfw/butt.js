const randomAss = require('random-butt');

module.exports.run = async (client, message, args) => {

    // Send the butt picture.
    randomAss()
      .then(url => {
        message.channel.send(url);
      })

}

module.exports.info = {

    // Set the command name.
    name: "butt"

}