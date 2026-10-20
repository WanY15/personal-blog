---
title: 写作示例：本站 Markdown 功能一览
published: 2026-10-20
description: "一篇可以直接当模板用的示例文章，覆盖提示框、代码块、数学公式、图片、折叠等本站支持的写法。"
image: /covers/markdown-showcase.webp
tags: [示例, Markdown, 教程]
category: 技术笔记
draft: false
pinned: false
---

这是一篇**示例文章**，也是你以后写文章时可以直接复制修改的模板。它覆盖了本站支持的主要 Markdown 语法，看完这一篇，基本就知道怎么写了。

> 提示：这篇文章本身就在 `src/content/posts/markdown-showcase.md`，你可以直接复制它改出新文章。

## 文本格式

普通段落、**加粗**、*斜体*、~~删除线~~、`行内代码`，以及[外部链接](https://astro.build)和[站内链接](/posts/hello-world/)。

也可以插入键盘按键：<kbd>Ctrl</kbd> + <kbd>S</kbd>。

### 列表

无序列表：

- 第一项
- 第二项
  - 嵌套子项
  - 另一个子项

有序列表：

1. 打开编辑器
2. 新建文章
3. 推送发布

### 引用块

> 写作是把想不清楚的事情，逼着自己想清楚的过程。
>
> —— 大概是这个意思

## 表格

| 功能 | 语法 | 说明 |
| --- | --- | --- |
| 加粗 | `**文字**` | 强调重点 |
| 链接 | `[文字](url)` | 跳转 |
| 行内代码 | `` `code` `` | 等宽显示 |

## 提示框

:::note
普通提示：写文章时值得注意的信息。
:::

:::tip[小技巧]
提示框可以自定义标题，比如这个「小技巧」。
:::

:::important
重要信息，读者应该知道。
:::

:::warning
警告：注意潜在风险。
:::

:::caution
危险操作，三思而后行。
:::

也支持 GitHub 风格的写法：

> [!TIP]
> 这是 GitHub 语法的提示框。

## 代码块

带文件名和行号的代码：

```ts title="src/config.ts" showLineNumbers
export const siteConfig = {
  title: "WanY 的博客",
  lang: "zh_CN",
  themeColor: { hue: 210, fixed: false },
};
```

高亮指定行：

```js {2,4-5}
function greet(name) {
  // 这一行会高亮
  console.log("hello");
  // 这几行也会高亮
  // 这一行也是
}
```

diff 形式：

```diff
+ 新增的一行
- 删除的一行
 不变的一行
```

长代码可以折叠：

```js collapse={1-5}
// 前 5 行默认折叠
// 展开后可以看到全部内容
// ...
// ...
// ...
const visible = true;
```

## 数学公式

行内公式：$E = mc^2$。

块级公式：

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

## 图片

正文配图（放在 `public/images/` 下）：

![正文配图示例](/images/markdown-demo.webp)

封面图则写在 frontmatter 的 `image` 字段里，会显示在文章顶部和列表卡片上。

## 折叠与隐藏内容

答案是 :spoiler[42]，等你真正想评论的时候再展开看。

## 任务清单

- [x] 学会写 frontmatter
- [x] 学会 Markdown 基础语法
- [ ] 写出第一篇真正的文章
- [ ] 把博客绑定到自己的域名

## 卡片与嵌入

GitHub 仓库卡片（会自动获取 star 数等信息）：

::github{repo="saicaca/fuwari"}

视频/网页可以用原始 HTML 嵌入（示例，取消注释即可使用）：

<!--
<iframe src="https://example.com" width="100%" height="400" loading="lazy"></iframe>
-->

## 写完之后

1. `pnpm dev` 本地预览；
2. `git add . && git commit -m "post: xxx" && git push`；
3. Cloudflare 自动构建，1–2 分钟后线上可见。

---

这篇文章的 frontmatter：

```yaml
---
title: 你的标题
published: 2026-10-20
description: 一句话摘要
image: /covers/你的封面.webp
tags: [标签1, 标签2]
category: 分类名
draft: false
pinned: false
---
```

把文件复制一份、改掉标题和内容，就是你的新文章了。
