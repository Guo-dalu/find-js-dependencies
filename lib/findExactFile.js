const fs = require("fs")
const path = require("path")

const findExactFile = (filepath) => {
  const dir = path.dirname(filepath)
  var files = fs.readdirSync(dir)
  const lastIndex = filepath.lastIndexOf("/")
  const filename = filepath.slice(lastIndex + 1)
  const exactFile = files.find((item) => path.basename(item).includes(filename))
  console.log(path.resolve(dir, exactFile))
  return path.resolve(dir, exactFile)
  // todo 判断如果是文件夹，则找 index
}

module.exports = findExactFile
