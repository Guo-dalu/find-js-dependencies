const fs = require("fs")

module.exports.isFile = (v) => fs.statSync(v).isFile()
module.exports.isDir = (v) => fs.statSync(v).isDirectory()
