const colors = require('colors')

module.exports = function(context) {
  var data = '';
  var self = process.stdin;
  self.on('readable', function() {
    var chunk = this.read();
    if (chunk == null) {} else {
      data += chunk;
    }
  });
  self.on('end', function() {
    const clipboardy = require("clipboardy");
    clipboardy
      .write(data)
      .then(() => {
        console.log(colors.bgBlack(colors.cyan("Copied to clipboard")));
        process.exit();
      })
      .catch(err => {
        console.log(colors.bgBlack(colors.yellow("Failed to copy to clipboard")));
        console.error(err.message);
        process.exit(1);
      });
  });
}
