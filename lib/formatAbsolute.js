const path = require("path")
const { RELATIVE_ROOT } = require("./constant")

// TODO: 改成从 shell args 传入
function formatAbsolute(to, from = RELATIVE_ROOT) {
  return path.relative(from, to)
}

module.exports = formatAbsolute
