import {themes as prismThemes} from 'prism-react-renderer';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const LEGACY_CHINESE_TAG_REDIRECTS: Record<string, string> = {
  云雀通: 'larktun',
  远程访问: 'remote-access',
  零信任网络: 'zero-trust-networking',
  远程办公: 'remote-work',
  移动端: 'mobile',
  服务器: 'server-access',
  多租户: 'multi-tenant',
  镜像构建: 'image-build',
  编译打包: 'build',
  集群: 'cluster',
  压测: 'stress-test',
  迁移: 'migration',
  扩展: 'scalability',
};

const LARKTUN_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://larktun.com/#organization',
      name: '云雀通 Larktun',
      alternateName: ['云雀通', 'Larktun'],
      url: 'https://larktun.com',
      logo: 'https://docs.larktun.com/img/larktun.png',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://docs.larktun.com/#website',
      name: '云雀通 Larktun 文档',
      alternateName: ['云雀通文档', 'Larktun Docs', 'Larktun Documentation'],
      url: 'https://docs.larktun.com',
      inLanguage: ['zh-CN', 'en-US'],
      publisher: {
        '@id': 'https://larktun.com/#organization',
      },
      about: {
        '@id': 'https://larktun.com/#organization',
      },
    },
  ],
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function createRedirectHtml(to: string): string {
  const escapedTarget = escapeHtml(to);
  const escapedCanonical = escapeHtml(`https://docs.larktun.com${to}`);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta name="description" content="Redirecting to the current Larktun blog tag page.">
  <link rel="canonical" href="${escapedCanonical}">
  <meta http-equiv="refresh" content="0; url=${escapedTarget}">
  <title>Redirecting...</title>
</head>
<body>
  <h1>Redirecting</h1>
  <p>Redirecting to <a href="${escapedTarget}">${escapedTarget}</a>.</p>
  <script>window.location.replace(${JSON.stringify(to)});</script>
</body>
</html>
`;
}

function larktunSeoRedirectsPlugin(context: {i18n: {currentLocale: string}}) {
  const isEnglish = context.i18n.currentLocale === 'en';
  const localePrefix = isEnglish ? '/en' : '';

  return {
    name: 'larktun-seo-redirects',
    postBuild({outDir}: {outDir: string}) {
      Object.entries(LEGACY_CHINESE_TAG_REDIRECTS).forEach(([legacyTag, targetTag]) => {
        const filePath = path.join(outDir, 'blog', 'tags', legacyTag, 'index.html');
        const targetPath = `${localePrefix}/blog/tags/${targetTag}/`;

        fs.mkdirSync(path.dirname(filePath), {recursive: true});
        fs.writeFileSync(filePath, createRedirectHtml(targetPath));
      });
    },
  };
}

const config: Config = {
  title: '云雀通 Larktun 文档',
  tagline: '零信任组网、远程访问与安全内网访问文档',
  favicon: 'img/larktun.png',

  future: {
    v4: true,
  },

  url: 'https://docs.larktun.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        htmlLang: 'zh-CN',
        label: '简体中文',
      },
      en: {
        htmlLang: 'en-US',
        label: 'English',
        path: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          tags: 'tags.yml',
          showReadingTime: true,
          blogTitle: '云雀通 Larktun 博客',
          blogDescription:
            '云雀通 Larktun 博客，发布零信任组网、远程访问、Headscale、移动端访问、安全 SSH 与案例实践文章。',
          blogSidebarTitle: '最新文章',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        gtag: {
          trackingID: 'G-BYSVRTJ75M',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    larktunSeoRedirectsPlugin,
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'zh'],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 90,
        explicitSearchResultPath: true,
        highlightSearchTermsOnTargetPage: true,
        searchBarPosition: 'right',
      },
    ],
  ],

  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(LARKTUN_STRUCTURED_DATA),
    },
  ],

  themeConfig: {
    image: 'img/larktun-social-card.svg',
    metadata: [
      {
        name: 'application-name',
        content: '云雀通 Larktun 文档',
      },
      {
        property: 'og:site_name',
        content: '云雀通 Larktun 文档',
      },
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    navbar: {
      title: '云雀通',
      hideOnScroll: true,
      logo: {
        alt: 'Larktun Logo',
        src: 'img/larktun.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '文档',
        },
        {to: '/blog', label: '博客', position: 'left'},
        {to: '/showcase', label: '案例展示', position: 'left'},
        {
          href: 'https://larktun.com',
          label: '官方网站',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://larktun.com/auth/login',
          label: '登录',
          position: 'right',
          className: 'navbar-auth-link navbar-auth-link--login',
          target: '_self',
        },
        {
          href: 'https://larktun.com/auth/register',
          label: '注册',
          position: 'right',
          className: 'navbar-auth-link navbar-auth-link--register',
          target: '_self',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '产品介绍',
              to: '/docs/introduction/what-is-larktun',
            },
            {
              label: '开始上手',
              to: '/docs/getting-started/quick-start',
            },
            {
              label: '问题处理',
              to: '/docs/troubleshooting/common-issues',
            },
          ],
        },
        {
          title: '内容',
          items: [
            {
              label: '博客',
              to: '/blog',
            },
            {
              label: '案例展示',
              to: '/showcase',
            },
            {
              label: '文档首页',
              to: '/docs',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'larktun.com',
              href: 'https://larktun.com',
            },
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Larktun. Built with Docusaurus 3.10. <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">浙ICP备2026024619号-1</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
