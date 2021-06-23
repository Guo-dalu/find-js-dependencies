var fs = require('fs')
var path = require('path')
const { isFile, isDir } = require('./helpers')

var ignoreFile = require('./constant.js').IGNORE_DIR,
  res = {
    pathname: [],
  }

function getFileName(dir) {
  if (isFile(dir)) {
    return {
      pathname: [dir],
    }
  }
  var files = fs.readdirSync(dir),
    ignoreList = ignoreFile

  // 收集文件名称和所属路径

  files.forEach(function (item) {
    const currentPath = path.join(dir, item)

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
