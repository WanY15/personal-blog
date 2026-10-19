# 个性化与上线配置指南

本页是所有「占位内容」的替换索引。当前站点保持演示状态不影响开发；等你有正式内容后，按下面这张表逐项替换即可。

## 替换清单速查

| 要替换的内容 | 文件 | 位置 / 说明 |
|---|---|---|
| 站点名、副标题、语言 | `src/config.ts` | `siteConfig.title` / `subtitle` / `lang` |
| 主题色 | `src/config.ts` | `siteConfig.themeColor.hue`（0–360） |
| 横幅开关/图片/位置 | `src/config.ts` + `src/assets/images/banner.png` | `siteConfig.banner` |
| 头像、昵称、简介、社交链接 | `src/config.ts` | `profileConfig` |
| 导航栏 | `src/config.ts` | `navBarConfig`（可用 `LinkPreset.*` 或自定义） |
| 文章版权协议 | `src/config.ts` | `licenseConfig` |
| 默认分享图 | `public/og-default.webp` + `siteConfig.ogImage` | 建议 1200×630 |
| 正式域名 | `astro.config.mjs` | `site: "https://你的域名/"` |
| 文章内容 | `src/content/posts/` | 见下方 frontmatter 说明 |
| 文章置顶 | 文章 frontmatter | `pinned: true`（首页优先展示） |
| 关于页 | `src/content/spec/about.md` | 直接写 Markdown |
| 友链 | `src/pages/links.astro` | 顶部 `friends` 数组 |
| favicon | `public/favicon/` + `siteConfig.favicon` | 当前用 `avatar-32.png` / `avatar-192.png` |
| 评论 | `src/config.ts` 的 `commentsConfig`，或 `.env` | 见下方「评论 Giscus」 |
| 统计 | `src/config.ts` 的 `analyticsConfig`，或 `.env` | 见下方「访问统计」 |
| 部署方式 | `docs/deploy.md` | 5 种平台步骤 |

## 1. 站点信息

```ts
// src/config.ts
export const siteConfig: SiteConfig = {
  title: "你的站点名",
  subtitle: "一句话副标题",
  lang: "zh_CN",
  themeColor: { hue: 210, fixed: false },
  banner: { enable: true, src: "assets/images/banner.png", position: "center", credit: {...} },
  toc: { enable: true, depth: 2 },
  favicon: [{ src: "/favicon/avatar-32.png", sizes: "32x32" }],
  ogImage: "/og-default.webp",
};
```

> 首页/文章页的 SEO 标题、RSS、sitemap 都依赖 `astro.config.mjs` 的 `site`，上线前务必改成正式域名。

## 2. 个人资料与社交链接

```ts
// src/config.ts
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.png", // 或 "/avatar.png" 走 public
  name: "你的昵称",
  bio: "一句话简介",
  links: [
    { name: "GitHub", icon: "fa6-brands:github", url: "https://github.com/你的账号" },
    { name: "Email", icon: "fa6-solid:envelope", url: "mailto:you@example.com" },
    { name: "RSS", icon: "fa6-solid:rss", url: "/rss.xml" },
  ],
};
```

图标可以在 <https://icones.js.org/> 搜索，已内置 `fa6-brands` / `fa6-solid` / `fa6-regular` / `material-symbols` 图标集。

## 3. 写文章与置顶

文章放在 `src/content/posts/`（支持子目录 + 同目录图片），frontmatter：

```yaml
---
title: 文章标题
published: 2026-01-01
description: 一句话摘要（用于列表和 SEO）
image: /covers/cover.webp   # 可选，文章封面/分享图
tags: [标签1, 标签2]
category: 分类名
draft: false
pinned: false               # true 时在首页置顶
---
```

- 新文章：`pnpm new-post <文件名>`
- 草稿：`draft: true` 只在 `pnpm dev` 时可见，构建会排除
- 置顶：`pinned: true`，首页按「置顶优先 + 发布时间倒序」展示
- 标签会自动生成 `/tags/<标签>/` 聚合页，无需手动维护

## 4. 关于页与友链

- 关于页：`src/content/spec/about.md`（保留 `::github{repo="..."}` 卡片可显示仓库信息）
- 友链：`src/pages/links.astro` 顶部 `friends` 数组，改 `name/desc/url/letter/from/to` 即可

## 5. 图片资产

| 资产 | 位置 | 建议 |
|---|---|---|
| 头像 | `src/assets/images/avatar.png` | 512×512，会被 Astro 自动优化 |
| 横幅 | `src/assets/images/banner.png` | 1920×480 左右 |
| 文章封面 | `public/covers/*.webp` | 900×900 方形（卡片右侧缩略图会自动裁切），WebP 压缩 |
| 分享图 | `public/og-default.webp` | 1200×630 |
| favicon | `public/favicon/avatar-32.png` 等 | 32/192 两种尺寸 |

## 6. 评论（Giscus）

基于 GitHub Discussions，免费、零后端，读者用 GitHub 账号登录即可评论（评论数据保存在你仓库的 Discussions 里）。

> ⚠️ 前提：**博客仓库必须是公开（Public）仓库**，否则 giscus 读不到 Discussions。

### 首次配置步骤（约 5 分钟）

1. **把代码推送到公开的 GitHub 仓库**（如果还没做）

   ```bash
   git remote add origin https://github.com/你的账号/仓库名.git
   git push -u origin main
   ```

   然后到仓库 Settings → General → 最下方把仓库可见性改为 **Public**。

2. **开启 Discussions**：仓库 Settings → General → Features → 勾选 **Discussions**。

3. **安装 giscus App**：打开 <https://github.com/apps/giscus> → Install → 选择你的博客仓库授权。

4. **获取两个 ID**：打开 <https://giscus.app/zh-CN>
   - Repository 填 `你的账号/仓库名`（必须已公开且开了 Discussions）
   - Discussion category 选一个分类（推荐 `Announcements`；没有的话先在仓库 Discussions 里建一个）
   - 页面下方会自动生成配置，复制 `data-repo-id`（如 `R_kgDO...`）和 `data-category-id`（如 `DIC_kwDO...`）

5. **填入配置**（二选一）：

   **方式 A：改代码**（本地开发常用）——修改 `src/config.ts`：

   ```ts
   export const commentsConfig: CommentsConfig = {
     enable: true, // 改为 true
     giscus: {
       repo: "你的账号/仓库名",
       repoId: "R_kgDO...",      // 第 4 步拿到
       category: "Announcements",
       categoryId: "DIC_kwDO...", // 第 4 步拿到
       // 其余保持默认
     },
   };
   ```

   **方式 B：环境变量**（部署平台推荐）——复制 `.env.example` 为 `.env`，或在部署平台的环境变量里填：

   ```env
   PUBLIC_GISCUS_REPO=owner/repo
   PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxx
   PUBLIC_GISCUS_CATEGORY=Announcements
   PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxx
   ```

   三项 ID 齐全时会自动启用，无需改源码。注意：`PUBLIC_*` 变量会在构建时写入静态产物，**不要放密钥**。

6. **验证**：本地 `pnpm dev` 打开任意文章页，页面底部应出现评论区；点「使用 GitHub 登录」能正常授权即成功。部署后同理，评论会出现在仓库的 Discussions 中。

### 常见问题

- **评论区空白/报错**：依次检查 ① 仓库是否 Public ② Discussions 是否开启 ③ `repoId`/`categoryId` 是否复制完整 ④ giscus App 是否授权到了这个仓库。
- **主题不跟随明暗模式**：本项目已内置主题同步逻辑，若仍不生效，检查是否被浏览器插件拦截了 iframe。
- **评论管理**：直接去仓库的 Discussions 页面删除/锁定/回复，无需额外后台。

评论主题会自动跟随站点明暗模式切换。

## 7. 访问统计

`src/config.ts` 的 `analyticsConfig`，或 `.env` 中的环境变量：

| 服务 | provider | 需要填的变量 |
|---|---|---|
| Umami | `"umami"` | `PUBLIC_UMAMI_WEBSITE_ID`（自建再加 `PUBLIC_UMAMI_SCRIPT_URL`） |
| Cloudflare Web Analytics | `"cloudflare"` | `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` |
| Google Analytics 4 | `"google"` | `PUBLIC_GA_MEASUREMENT_ID` |

```env
PUBLIC_ANALYTICS_PROVIDER=umami
PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx
```

默认 `none`，不注入任何统计脚本。

> 在 Cloudflare Pages / Vercel 等平台，环境变量改完需要重新部署（重新构建）才会生效。

## 8. 域名与部署

1. 修改 `astro.config.mjs` 的 `site` 为正式域名
2. 参考 `docs/deploy.md` 部署到 Cloudflare Pages / Vercel / Netlify / GitHub Pages / 自建服务器
3. 部署后按 `README.md` 的「上线检查清单」逐项确认

## 9. 界面文案（可选）

界面文案在 `src/i18n/languages/` 下，中文是 `zh_CN.ts`。导航名、按钮、统计单位等都可以在此调整；新增文案 key 需要同步 `src/i18n/i18nKey.ts` 和其他语言文件（类型会强制检查）。
