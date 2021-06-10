const fs = require("fs")
const path = require("path")

const findExactFile = (filepath) => {
  const dir = path.dirname(filepath)
  var files = fs.readdirSync(dir)
  const lastIndex = filepath.lastIndexOf("/")
  const filename = filepath.slice(lastIndex + 1)
  const exactFile = files.find((item) => {
    const itemName = path.basename(item)
    // const indexOfReact = filename.indexOf("?react")
    // const trimedItemName =
    //   indexOfReact === -1 ? itemName : itemName.slice(0, indexOfReact)
    return itemName.includes(/([^?]*)(\?react)?/.exec(filename)[1])
  })
  const exactFilePath = path.resolve(dir, exactFile)
  // 判断如果是文件夹，则找 index
  if (fs.statSync(exactFilePath).isDirectory()) {
    return path.resolve(exactFilePath, "index.js")
  }
  return exactFilePath
}

module.exports = findExactFile
