// 这个文件的目的是收集所有文件中的依赖

var fs = require("fs"),
  path = require("path"),
  reqReg = /require\(['|"](.*?)['|"]\)/g,
  impReg = /import\s.*?['|"](.*?)['|"]/g,
  resDep = [],
  nodepkgs = []

const colors = require("colors")

var { EXCLUDE_EXT } = require("./constant.js")
const findExactFile = require("./findExactFile.js")

function getDepend(res, dir) {
  // 根据上一个文件res获得的pathname数组进行依赖收集

  for (let i = 0; i < res.pathname.length; i++) {
    const item = res.pathname[i]
    console.log(
      ` ${path.relative("/Users/xuemengge/zhihu/heifetz/src", item)}`.green
    )
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
      // console.log(
      //   "--- --------- dep",
      //   path.relative("/Users/xuemengge/zhihu/heifetz", exactDep)
      // )
      resDep.push(exactDep)
      if (!EXCLUDE_EXT.includes(path.extname(exactDep))) {
        getDependRecursively(exactDep)
      }
    }
  } else {
    // node_modules
    nodepkgs.push(target)
  }
}

function getDependRecursively(pathname) {
  // console.log(
  //   "----- start find dep for",
  //   path.relative("/Users/xuemengge/zhihu/heifetz", pathname)
  // )

  var data = fs.readFileSync(pathname, "utf-8")
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
  // console.log(
  //   "-----end of find dep for",
  //   path.relative("/Users/xuemengge/zhihu/heifetz", pathname)
  // )
}

module.exports = getDepend
