import type {
	AnalyticsConfig,
	CommentsConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "WanY 的博客",
	subtitle: "记录技术、阅读与生活",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 210, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		{ src: "/favicon/avatar-32.png", sizes: "32x32" },
		{ src: "/favicon/avatar-192.png", sizes: "192x192" },
	],
	ogImage: "/og-default.webp", // 社交平台分享图（1200x630），放在 public/ 下
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "友链",
			url: "/links/", // Internal links should not include the base path, as it is automatically added
		},
		{
			name: "GitHub",
			url: "https://github.com/WanY15", // TODO: 换成你自己的 GitHub 主页
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "WanY",
	bio: "前端开发者 / 记录技术与生活",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github", // Visit https://icones.js.org/ for icon codes
			url: "https://github.com/WanY15",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "mailto:hello@example.com", // TODO: 换成你自己的邮箱
		},
		{
			name: "RSS",
			icon: "fa6-solid:rss",
			url: "/rss.xml",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

// ─────────────────────────────────────────────────────────────────────────────
// Giscus 评论（基于 GitHub Discussions，零后端）
// 开启步骤：
//   1. 在 GitHub 仓库 Settings → General → Features 中勾选 Discussions
//   2. 安装 giscus App：https://github.com/apps/giscus
//   3. 打开 https://giscus.app/zh-CN ，填入仓库信息，复制 repoId 和 categoryId
//   4. 把下面的 enable 改为 true，并填入对应信息
// ─────────────────────────────────────────────────────────────────────────────
export const commentsConfig: CommentsConfig = {
	enable: false,
	provider: "giscus",
	giscus: {
		repo: "your-name/your-repo",
		repoId: "R_kgDOxxxxxx",
		category: "Announcements",
		categoryId: "DIC_kwDOxxxxxx",
		mapping: "pathname",
		strict: false,
		reactionsEnabled: true,
		inputPosition: "top",
	},
};

// ─────────────────────────────────────────────────────────────────────────────
// 访问统计：provider 可选 "none" | "umami" | "cloudflare" | "google"
// 填好对应字段后自动在页面 head 注入统计脚本
// ─────────────────────────────────────────────────────────────────────────────
export const analyticsConfig: AnalyticsConfig = {
	provider: "none",
	umami: {
		scriptUrl: "https://cloud.umami.is/script.js", // 自建 Umami 时改成自己的地址
		websiteId: "",
	},
	cloudflare: {
		token: "", // Cloudflare Web Analytics 的 beacon token
	},
	google: {
		measurementId: "", // 形如 G-XXXXXXXXXX
	},
};
