const colors = require('colors')

module.exports = function(algo, content, context) {
  var toHash = '';
  var data = '';
  var self = process.stdin;
  self.on('readable', function() {
    var chunk = this.read();
    if (chunk == null) {} else {
      data += chunk;
    }
  });
  self.on('end', function() {
    toHash = data
  });
  if (toHash == '' && content != "" && content != undefined) {
    toHash = content
  }
  var result = ""
  const shajs = require('sha.js')
  switch (algo) {
    case 'sha1':
      result = shajs('sha1').update(toHash).digest('hex')
      break;

    case 'sha224':
      result = shajs('sha224').update(toHash).digest('hex')
      break;

    case 'sha256':
      result = shajs('sha256').update(toHash).digest('hex')
      break;

    case 'sha384':
      result = shajs('sha384').update(toHash).digest('hex')
      break;

    case 'sha512':
      result = shajs('sha512').update(toHash).digest('hex')
      break;

    case 'sha1':
      result = shajs('sha1').update(toHash).digest('hex')
      break;

    case 'md5':
      const md5 = require('md5')
      result = md5(toHash)
      break;

    case 'apache-crypt':
      const apacheCrypt = require("apache-crypt")
      result = apacheCrypt(toHash)
      break;

    case 'md5-crypt':
      const cryptMD5 = require("cryptmd5")
      result = cryptMD5.cryptMD5(toHash)
      break;

    default:
      result = "algo not found"
      break;
  }
  if (context.clipboard) {
    const clipboardy = require("clipboardy");
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