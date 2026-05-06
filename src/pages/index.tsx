import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type NavItem = {
  title: string;
  href: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type EntryItem = {
  title: string;
  description: string;
  href: string;
  tone: 'docs' | 'blog' | 'showcase';
};

function getPrimaryItems(): NavItem[] {
  return [
    {
      title: translate({
        id: 'homepage.link.product',
        message: '产品介绍',
      }),
      href: '/docs/introduction/what-is-larktun',
    },
    {
      title: translate({
        id: 'homepage.link.quickStart',
        message: '快速开始',
      }),
      href: '/docs/getting-started/quick-start',
    },
    {
      title: translate({
        id: 'homepage.link.deploy',
        message: '部署方式与配置',
      }),
      href: '/docs/getting-started/install-and-configure',
    },
    {
      title: translate({
        id: 'homepage.link.troubleshooting',
        message: '问题处理',
      }),
      href: '/docs/troubleshooting/common-issues',
    },
  ];
}

function getGroups(): NavGroup[] {
  return [
    {
      title: translate({
        id: 'homepage.group.product',
        message: '产品',
      }),
      items: [
        {
          title: translate({
            id: 'homepage.link.product',
            message: '产品介绍',
          }),
          href: '/docs/introduction/what-is-larktun',
        },
        {
          title: translate({
            id: 'homepage.link.architecture',
            message: '产品架构',
          }),
          href: '/docs/introduction/product-architecture',
        },
        {
          title: translate({
            id: 'homepage.link.concepts',
            message: '核心概念',
          }),
          href: '/docs/introduction/core-concepts',
        },
      ],
    },
    {
      title: translate({
        id: 'homepage.group.setup',
        message: '接入与部署',
      }),
      items: [
        {
          title: translate({
            id: 'homepage.link.quickStart',
            message: '快速开始',
          }),
          href: '/docs/getting-started/quick-start',
        },
        {
          title: translate({
            id: 'homepage.link.deploy',
            message: '部署方式与配置',
          }),
          href: '/docs/getting-started/install-and-configure',
        },
        {
          title: translate({
            id: 'homepage.link.firstPath',
            message: '开通第一条安全访问链路',
          }),
          href: '/docs/getting-started/publish-your-first-service',
        },
      ],
    },
    {
      title: translate({
        id: 'homepage.group.support',
        message: '支持与内容',
      }),
      items: [
        {
          title: translate({
            id: 'homepage.link.troubleshooting',
            message: '问题处理',
          }),
          href: '/docs/troubleshooting/common-issues',
        },
        {
          title: translate({
            id: 'homepage.link.topics',
            message: '专题指南',
          }),
          href: '/docs/topics/larktun-vs-tailscale-headscale',
        },
        {
          title: translate({
            id: 'homepage.link.blog',
            message: '博客',
          }),
          href: '/blog',
        },
        {
          title: translate({
            id: 'homepage.link.showcase',
            message: '案例展示',
          }),
          href: '/showcase',
        },
      ],
    },
  ];
}

function getEntryItems(): EntryItem[] {
  return [
    {
      title: translate({
        id: 'homepage.entries.docs.title',
        message: '文档',
      }),
      description: translate({
        id: 'homepage.entries.docs.description',
        message: '覆盖产品介绍、部署方式、接入流程和问题处理。',
      }),
      href: '/docs',
      tone: 'docs',
    },
    {
      title: translate({
        id: 'homepage.entries.blog.title',
        message: '博客',
      }),
      description: translate({
        id: 'homepage.entries.blog.description',
        message: '发布记录、最佳实践和内容更新都会沉淀在这里。',
      }),
      href: '/blog',
      tone: 'blog',
    },
    {
      title: translate({
        id: 'homepage.entries.showcase.title',
        message: '使用场景',
      }),
      description: translate({
        id: 'homepage.entries.showcase.description',
        message: '远程研发、IT 运维与企业远程办公等场景入口。',
      }),
      href: '/showcase',
      tone: 'showcase',
    },
  ];
}

function PrimaryList({items}: {items: NavItem[]}): ReactNode {
  return (
    <div className={styles.primaryList}>
      {items.map((item, index) => (
        <Link key={item.href} className={styles.primaryItem} to={item.href}>
          <span className={styles.primaryIndex}>{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.primaryText}>{item.title}</span>
        </Link>
      ))}
    </div>
  );
}

function EntryGrid({items}: {items: EntryItem[]}): ReactNode {
  return (
    <section className={styles.entryGrid}>
      {items.map((item, index) => (
        <Link key={item.href} className={styles.entryCard} data-tone={item.tone} to={item.href}>
          <span className={styles.entryIndex}>{String(index + 1).padStart(2, '0')}</span>
          <Heading as="h3" className={styles.entryTitle}>
            {item.title}
          </Heading>
          <p className={styles.entryDescription}>{item.description}</p>
          <span className={styles.entryAction}>
            <Translate id="homepage.section.all">全部内容</Translate>
          </span>
        </Link>
      ))}
    </section>
  );
}

function GroupList({groups}: {groups: NavGroup[]}): ReactNode {
  return (
    <div className={styles.library}>
      {groups.map((group) => (
        <section key={group.title} className={styles.group}>
          <Heading as="h2" className={styles.groupTitle}>
            {group.title}
          </Heading>
          <div className={styles.groupList}>
            {group.items.map((item) => (
              <Link key={item.href} className={styles.groupItem} to={item.href}>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Home(): ReactNode {
  const primaryItems = getPrimaryItems();
  const entryItems = getEntryItems();
  const groups = getGroups();

  return (
    <Layout
      title={translate({
        id: 'homepage.meta.title',
        message: '云雀通 Larktun 文档：零信任组网与安全远程访问',
      })}
      description={translate({
        id: 'homepage.meta.description',
        message:
          '云雀通 Larktun 文档覆盖零信任组网、远程访问、安全内网访问、设备组网、ACL、多租户、中继、NAS 远程访问、安全 SSH 和移动端访问。',
      })}>
      <main className={styles.page}>
        <div className="container">
          <section className={styles.topShell}>
            <section className={styles.brandPanel}>
              <div className={styles.brandMark}>
                <div className={styles.brandHead}>
                  <span className={styles.brandName}>
                    <Translate id="homepage.panel.brand">云雀通</Translate>
                  </span>
                  <div className={styles.capabilityBadges}>
                    <span className={styles.capabilityBadge}>
                      <Translate id="homepage.hero.badge.mesh">零信任网络</Translate>
                    </span>
                    <span className={styles.capabilityBadge}>
                      <Translate id="homepage.hero.badge.remote">RDP / SSH / VNC 远程控制</Translate>
                    </span>
                    <span className={styles.capabilityBadge}>
                      <Translate id="homepage.hero.badge.audit">MFA / SSO / 审计日志</Translate>
                    </span>
                  </div>
                </div>

                <Heading as="h1" className={styles.title}>
                  <Translate id="homepage.title">云雀通 Larktun 文档中心</Translate>
                </Heading>
                <p className={styles.brandLead}>
                  <Translate id="homepage.panel.title">
                    SaaS 多租户网络、独立 ACL、自定义中继与低占用稳定体验
                  </Translate>
                </p>

                <div className={styles.panelMeta}>
                  <span>
                    <Translate id="homepage.panel.meta.primary">官网内容同步</Translate>
                  </span>
                  <span className={styles.metaDivider} />
                  <span>
                    <Translate id="homepage.panel.meta.secondary">含截图与部署导引</Translate>
                  </span>
                </div>

                <div className={styles.stats}>
                  <span className={styles.statPill}>
                    <Translate id="homepage.stats.devices">免费设备额度</Translate>
                  </span>
                  <span className={styles.statPill}>
                    <Translate id="homepage.stats.rollout">快速开通</Translate>
                  </span>
                </div>
              </div>

              <ul className={styles.highlights}>
                <li>
                  <Translate id="homepage.panel.item.docs">
                    每个租户都拥有隔离网络边界，租户间设备和访问数据互不影响
                  </Translate>
                </li>
                <li>
                  <Translate id="homepage.panel.item.blog">
                    ACL 按租户独立配置和生效，可按用户组、标签和时间窗进行精细授权
                  </Translate>
                </li>
                <li>
                  <Translate id="homepage.panel.item.showcase">
                    支持共享、专用和用户自建中继，满足不同网络和合规要求
                  </Translate>
                </li>
                <li>
                  <Translate id="homepage.panel.item.i18n">
                    客户端低内存后台运行，不打扰终端用户，并保持跨地域访问稳定
                  </Translate>
                </li>
              </ul>

              <div className={styles.brandActions}>
                <Link className={styles.primaryAction} to="/docs/getting-started/quick-start">
                  <Translate id="homepage.link.quickStart">快速开始</Translate>
                </Link>
                <Link
                  className={styles.secondaryAction}
                  to="/docs/getting-started/install-and-configure">
                  <Translate id="homepage.link.deploy">部署方式与配置</Translate>
                </Link>
              </div>
            </section>

            <section className={styles.quickPanel}>
              <span className={styles.quickEyebrow}>
                <Translate id="homepage.section.all">全部内容</Translate>
              </span>
              <Heading as="h2" className={styles.quickTitle}>
                <Translate id="homepage.section.common">常用入口</Translate>
              </Heading>
              <PrimaryList items={primaryItems} />
            </section>
          </section>

          <section className={styles.entriesSection}>
            <div className={styles.entriesHead}>
              <span className={styles.entriesEyebrow}>
                <Translate id="homepage.features.eyebrow">内容架构</Translate>
              </span>
              <Heading as="h2" className={styles.entriesTitle}>
                <Translate id="homepage.features.heading">围绕真实产品能力组织文档内容</Translate>
              </Heading>
            </div>
            <EntryGrid items={entryItems} />
          </section>

          <section className={styles.librarySection}>
            <p className={styles.libraryLead}>
              <Translate id="homepage.features.subheading">
                围绕零信任组网、远程访问、权限治理、部署接入和典型场景，沉淀产品文档、专题指南与实践案例。
              </Translate>
            </p>
            <GroupList groups={groups} />
          </section>
        </div>
      </main>
    </Layout>
  );
}
