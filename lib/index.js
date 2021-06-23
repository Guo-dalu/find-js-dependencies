const fs = require('fs')
const path = require('path')
const { shell } = require('execa')
const getfile = require('./queryAllFileName.js')
const getDep = require('./querydepend.js')

const getCodeExceptSrc = () => {
  const files = fs.readdirSync(globalThis.root)
  return files
    .filter((file) => path.basename(file) !== 'src')
    .map((file) => path.relative(process.cwd(), file))
}

function returnResult(currentRoot, outfile) {
  const res = getfile(currentRoot)
  const { resDep, nodepkgs } = getDep(res)

  fs.writeFileSync(`../${outfile}-res.json`, JSON.stringify(resDep))
  fs.writeFileSync(`../${outfile}-nodepkgs.json`, JSON.stringify(nodepkgs))

  return resDep
}

const mapFile = (file) => ` --path ${file}`

async function filterRepo(targetPath, modulePath) {
  globalThis.root = targetPath
  const resDep = returnResult(
    `${targetPath}/${modulePath}`,
    modulePath.slice(modulePath.lastIndexOf('/') + 1)
  )
  const deps = resDep.filter((dep) => !dep.includes(modulePath))
  const codeExceptSrcs = getCodeExceptSrc()

  const cmd = `cd ${targetPath} && git filter-repo --path ${modulePath} --path src/styles ${codeExceptSrcs
    .map(mapFile)
    .join('')} ${deps.map(mapFile).join('')} --force`

  await shell(cmd)
}

module.exports = filterRepo
