const colors = require('colors')
const randomatic = require("randomatic")
const clipboardy = require("clipboardy")

module.exports = function(context) {
  var patern = ""
  if (context.length == undefined) {
    context.length = 20
  }
  if (context.lowercase) {
    patern += "a"
  }
  if (context.uppercase) {
    patern += "A"
  }
  if (context.numeric) {
    patern += "0"
  }
  if (context.special) {
    patern += "!"
  }
  if (context.all) {
    patern += "*"
  }
  if (context.patern != undefined) {
    patern += context.patern
  }
  if (patern == "") {
    patern = "\*"
  }
  var result = randomatic(patern, context.length)
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
