#!/usr/bin/env node
const getResult = require("../lib/index")
const findExactFile = require("../lib/findExactFile")
const root = process.cwd()

// TODO: remove addIgnore
// if (process.argv[2] == "--ignore") {
//   for (var i = 3; i < process.argv.length; i++) {
//     addIgnore.push(process.argv[i])
//   }
// }

// getResult(
//   "/Users/xuemengge/zhihu/heifetz/src/pages/campaign",
//   [],
//   "/Users/xuemengge/playground/find-js-dependencies/campaign.json"
// )

// getResult(
//   "/Users/xuemengge/zhihu/heifetz/src/server.js",
//   [],
//   "/Users/xuemengge/playground/find-js-dependencies/server.json"
// )

getResult(
  "/Users/xuemengge/zhihu/heifetz/src/apps/sem",
  [],
  "/Users/xuemengge/playground/find-js-dependencies/sem.json"
)

// getResult(
//   "/Users/xuemengge/zhihu/heifetz/src/components/Error/ErrorPage/index.js",
//   [],
//   "/Users/xuemengge/playground/find-js-dependencies/errorpage1.json"
// )

// getResult(
//   "/Users/xuemengge/zhihu/heifetz/src/routes/index.js",
//   [],
//   "/Users/xuemengge/playground/find-js-dependencies/r.json"
// )

// getResult(
//   "/Users/xuemengge/zhihu/heifetz/src/components/AppHeader/MessagesLoader.js",
//   [],
//   "/Users/xuemengge/playground/find-js-dependencies/ml.json"
// )

//findExactFile("/Users/xuemengge/zhihu/heifetz/src/routes/routes")
