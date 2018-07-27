const colors = require('colors')
const clipboardy = require("clipboardy")
const moment = require('moment')

module.exports = function(context) {
  var now = moment()
  var result = ""
  if (context.locale != undefined) {
    now.locale(context.locale);
  }
  if (context.epoch) {
    result = now.unix()
  } else if (context.format != undefined) {
    result = now.format(context.format)
  } else {
    result = now.toString()
  }
  if (context.clipboard) {
    clipboardy
      .write(result)
      .then(() => {
        console.log(colors.bgBlack(colors.cyan("Copied to clipboard")));
        process.exit();
      })
      .catch(err => {
        console.log(colors.bgBlack(colors.yellow("Failed to copy to clipboard")));
        console.error(err.message);
        process.exit(1);
      });
  } else {
    console.log(result)
  }
}
