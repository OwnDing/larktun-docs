import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '云雀通',
  tagline: 'Zero-trust networking and remote access documentation',
  favicon: 'img/larktun.png',

  future: {
    v4: true,
  },

  url: 'https://larktun.com',
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
          showReadingTime: true,
          blogTitle: '云雀通博客',
          blogDescription: '发布记录、实践经验与案例沉淀',
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
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/larktun-social-card.svg',
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
      copyright: `Copyright © ${new Date().getFullYear()} Larktun. Built with Docusaurus 3.10.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
