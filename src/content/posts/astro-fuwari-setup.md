---
title: 用 Astro + Fuwari 搭一个自己的博客
published: 2026-02-14
description: "从模板到自己的站点：记录我用 Astro 和 Fuwari 搭博客的完整过程，以及踩过的几个小坑。"
image: /covers/astro-fuwari-setup.webp
tags: [Astro, 前端, 教程]
category: 技术笔记
draft: false
---

做前端久了，总想有个地方放自己写的东西。前几年试过 Hexo，也用过 Notion 导出站点，最后都因为“折腾不动了”而放弃。今年想认真做一次，要求其实不高：加载要快、样式耐看、我只要写 Markdown 就行。挑了一圈，最后落在 Astro 上，模板用的是 Fuwari。

## 为什么是 Astro

Astro 默认输出静态 HTML，首页几乎没有 JavaScript 负担，这对一个内容为主的博客很重要。它的内容集合（Content Collections）用 Zod 校验 frontmatter，标题、日期、标签这些字段写错了会直接报错，对写文章的人来说是一种很实在的兜底。

Fuwari 则是 Astro 生态里完成度很高的博客主题：明暗色切换、主题色、搜索、文章目录、代码高亮都有，交互做得也舒服，不用我再花一个周末调样式。

## 开始搭

先确认本地环境。Fuwari 文档要求 Node.js 20 以上、pnpm 9 以上，我这边是 Node 20 加 pnpm 9，正好符合。拉代码、装依赖：

```bash
# 克隆模板并进入目录
git clone https://github.com/saicaca/fuwari.git my-blog
cd my-blog

# 安装依赖，sharp 用于图片处理
pnpm install
pnpm add sharp
```

装完依赖先跑一次 `pnpm dev`，确认模板能正常启动，再去动配置。这个顺序能帮我快速判断问题出在环境还是配置上。

然后改 `src/config.ts`：站点标题、副标题、语言（我改成 `zh_CN`）、个人资料卡片和导航栏链接。这一步几乎全是填字工作，但改完站点立刻就有了“自己的”感觉。

:::tip
Windows 下尽量用 PowerShell 7 而不是系统自带的 5.1，执行 pnpm 脚本时少遇到一些编码和路径问题。另外 `node_modules` 别提交进仓库。
:::

## 写第一篇文章

Fuwari 提供了新建文章的命令，也可以自己在 `src/content/posts/` 下建 Markdown 文件。每篇文章的 frontmatter 大致长这样：

```yaml
---
title: 你好，世界
published: 2026-01-10
description: 开工第一篇。
image: /covers/hello-world.png
tags: [随笔, 博客]
category: 生活随笔
draft: false
---
```

字段不多，但有两个地方容易翻车：`published` 要写 `YYYY-MM-DD`，`image` 如果以 `/` 开头，表示相对 `public` 目录的路径。封面图我统一放在 `public/covers/` 下，文件名和文章文件名保持一致，这样以后批量换图也不会乱。

站点配置本身也不复杂，几个常量就能把“Demo 站”换成自己：

```ts
// src/config.ts
export const siteConfig: SiteConfig = {
  title: "WanY 的博客",
  subtitle: "写代码，也写点别的",
  lang: "zh_CN",
  themeColor: { hue: 250, fixed: false },
};
```

## 本地跑起来

`pnpm dev` 启动开发服务器，默认在 4321 端口。写文章的时候页面会热更新，边写边看排版，比改完再构建舒服得多。模板自带 Pagefind 搜索，构建时会自动生成索引，不用额外配置。确认没问题后再 `pnpm build` 生成静态文件；也可以先用 `pnpm preview` 在本地预览生产构建，页面跳转和封面图这类静态资源，预览一遍心里更踏实。

## 部署还没想好

部署这件事我还没定。最省事的是推到 GitHub，用 Vercel 一键导入，每次 push 自动构建，几分钟就能上线；缺点是国内访问速度一般。另一条路是买台小服务器，Nginx 配一个静态目录也能跑，顺便还能练练手。我打算先把内容写起来，等文章攒到十篇再决定。

整个搭建过程花了一个下午，比我想象中顺利。真正花时间的其实不是配置，而是想清楚要写什么——这件事，得靠一篇一篇文章慢慢回答。
