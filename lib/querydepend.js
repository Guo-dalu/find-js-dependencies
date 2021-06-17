const fs = require("fs")
const path = require("path")
const colors = require("colors")
const { EXCLUDE_EXT, INCLUDE_EXT } = require("./constant.js")
const formatAbsolute = require("./formatAbsolute")
const findExactFile = require("./findExactFile.js")

const reqReg = /require\s[\s\S]*?['|"]([\s\S]*?)['|"]/g
const impReg = /import\s[\s\S]*?['|"]([\s\S]*?)['|"]/g
const exportReg = /export\s[\s\S]*?['|"]([\s\S]*?)['|"]/g

const resDep = []
const nodepkgs = []
const searchedFiles = []

function getDepend(res, dir) {
  for (let i = 0; i < res.pathname.length; i++) {
    const item = res.pathname[i]
    console.log(`${formatAbsolute(item)}`.green)
    getDependRecursively(item)
  }
  console.log(`共找到 ${resDep.length} 个项目内文件依赖`.blue)
  return { resDep, nodepkgs }
}

const dealWithEachDep = (pathname, target) => {
  console.log({ target })
  if (target.startsWith(".") || target.startsWith("~")) {
    const dependencyPath = target.startsWith(".")
      ? path.resolve(pathname, "..", target)
      : path.resolve("/Users/xuemengge/zhihu/heifetz/src", target.slice(2))
    const exactDep = findExactFile(dependencyPath)
    const formattedDep = formatAbsolute(exactDep)
    if (!resDep.includes(formattedDep)) {
      //console.log(formatAbsolute(exactDep).red)
      resDep.push(formattedDep)
      if (
        !EXCLUDE_EXT.includes(path.extname(exactDep)) &&
        !searchedFiles.includes(exactDep)
      ) {
        getDependRecursively(exactDep)
      }
    }
  } else {
    // node_modules
    if (!nodepkgs.includes(target)) {
      nodepkgs.push(target)
    }
  }
}

function getDependRecursively(pathname) {
  if (!INCLUDE_EXT.includes(path.extname(pathname))) {
    return
  }
  console.log("----- start find dep for", formatAbsolute(pathname))
  searchedFiles.push(pathname)

  const data = fs.readFileSync(pathname, "utf-8")
  const requireWords = data.match(reqReg)
  requireWords?.forEach((word) => {
    const dep = /require\s[\s\S]*?['|"]([\s\S]*?)['|"]/.exec(word)[1]
    dealWithEachDep(pathname, dep)
  })

  const importWords = data.match(impReg)
  importWords?.forEach((word) => {
    const dep = /import\s[\s\S]*?['|"]([\s\S]*?)['|"]/.exec(word)[1]
    dealWithEachDep(pathname, dep)
  })

  const exportDepWords = data.match(exportReg)
  exportDepWords?.forEach((word) => {
    if (word.includes("from")) {
      const dep = /export\s[\s\S]*?['|"]([\s\S]*?)['|"]/.exec(word)[1]
      dealWithEachDep(pathname, dep)
    }
  })

  console.log("-----end of find dep for", formatAbsolute(pathname))
}

module.exports = getDepend
