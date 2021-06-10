#!/usr/bin/env node
const getResult = require("../lib/index")
const root = process.cwd()

// TODO: remove addIgnore
// if (process.argv[2] == "--ignore") {
//   for (var i = 3; i < process.argv.length; i++) {
//     addIgnore.push(process.argv[i])
//   }
// }

getResult(root, [])
