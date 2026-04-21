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

function GroupList({groups}: {groups: NavGroup[]}): ReactNode {
  return (
    <section className={styles.library}>
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
    </section>
  );
}

export default function Home(): ReactNode {
  const primaryItems = getPrimaryItems();
  const groups = getGroups();

  return (
    <Layout
      title={translate({
        id: 'homepage.meta.title',
        message: '文档中心',
      })}
      description={translate({
        id: 'homepage.meta.description',
        message: '云雀通文档与帮助入口。',
      })}>
      <main className={styles.page}>
        <div className="container">
          <section className={styles.topShell}>
            <section className={styles.brandPanel}>
              <div className={styles.brandMark}>
                <div className={styles.brandCopy}>
                  <span className={styles.brandName}>
                    <Translate id="homepage.panel.brand">云雀通</Translate>
                  </span>
                  <Heading as="h1" className={styles.title}>
                    <Translate id="homepage.title">文档中心</Translate>
                  </Heading>
                  <p className={styles.brandLead}>
                    <Translate id="homepage.panel.title">
                      SaaS 多租户网络、独立 ACL、自定义中继与低占用稳定体验
                    </Translate>
                  </p>
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
              <Heading as="h2" className={styles.quickTitle}>
                <Translate id="homepage.section.common">常用入口</Translate>
              </Heading>
              <PrimaryList items={primaryItems} />
            </section>
          </section>

          <GroupList groups={groups} />
        </div>
      </main>
    </Layout>
  );
}
