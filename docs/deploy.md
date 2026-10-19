# 部署指南

本项目是纯静态站点：构建命令 `pnpm build`，产物目录 `dist/`。任何能托管静态文件的服务都可以用。

部署前请先完成两件事：

1. 把 [`astro.config.mjs`](../astro.config.mjs) 里的 `site` 改成你的正式域名，例如 `https://blog.example.com/`（影响 RSS、sitemap、OG 图片的绝对链接）。
2. 确认 `pnpm build` 在本地可以成功执行。

---

## 方式一：Cloudflare Pages（推荐）

免费、自带 CDN、国内访问相对友好，支持 Git 自动部署。

1. 把仓库推送到 GitHub / Gitee。
2. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create → Pages → Connect to Git，选择仓库。
3. 构建设置：
   - Framework preset：`Astro`
   - Build command：`pnpm build`
   - Build output directory：`dist`
   - Node version：`20` 或更高（环境变量 `NODE_VERSION=22`）
4. 部署完成后在 Pages 项目的 Custom domains 里绑定自己的域名。

> 也可以使用手动部署：本地执行 `pnpm build`，然后 `npx wrangler pages deploy dist --project-name=你的项目名`。

## 方式二：Vercel

1. 打开 [Vercel](https://vercel.com/) → Add New Project → 导入仓库。
2. Framework Preset 选 `Astro`，Build Command `pnpm build`，Output Directory `dist`。
3. 在 Settings → Domains 绑定域名。
4. 每次 push 自动构建并发布；PR 会自动生成预览地址。

## 方式三：Netlify

1. 导入仓库，Build command 填 `pnpm build`，Publish directory 填 `dist`。
2. 建议在根目录加一个 `netlify.toml`：

```toml
[build]
  command = "pnpm build"
  publish = "dist"
```

## 方式四：GitHub Pages

如果仓库部署在 GitHub Pages 的子路径（例如 `https://用户名.github.io/仓库名/`），必须同时配置 `site` 和 `base`：

```js
// astro.config.mjs
site: "https://用户名.github.io",
base: "/仓库名/",
```

然后在 `.github/workflows/` 中增加一个部署工作流（也可以用官方 `withastro/action`）：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

> 使用自定义域名（且站点在根路径）时，把 `base` 改回 `/`。

## 方式五：自建服务器（Nginx / Caddy）

```bash
pnpm build
rsync -avz --delete dist/ user@yourserver:/var/www/blog/
```

Nginx 示例（需要 HTTPS 时用 certbot 申请证书）：

```nginx
server {
    listen 443 ssl;
    server_name blog.example.com;
    root /var/www/blog;
    index index.html;
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

Caddy 更简单（自动 HTTPS）：

```caddyfile
blog.example.com {
    root * /var/www/blog
    try_files {path} {path}.html {path}/index.html
    file_server
}
```

## 自动部署到 Cloudflare Pages（GitHub Actions）

仓库里已经提供了 `.github/workflows/deploy.yml`，触发方式为手动（workflow_dispatch）。使用前在仓库 Settings → Secrets and variables → Actions 中配置：

- `CLOUDFLARE_API_TOKEN`：Cloudflare API Token（权限：Cloudflare Pages — Edit）
- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare 账户 ID

如果希望 push 到 main 自动部署，把 `deploy.yml` 里的 `workflow_dispatch` 换成 `push` 触发即可。

## 部署后检查清单

- [ ] 首页、文章页、关于、友链、404 页面都能正常打开
- [ ] `/rss.xml`、`/sitemap-index.xml` 可访问，且里面是正式域名
- [ ] 分享文章到微信/Twitter 时有正确的标题、描述和图片（OG 信息）
- [ ] Pagefind 搜索可用（构建时会生成 `dist/pagefind/`）
- [ ] 若启用了评论/统计，确认配置已生效且没有报错
- [ ] 提交站点到 Google Search Console / Bing Webmaster / 百度搜索资源平台
- [ ] 检查移动端首屏与导航显示
