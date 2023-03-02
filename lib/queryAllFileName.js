const fs = require('fs')
const path = require('path')
const { isFile, isDir } = require('./helpers')

const ignoreFile = require('./constant.js').IGNORE_DIR
const res = {
  pathname: [],
}

function getFileName(dir) {
  if (isFile(dir)) {
    return {
      pathname: [dir],
    }
  }
  const files = fs.readdirSync(dir)
  const ignoreList = ignoreFile
  // iterate the folder to calculate the res
  files.forEach((item) => {
    const currentPath = path.join(dir, item)
    if (ignoreList.includes(item)) {
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
