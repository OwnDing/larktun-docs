import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function getStats() {
  return [
    {
      value: '2',
      label: translate({
        id: 'homepage.stats.locales',
        message: '支持语言',
      }),
    },
    {
      value: '3',
      label: translate({
        id: 'homepage.stats.sections',
        message: '核心内容板块',
      }),
    },
    {
      value: '3.10',
      label: translate({
        id: 'homepage.stats.version',
        message: 'Docusaurus 版本',
      }),
    },
  ];
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const stats = getStats();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>Docusaurus 3.10</span>
              <span className={styles.heroBadge}>
                <Translate id="homepage.hero.badge.i18n">中英文双语</Translate>
              </span>
              <span className={styles.heroBadge}>
                <Translate id="homepage.hero.badge.content">文档 + 博客 + 案例</Translate>
              </span>
            </div>
            <Heading as="h1" className={styles.heroTitle}>
              <Translate id="homepage.hero.title">
                Larktun 文档、博客与案例平台
              </Translate>
            </Heading>
            <p className={styles.heroSubtitle}>
              <Translate id="homepage.hero.subtitle">
                为 larktun.com 提供统一的产品说明、快速上手、问题处理与实践沉淀入口。
              </Translate>
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs">
                <Translate id="homepage.hero.primaryCta">查看文档</Translate>
              </Link>
              <Link className="button button--secondary button--lg" to="/showcase">
                <Translate id="homepage.hero.secondaryCta">浏览案例</Translate>
              </Link>
              <Link className={styles.ghostLink} to="/blog">
                <Translate id="homepage.hero.tertiaryCta">阅读博客</Translate>
              </Link>
            </div>
            <div className={styles.statGrid}>
              {stats.map((item) => (
                <div key={item.label} className={styles.statCard}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className={styles.heroPanel}>
            <span className={styles.panelEyebrow}>
              <Translate id="homepage.panel.eyebrow">站点框架已就绪</Translate>
            </span>
            <Heading as="h2" className={styles.panelTitle}>
              <Translate id="homepage.panel.title">
                开箱即可继续填充真实产品内容
              </Translate>
            </Heading>
            <ul className={styles.panelList}>
              <li>
                <Translate id="homepage.panel.item.docs">
                  文档已拆分为网站介绍、开始上手、问题处理三大模块
                </Translate>
              </li>
              <li>
                <Translate id="homepage.panel.item.blog">
                  博客已预置发布记录与内容规划示例文章
                </Translate>
              </li>
              <li>
                <Translate id="homepage.panel.item.showcase">
                  案例展示页可承载客户案例、解决方案和典型场景
                </Translate>
              </li>
              <li>
                <Translate id="homepage.panel.item.i18n">
                  默认中文，英文内容与界面文案已留出翻译结构
                </Translate>
              </li>
            </ul>
            <div className={styles.panelMeta}>
              <span>{siteConfig.title}</span>
              <span>
                <Translate id="homepage.panel.meta">帮助文档中心框架</Translate>
              </span>
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
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
        message:
          'Larktun 文档站点框架，包含产品文档、博客与案例展示，并支持中文和英文双语。',
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
