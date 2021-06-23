const fs = require('fs')
const path = require('path')
const { isFile, isDir } = require('./helpers')
const { EXCLUDE_EXT } = require('./constant.js')

/**
 *
 * @param {string} filename
 * @returns {string}
 *  AppBanner.js => AppBanner
 *  a.b.js  => a.b, a => a
 */
const getPlainName = (filename) => {
  return filename.includes('.') ? filename.match(/.*(?=\.)/)[0] : filename
}

const pickSameNameFiles = (files, filepath) => {
  const filename = filepath.slice(filepath.lastIndexOf('/') + 1)
  // 先在 a.js, a.css 中处理 a.css，排除 a.b.css
  let exactFiles = files.filter(
    (item) => item === filename && EXCLUDE_EXT.includes(path.extname(filepath))
  )

  if (!exactFiles.length) {
    exactFiles = files.filter((item) => getPlainName(item) === filename)
  }

  if (!exactFiles.length) {
    exactFiles = files.filter(
      (item) => getPlainName(item) === getPlainName(filename)
    )
  }
  return exactFiles
}

const findExactFile = (filepath) => {
  try {
    const dir = path.dirname(filepath)
    const files = fs.readdirSync(dir)
    const exactFiles = pickSameNameFiles(files, filepath)

    const exactFilePaths = exactFiles.map((v) => path.resolve(dir, v))

    let allFiles = exactFilePaths.filter((exactFilePath) =>
      isFile(exactFilePath)
    )
    let jsFiles = allFiles.filter((file) => path.extname(file) === '.js')
    return (
      jsFiles[0] ||
      allFiles[0] ||
      path.resolve(
        exactFilePaths.find((exactFilePath) => isDir(exactFilePath)),
        'index.js'
      )
    )
  } catch (e) {
    console.log(`error in finding ${filepath}`.blue, '\n', e)
  }
}

module.exports = findExactFile
