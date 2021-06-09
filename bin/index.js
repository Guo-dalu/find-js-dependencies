#!/usr/bin/env node
var path = require("path"),
  fs = require("fs"),
  getResult = require("../lib/index"),
  root = process.cwd(),
  addIgnore = [],
  result = {
    name: "代码结构",
    type: "chord",
    sort: "ascending",
    sortSub: "descending",
    ribbonType: false,
    radius: "60%",
    itemStyle: {
      normal: {
        label: {
          rotate: true,
        },
      },
    },
    minRadius: 7,
    maxRadius: 20,
  }

if (process.argv[2] == "--ignore") {
  for (var i = 3; i < process.argv.length; i++) {
    addIgnore.push(process.argv[i])
  }
}

var nodeAndLinks = getResult(root, addIgnore)

// var output = fs.createWriteStream("./output.html")

// frontHtml.on("data", function (d) {
//   output.write(d)
// })
// frontHtml.on("error", function (err) {
//   throw err
// })
// frontHtml.on("end", function () {
//   output.write(strResult)
//   endHtml.on("data", function (d) {
//     output.write(d)
//   })
//   endHtml.on("error", function (err) {
//     throw err
//   })
//   endHtml.on("end", function () {
//     output.end()
//   })
// })
// open("output.html")
