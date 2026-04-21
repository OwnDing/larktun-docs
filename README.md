# Larktun Docs

`larktun.com` 的帮助文档网站，基于 [Docusaurus 3.10.0](https://docusaurus.io/) 搭建，当前内容聚焦：

- 产品文档：网站介绍、开始上手、问题处理
- 博客：发布记录、实践经验、内容规划
- 案例展示：典型场景与落地方式
- 国际化：默认中文，英文位于英语 locale 目录

文档主线围绕：SaaS 多租户隔离、租户级 ACL、自定义中继服务器、低内存不打扰与稳定性。

## 本地运行

```bash
npm install
npm start
```

默认开发地址为 `http://localhost:3000/`，英文内容可在 `http://localhost:3000/en/` 预览。

## 生产构建

```bash
npm run build
```

构建产物会输出到 `build/` 目录。

## 主要目录

```text
.
├── blog/                         # 中文博客内容
├── docs/                         # 中文文档内容
├── i18n/en/                      # 英文翻译内容与界面文案
├── src/pages/                    # 首页、案例页等页面
├── src/components/               # 复用组件
├── src/css/custom.css            # 全局主题变量与样式
├── docusaurus.config.ts          # 站点配置
└── sidebars.ts                   # 文档侧边栏
```

## 常用命令

```bash
npm run start
npm run build
npm run serve
npm run write-translations -- --locale en
```

## GitHub 部署

仓库已内置 GitHub Pages 工作流配置：

- 工作流文件：[.github/workflows/deploy-pages.yml](/Users/ownding/Documents/develop/larktun-docs/.github/workflows/deploy-pages.yml)
- 默认在 `main` 分支推送后自动构建并发布
- 已补充 `static/CNAME`，推送到 GitHub Pages 后可直接用于 `larktun.com`

## 后续扩展建议

- 补充字段级配置示例与更多真实排障案例
- 增加站内搜索、分析与可观测性指标页面
- 按版本节奏持续更新博客与案例页
