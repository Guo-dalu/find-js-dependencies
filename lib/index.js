// 这个模块是用于返回最后的结果

var getfile = require("./queryAllFileName.js"),
  getDep = require("./querydepend.js"),
  formatAbsolute = require("./formatAbsolute.js"),
  arrUniq = require("./arrayUniq.js"),
  getNodes = require("./getNodes.js")

var fs = require("fs")
function returnResult(currentRoot, addIgnore) {
  // 得到filename和pathname
  var res = getfile(currentRoot, addIgnore)
  fs.writeFileSync("../res.json", JSON.stringify(res.pathname))
  var { resDep, nodepkgs } = getDep(res, currentRoot)

  fs.writeFileSync("../deps.json", JSON.stringify(resDep))

  fs.writeFileSync("../nodepkgs.json", JSON.stringify(nodepkgs))
}

module.exports = returnResult
