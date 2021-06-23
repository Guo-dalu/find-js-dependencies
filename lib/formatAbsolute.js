const path = require('path')

// TODO: 改成从 shell args 传入
function formatAbsolute(to, from = globalThis.root) {
  return path.relative(from, to)
}

module.exports = formatAbsolute
