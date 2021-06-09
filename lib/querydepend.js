// 这个文件的目的是收集所有文件中的依赖

var fs = require("fs"),
  path = require("path"),
  reqReg = /require\(['|"](.*?)['|"]\)/g,
  impReg = /import\s.*?['|"](.*?)['|"]/g,
  resDep = [],
  nodepkgs = []

var { EXCLUDE_EXT } = require("./constant.js")

function getDepend(res, dir) {
  // 根据上一个文件res获得的pathname数组进行依赖收集

  for (let i = 0; i < 3; i++) {
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
    console.log(dependencyPath, path.extname(dependencyPath))
    if (!resDep.includes(dependencyPath)) {
      resDep.push(dependencyPath)
    }
    getDependRecursively(dependencyPath)
  } else {
    // node_modules
    nodepkgs.push(target)
  }
}

function getDependRecursively(pathname) {
  if (EXCLUDE_EXT.includes(path.extname(pathname))) {
    return
  }
  var data = fs.readFileSync(pathname, "utf-8")
  while ((results = reqReg.exec(data)) !== null) {
    dealWithEachDep(pathname, results[1])
  }
  while ((results = impReg.exec(data)) !== null) {
    dealWithEachDep(pathname, results[1])
  }
}

module.exports = getDepend
