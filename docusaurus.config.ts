import {themes as prismThemes} from 'prism-react-renderer';
import {execFileSync} from 'node:child_process';
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

const LEGACY_DOC_CATEGORY_REDIRECTS: Record<string, string> = {
  产品介绍: '/docs/introduction',
  开始上手: '/docs/getting-started',
  问题处理: '/docs/troubleshooting',
};

const NOINDEX_DOC_CATEGORY_PATHS = new Set([
  '/docs/introduction',
  '/docs/getting-started',
  '/docs/troubleshooting',
  '/docs/topics',
]);

function getLocalizedStructuredData(isEnglish: boolean) {
  if (isEnglish) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://larktun.com/#organization',
          name: 'Larktun',
          alternateName: ['云雀通 Larktun', '云雀通'],
          url: 'https://larktun.com',
          logo: 'https://docs.larktun.com/img/larktun.png',
        },
        {
          '@type': 'WebSite',
          '@id': 'https://docs.larktun.com/en/#website',
          name: 'Larktun Docs',
          alternateName: ['Larktun Documentation', '云雀通 Larktun 文档'],
          url: 'https://docs.larktun.com/en/',
          inLanguage: 'en-US',
          publisher: {
            '@id': 'https://larktun.com/#organization',
          },
          about: {
            '@id': 'https://larktun.com/#organization',
          },
        },
      ],
    };
  }

  return {
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
        inLanguage: 'zh-CN',
        publisher: {
          '@id': 'https://larktun.com/#organization',
        },
        about: {
          '@id': 'https://larktun.com/#organization',
        },
      },
    ],
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function stripTrailingSlash(value: string): string {
  return value !== '/' && value.endsWith('/') ? value.slice(0, -1) : value;
}

function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') {
    return '/';
  }

  return pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
}

function shouldIncludeSitemapUrl(url: string): boolean {
  const {pathname} = new URL(url);
  const normalizedPath = stripTrailingSlash(decodeURIComponent(pathname));
  const pathWithoutLocale = stripLocalePrefix(normalizedPath);

  if (
    pathWithoutLocale === '/search' ||
    pathWithoutLocale === '/blog/archive' ||
    pathWithoutLocale === '/blog/authors' ||
    pathWithoutLocale.startsWith('/blog/authors/') ||
    pathWithoutLocale === '/blog/tags' ||
    pathWithoutLocale.startsWith('/blog/tags/') ||
    pathWithoutLocale.startsWith('/blog/page/') ||
    NOINDEX_DOC_CATEGORY_PATHS.has(pathWithoutLocale)
  ) {
    return false;
  }

  return true;
}

let cachedGitLastmodMap: Map<string, string> | null = null;
let cachedBlogSlugFileMap: Map<string, string> | null = null;

function getGitLastmodMap(): Map<string, string> {
  if (cachedGitLastmodMap) {
    return cachedGitLastmodMap;
  }

  const map = new Map<string, string>();
  try {
    const output = execFileSync('git', ['log', '--format=DATE:%cs', '--name-only'], {
      cwd: __dirname,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
    });
    let currentDate = '';
    for (const rawLine of output.split('\n')) {
      const line = rawLine.trim();
      if (!line) {
        continue;
      }
      if (line.startsWith('DATE:')) {
        currentDate = line.slice(5);
        continue;
      }
      if (currentDate && !map.has(line)) {
        map.set(line, currentDate);
      }
    }
  } catch {
    // Ignore git lookup errors outside a git worktree
  }

  cachedGitLastmodMap = map;
  return map;
}

function getFileLastmod(relPath: string): string | undefined {
  const gitMap = getGitLastmodMap();
  const gitDate = gitMap.get(relPath);
  if (gitDate) {
    return gitDate;
  }

  const absPath = path.join(__dirname, relPath);
  if (fs.existsSync(absPath)) {
    return fs.statSync(absPath).mtime.toISOString().slice(0, 10);
  }

  return undefined;
}

function getBlogSlugFileMap(): Map<string, string> {
  if (cachedBlogSlugFileMap) {
    return cachedBlogSlugFileMap;
  }

  const map = new Map<string, string>();
  const blogDirs: Array<{locale: 'zh' | 'en'; relDir: string}> = [
    {locale: 'zh', relDir: 'blog'},
    {locale: 'en', relDir: 'i18n/en/docusaurus-plugin-content-blog'},
  ];

  for (const {locale, relDir} of blogDirs) {
    const absDir = path.join(__dirname, relDir);
    if (!fs.existsSync(absDir)) {
      continue;
    }
    for (const entry of fs.readdirSync(absDir)) {
      if (!entry.endsWith('.mdx') && !entry.endsWith('.md')) {
        continue;
      }
      const relPath = `${relDir}/${entry}`;
      const content = fs.readFileSync(path.join(absDir, entry), 'utf8');
      const slugMatch = content.match(/^slug:\s*['"]?([^\s'"]+)['"]?/m);
      const slug = slugMatch
        ? slugMatch[1].replace(/^\//, '')
        : entry.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
      map.set(`${locale}:${slug}`, relPath);
    }
  }

  cachedBlogSlugFileMap = map;
  return map;
}

function getMaxDate(dates: Array<string | undefined>): string | undefined {
  const valid = dates.filter((d): d is string => Boolean(d));
  if (valid.length === 0) {
    return undefined;
  }
  valid.sort();
  return valid[valid.length - 1];
}

function resolveSitemapLastmod(url: string): string | undefined {
  const {pathname} = new URL(url);
  const normalizedPath = stripTrailingSlash(decodeURIComponent(pathname));
  const isEnglish = normalizedPath === '/en' || normalizedPath.startsWith('/en/');
  const pathWithoutLocale = stripLocalePrefix(normalizedPath);

  if (pathWithoutLocale === '/') {
    return isEnglish
      ? getMaxDate([getFileLastmod('src/pages/index.tsx'), getFileLastmod('i18n/en/code.json')])
      : getFileLastmod('src/pages/index.tsx');
  }

  if (pathWithoutLocale === '/showcase') {
    return getFileLastmod('src/pages/showcase.tsx');
  }

  if (pathWithoutLocale === '/docs') {
    return getFileLastmod(
      isEnglish
        ? 'i18n/en/docusaurus-plugin-content-docs/current/intro.mdx'
        : 'docs/intro.mdx',
    );
  }

  if (pathWithoutLocale.startsWith('/docs/')) {
    const docRel = pathWithoutLocale.slice('/docs/'.length);
    const baseDir = isEnglish ? 'i18n/en/docusaurus-plugin-content-docs/current' : 'docs';
    for (const ext of ['.mdx', '.md']) {
      const candidate = `${baseDir}/${docRel}${ext}`;
      if (fs.existsSync(path.join(__dirname, candidate))) {
        return getFileLastmod(candidate);
      }
    }
  }

  if (pathWithoutLocale === '/blog') {
    const slugMap = getBlogSlugFileMap();
    const prefix = isEnglish ? 'en:' : 'zh:';
    const blogDates: Array<string | undefined> = [];
    for (const [key, relPath] of slugMap.entries()) {
      if (key.startsWith(prefix)) {
        blogDates.push(getFileLastmod(relPath));
      }
    }
    return getMaxDate(blogDates);
  }

  if (pathWithoutLocale.startsWith('/blog/')) {
    const slug = pathWithoutLocale.slice('/blog/'.length);
    const slugMap = getBlogSlugFileMap();
    const relPath = slugMap.get(`${isEnglish ? 'en' : 'zh'}:${slug}`);
    if (relPath) {
      return getFileLastmod(relPath);
    }
  }

  return undefined;
}

function createRedirectHtml(to: string): string {
  const escapedTarget = escapeHtml(to);
  const escapedCanonical = escapeHtml(`https://docs.larktun.com${to}`);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <meta name="description" content="Redirecting to the current Larktun documentation page.">
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

function walkHtmlFiles(dir: string, results: string[] = []): string[] {
  if (!fs.existsSync(dir)) {
    return results;
  }
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function injectNoindexMeta(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  if (/<meta\b[^>]*\bname=(?:"robots"|'robots'|robots)(?=[\s/>])/i.test(html)) {
    return;
  }
  const updated = html.replace('</head>', '<meta name="robots" content="noindex, follow"></head>');
  if (updated !== html) {
    fs.writeFileSync(filePath, updated);
  }
}

function larktunSeoPlugin(context: {i18n: {currentLocale: string}}) {
  const isEnglish = context.i18n.currentLocale === 'en';
  const localePrefix = isEnglish ? '/en' : '';
  const siteName = isEnglish ? 'Larktun Docs' : '云雀通 Larktun 文档';
  const structuredData = getLocalizedStructuredData(isEnglish);

  return {
    name: 'larktun-seo-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'meta',
            attributes: {
              name: 'application-name',
              content: siteName,
            },
          },
          {
            tagName: 'meta',
            attributes: {
              property: 'og:site_name',
              content: siteName,
            },
          },
          {
            tagName: 'script',
            attributes: {
              type: 'application/ld+json',
            },
            innerHTML: JSON.stringify(structuredData),
          },
        ],
      };
    },
    postBuild({outDir}: {outDir: string}) {
      // 1. Keep legacy Chinese tag & doc category redirects
      Object.entries(LEGACY_CHINESE_TAG_REDIRECTS).forEach(([legacyTag, targetTag]) => {
        const filePath = path.join(outDir, 'blog', 'tags', `${legacyTag}.html`);
        const targetPath = `${localePrefix}/blog/tags/${targetTag}`;

        fs.mkdirSync(path.dirname(filePath), {recursive: true});
        fs.writeFileSync(filePath, createRedirectHtml(targetPath));
      });

      if (!isEnglish) {
        Object.entries(LEGACY_DOC_CATEGORY_REDIRECTS).forEach(([legacyCategory, targetPath]) => {
          const filePath = path.join(outDir, 'docs', 'category', `${legacyCategory}.html`);

          fs.mkdirSync(path.dirname(filePath), {recursive: true});
          fs.writeFileSync(filePath, createRedirectHtml(targetPath));
        });
      }

      // 2. Apply noindex, follow to low-value aggregation / pagination / generated-index pages
      const noindexFiles = [
        path.join(outDir, 'blog', 'tags.html'),
        path.join(outDir, 'blog', 'archive.html'),
        path.join(outDir, 'blog', 'authors.html'),
        path.join(outDir, 'docs', 'introduction.html'),
        path.join(outDir, 'docs', 'getting-started.html'),
        path.join(outDir, 'docs', 'troubleshooting.html'),
        path.join(outDir, 'docs', 'topics.html'),
        ...walkHtmlFiles(path.join(outDir, 'blog', 'tags')),
        ...walkHtmlFiles(path.join(outDir, 'blog', 'page')),
        ...walkHtmlFiles(path.join(outDir, 'blog', 'authors')),
      ];
      for (const filePath of noindexFiles) {
        injectNoindexMeta(filePath);
      }

      // 3. Fix @easyops-cn/docusaurus-search-local invalid property="robots" attribute (must be name="robots")
      const searchHtmlPath = path.join(outDir, 'search.html');
      if (fs.existsSync(searchHtmlPath)) {
        let html = fs.readFileSync(searchHtmlPath, 'utf8');
        html = html.replace(/\bproperty=(?:"robots"|'robots'|robots)(?=[\s/>])/gi, 'name="robots"');
        if (isEnglish) {
          html = html.replace(
            /(<meta\b[^>]*\bproperty=(?:"og:title"|'og:title'|og:title)(?=[\s/>])[^>]*\bcontent=)"云雀通 Larktun 文档"/gi,
            '$1"Larktun Docs"',
          );
          html = html.replace(/\bhref=(?:"\/search"|'\/search'|\/search)(?=[\s>/])/g, 'href="/en/search"');
        }
        fs.writeFileSync(searchHtmlPath, html);
      }

      // 4. Fix BreadcrumbList trailing slash on /docs and /en/docs hub page
      const docsHubPath = path.join(outDir, 'docs.html');
      if (fs.existsSync(docsHubPath)) {
        let html = fs.readFileSync(docsHubPath, 'utf8');
        const expectedHubUrl = `https://docs.larktun.com${localePrefix}/docs`;
        html = html.replaceAll(`"${expectedHubUrl}/"`, `"${expectedHubUrl}"`);
        fs.writeFileSync(docsHubPath, html);
      }

      // 5. Localize English RSS/Atom feed titles in HTML <head> and XML files
      if (isEnglish) {
        for (const htmlFile of walkHtmlFiles(outDir)) {
          const html = fs.readFileSync(htmlFile, 'utf8');
          const updated = html
            .replaceAll('title="云雀通 Larktun 文档 RSS Feed"', 'title="Larktun Docs RSS Feed"')
            .replaceAll('title="云雀通 Larktun 文档 Atom Feed"', 'title="Larktun Docs Atom Feed"');
          if (updated !== html) {
            fs.writeFileSync(htmlFile, updated);
          }
        }

        for (const feedName of ['rss.xml', 'atom.xml']) {
          const feedPath = path.join(outDir, 'blog', feedName);
          if (fs.existsSync(feedPath)) {
            const xml = fs.readFileSync(feedPath, 'utf8');
            const updated = xml
              .replaceAll('云雀通 Larktun 文档 Blog', 'Larktun Blog')
              .replaceAll('云雀通 Larktun 文档', 'Larktun Docs');
            if (updated !== xml) {
              fs.writeFileSync(feedPath, updated);
            }
          }
        }
      }
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
  trailingSlash: false,

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
            title: 'Larktun Blog',
            description:
              'Larktun Blog: zero-trust networking, secure remote access, Headscale scaling, mobile networking, and SSH engineering guides.',
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
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
          createSitemapItems: async ({routes, siteConfig, defaultCreateSitemapItems}) => {
            const items = await defaultCreateSitemapItems({routes, siteConfig});

            return items
              .filter((item) => shouldIncludeSitemapUrl(item.url))
              .map((item) => {
                const realLastmod = resolveSitemapLastmod(item.url);
                return realLastmod ? {...item, lastmod: realLastmod} : item;
              });
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    larktunSeoPlugin,
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
        {
          href: 'https://larktun.com/auth/login',
          label: '登录',
          position: 'right',
          className: 'navbar-auth-link navbar-auth-link--login',
          target: '_self',
          rel: 'nofollow',
        },
        {
          href: 'https://larktun.com/auth/register',
          label: '注册',
          position: 'right',
          className: 'navbar-auth-link navbar-auth-link--register',
          target: '_self',
          rel: 'nofollow',
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
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Larktun. <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">浙ICP备2026024619号-1</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
