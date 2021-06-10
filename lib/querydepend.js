// 这个文件的目的是收集所有文件中的依赖

var fs = require("fs"),
  path = require("path"),
  reqReg = /require\(['|"](.*?)['|"]\)/g,
  impReg = /import\s.*?['|"](.*?)['|"]/g,
  resDep = [],
  nodepkgs = []

var { EXCLUDE_EXT } = require("./constant.js")
const findExactFile = require("./findExactFile.js")

function getDepend(res, dir) {
  // 根据上一个文件res获得的pathname数组进行依赖收集

  for (let i = 0; i < 2; i++) {
    const item = res.pathname[i]
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
  console.log("----- start find dep for", pathname)

  var data = fs.readFileSync(pathname, "utf-8")
  while ((results1 = reqReg.exec(data)) !== null) {
    console.log(pathname, "has require", results1)
    dealWithEachDep(pathname, results1[1])
  }
  while ((results2 = impReg.exec(data)) !== null) {
    console.log(pathname, " has import", results2)
    dealWithEachDep(pathname, results2[1])
  }
}

module.exports = getDepend
