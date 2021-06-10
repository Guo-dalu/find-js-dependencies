// 这个文件的目的是收集所有文件中的依赖

var fs = require("fs"),
  path = require("path"),
  reqReg = /require\(['|"](.*?)['|"]\)/g,
  impReg = /import\s.*?['|"](.*?)['|"]/g,
  resDep = [],
  nodepkgs = []

const colors = require("colors")
const { EXCLUDE_EXT, INCLUDE_EXT } = require("./constant.js")
const formatAbsolute = require("./formatAbsolute")
const findExactFile = require("./findExactFile.js")
const searchedFiles = []

function getDepend(res, dir) {
  for (let i = 0; i < res.pathname.length; i++) {
    const item = res.pathname[i]
    console.log(`${formatAbsolute(item)}`.green)
    getDependRecursively(item)
  }
  return { resDep, nodepkgs }
}

const dealWithEachDep = (pathname, target) => {
  if (target.startsWith(".") || target.startsWith("~")) {
    const dependencyPath = target.startsWith(".")
      ? path.resolve(pathname, "..", target)
      : path.resolve("/Users/xuemengge/zhihu/heifetz/src", target.slice(2))
    const exactDep = findExactFile(dependencyPath)
    if (!resDep.includes(exactDep)) {
      //console.log(formatAbsolute(exactDep).red)
      resDep.push(formatAbsolute(exactDep))
      if (
        !EXCLUDE_EXT.includes(path.extname(exactDep)) &&
        !searchedFiles.includes(exactDep)
      ) {
        getDependRecursively(exactDep)
      }
    }
  } else {
    // node_modules
    nodepkgs.push(target)
  }
}

function getDependRecursively(pathname) {
  if (!INCLUDE_EXT.includes(path.extname(pathname))) {
    return
  }
  //console.log("----- start find dep for", formatAbsolute(pathname))
  searchedFiles.push(pathname)

  const data = fs.readFileSync(pathname, "utf-8")
  const requireWords = data.match(reqReg)
  requireWords?.forEach((word) => {
    const dep = /require\(['|"](.*?)['|"]\)/.exec(word)[1]
    dealWithEachDep(pathname, dep)
  })

  const importWords = data.match(impReg)
  importWords?.forEach((word) => {
    const dep = /import\s.*?['|"](.*?)['|"]/.exec(word)[1]
    dealWithEachDep(pathname, dep)
  })
  //console.log("-----end of find dep for", formatAbsolute(pathname))
}

module.exports = getDepend
