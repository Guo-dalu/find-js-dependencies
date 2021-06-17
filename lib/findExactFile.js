const fs = require("fs")
const path = require("path")
const { isFile, isDir } = require("./helpers")

// AppBanner.js => AppBanner
const getPlainName = (filename) => {
  return /([^.]*)(\..*)?/.exec(filename)[1]
}

const findExactFile = (filepath) => {
  try {
    const dir = path.dirname(filepath)
    var files = fs.readdirSync(dir)
    const filename = filepath.slice(filepath.lastIndexOf("/") + 1)
    let exactFiles = files.filter((item) => item.name === filename)
    if (!exactFiles.length) {
      exactFiles = files.filter(
        (item) => getPlainName(item) === getPlainName(filename)
      )
    }

    const exactFilePaths = exactFiles.map((v) => path.resolve(dir, v))

    let allFiles = exactFilePaths.filter((exactFilePath) =>
      isFile(exactFilePath)
    )
    let jsFiles = allFiles.filter((file) => path.extname(file) === ".js")
    return (
      jsFiles[0] ||
      allFiles[0] ||
      path.resolve(
        exactFilePaths.find((exactFilePath) => isDir(exactFilePath)),
        "index.js"
      )
    )
  } catch (e) {
    console.log(filepath, "\n", e)
  }
}

module.exports = findExactFile
