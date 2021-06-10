const fs = require("fs")
const getfile = require("./queryAllFileName.js")
const getDep = require("./querydepend.js")

function returnResult(currentRoot, addIgnore) {
  // 得到filename和pathname
  var res = getfile(currentRoot, addIgnore)
  // TODO: 把 output dir 改成从 args 传入
  var { resDep, nodepkgs } = getDep(res, currentRoot)

  fs.writeFileSync("../deps.json", JSON.stringify(resDep))

  fs.writeFileSync("../nodepkgs.json", JSON.stringify(nodepkgs))
}

module.exports = returnResult
