const fs = require("fs")
const path = require("path")

// AppBanner.js => AppBanner
const getPlainName = (filename) => {
  return /([^.]*)(\..*)?/.exec(filename)[1]
}

const findExactFile = (filepath) => {
  const dir = path.dirname(filepath)
  var files = fs.readdirSync(dir)
  const filename = filepath.slice(filepath.lastIndexOf("/") + 1)
  const exactFile = files.find((item) => {
    return getPlainName(item) === getPlainName(filename)
  })
  const exactFilePath = path.resolve(dir, exactFile)
  // 如果是文件夹，则找 index
  if (fs.statSync(exactFilePath).isDirectory()) {
    return path.resolve(exactFilePath, "index.js")
  }
  return exactFilePath
}

module.exports = findExactFile
