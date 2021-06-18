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
    const files = fs.readdirSync(dir)
    const filename = filepath.slice(filepath.lastIndexOf("/") + 1)
    // 先处理 a.css
    let exactFiles = files.filter(
      (item) => item === filename && filename.includes(".css")
    )

    if (!exactFiles.length) {
      exactFiles = files.filter(
        (item) => getPlainName(item) === getPlainName(filename)
      )
    }

    console.log(exactFiles, 1)

    // 处理 a.b.js， a.c.js
    if (exactFiles.filter((v) => v.includes(filename)).length) {
      console.log(2)
      exactFiles = exactFiles.filter((v) => v.includes(filename))
    }

    const exactFilePaths = exactFiles.map((v) => path.resolve(dir, v))

    let allFiles = exactFilePaths.filter((exactFilePath) =>
      isFile(exactFilePath)
    )
    let jsFiles = allFiles.filter((file) => path.extname(file) === ".js")
    console.log({ jsFiles, allFiles, exactFiles })
    return (
      jsFiles[0] ||
      allFiles[0] ||
      path.resolve(
        exactFilePaths.find((exactFilePath) => isDir(exactFilePath)),
        "index.js"
      )
    )
  } catch (e) {
    console.log(`error in finding ${filepath}`, "\n", e)
  }
}

module.exports = findExactFile
