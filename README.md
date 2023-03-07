Finding all dependencies including js, css or static resources of a js file/folder using BFS by this single nodejs tool. It would produce 2 json arrays, one is the business code, and the other is the names from node_modules.

It would deal with dynamic import and webpack alias situations as well.

一个 bfs 递归找到文件/文件夹所有依赖，所有依赖的依赖的 nodejs 工具，产出 2 个 json 数组，一个是所有业务代码，一个是用到的 node_modules 包。

在 JS-structrue 基础上改的。去掉了生成图像，增加了递归、找外层包、resovle webpack alias, 找 node_modules 等功能。

## 使用方式

git clone 到本地，yarn link 它和待分析的代码。在待分析的代码文件的 package.json 中加个指令，如 `list": "cd src/your-pages-want-to-be-analyzed && find-dep`。执行指令即可。
或者把 bin/index.js 改为手动传入 root (要分析的文件夹)。

还没发包，发了可以这么做：
全局安装：

```
npm install find-js-dependencies -g
```

然后进入需要分析的文件夹，执行

```
find-dep
```

## 备注

自用小工具，代码待整理。待添加 catch error。

待添加 test。
