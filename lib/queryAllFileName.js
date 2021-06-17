var fs = require("fs")
var path = require("path")
// TODO: import from helper
const isFile = (v) => fs.statSync(v).isFile()
const isDir = (v) => fs.statSync(v).isDirectory()

// 引入我们定义好的常量
var ignoreFile = require("./constant.js").IGNORE_DIR,
  res = {
    pathname: [],
  }

function getFileName(dir, addIgnore) {
  if (isFile(dir)) {
    return {
      pathname: [dir],
    }
  }
  var files = fs.readdirSync(dir),
    ignoreList = []

  // 判断不需要的文件
  if (Array.prototype.isPrototypeOf(addIgnore)) {
    ignoreList = addIgnore.concat(ignoreFile)
  } else {
    ignoreList = ignoreFile
  }

  // 收集文件名称和所属路径

  files.forEach(function (item) {
    var extname = path.extname(item),
      currentPath = path.join(dir, item)

    // 先在ignore的列表中寻找，如果找到直接return
    if (ignoreList.indexOf(item) !== -1) {
      return
    } else {
      // 判断他是不是我们需要的文件名
      if (isFile(currentPath)) {
        res.pathname.push(currentPath)
      } else if (isDir(currentPath)) {
        // 如果是文件夹，调用函数继续处理
        getFileName(currentPath)
      }
    }
  })
  return res
}

module.exports = getFileName
