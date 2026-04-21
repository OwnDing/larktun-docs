import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
        id: 'homepage.link.architecture',
        message: '产品架构',
      }),
      href: '/docs/introduction/product-architecture',
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
  const {siteConfig} = useDocusaurusContext();
  const primaryItems = getPrimaryItems();
  const groups = getGroups();

  return (
    <Layout
      title={translate(
        {
          id: 'homepage.meta.title',
          message: '{siteTitle} 首页',
        },
        {siteTitle: siteConfig.title},
      )}
      description={translate({
        id: 'homepage.meta.description',
        message: 'Larktun 文档与帮助入口。',
      })}>
      <main className={styles.page}>
        <div className="container">
          <section className={styles.topShell}>
            <section className={styles.brandPanel}>
              <div className={styles.brandMark}>
                <img
                  className={styles.logo}
                  src={useBaseUrl('/img/larktun.png')}
                  alt={siteConfig.title}
                />
                <div className={styles.brandCopy}>
                  <span className={styles.brandName}>Larktun</span>
                  <Heading as="h1" className={styles.title}>
                    <Translate id="homepage.title">文档中心</Translate>
                  </Heading>
                </div>
              </div>
              <div className={styles.brandActions}>
                <Link className={styles.primaryAction} to="/docs/getting-started/quick-start">
                  <Translate id="homepage.link.quickStart">快速开始</Translate>
                </Link>
                <Link
                  className={styles.secondaryAction}
                  to="/docs/introduction/product-architecture">
                  <Translate id="homepage.link.architecture">产品架构</Translate>
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
