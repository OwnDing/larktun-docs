import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type SnapshotItem = {
  src: string;
  title: string;
  description: string;
};

function getStats() {
  return [
    {
      value: '5',
      label: translate({
        id: 'homepage.stats.devices',
        message: '免费设备额度',
      }),
    },
    {
      value: '15 min',
      label: translate({
        id: 'homepage.stats.rollout',
        message: '极速部署',
      }),
    },
    {
      value: '3.10',
      label: translate({
        id: 'homepage.stats.controlPlane',
        message: '文档基于 Docusaurus 3.10',
      }),
    },
  ];
}

function getSnapshots(): SnapshotItem[] {
  return [
    {
      src: '/img/larktun-homepage.png',
      title: translate({
        id: 'homepage.snapshots.console.title',
        message: '官网首页与控制台能力概览',
      }),
      description: translate({
        id: 'homepage.snapshots.console.description',
        message:
          '展示零信任网络、远程控制、安全能力与典型场景，是文档站点承接产品说明的最佳入口。',
      }),
    },
    {
      src: '/img/larktun-pricing.png',
      title: translate({
        id: 'homepage.snapshots.pricing.title',
        message: '套餐与扩展路径预览',
      }),
      description: translate({
        id: 'homepage.snapshots.pricing.description',
        message:
          '当前官网展示了免费版、团队版与专业版的扩展路径，适合在文档中配合部署方案一起说明。',
      }),
    },
  ];
}

function SnapshotSection(): ReactNode {
  const snapshots = getSnapshots();

  return (
    <section className={styles.snapshotSection}>
      <div className="container">
        <div className={styles.snapshotHeader}>
          <span className={styles.snapshotEyebrow}>
            <Translate id="homepage.snapshots.eyebrow">产品预览</Translate>
          </span>
          <Heading as="h2" className={styles.snapshotTitle}>
            <Translate id="homepage.snapshots.heading">
              从官网截图把产品能力与套餐说明直接带进帮助中心
            </Translate>
          </Heading>
          <p className={styles.snapshotDescription}>
            <Translate id="homepage.snapshots.subheading">
              当前文档站已经内置真实官网截图，后续可以继续追加控制台、设备详情和审计页的界面说明。
            </Translate>
          </p>
        </div>
        <div className={styles.snapshotGrid}>
          {snapshots.map((item) => (
            <article key={item.title} className={styles.snapshotCard}>
              <img
                className={styles.snapshotImage}
                src={useBaseUrl(item.src)}
                alt={item.title}
                loading="lazy"
              />
              <div className={styles.snapshotBody}>
                <Heading as="h3" className={styles.snapshotCardTitle}>
                  {item.title}
                </Heading>
                <p className={styles.snapshotCardDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
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
              <span className={styles.heroBadge}>
                <Translate id="homepage.hero.badge.mesh">Zero-Trust Mesh</Translate>
              </span>
              <span className={styles.heroBadge}>
                <Translate id="homepage.hero.badge.remote">
                  RDP / SSH / VNC Remote Control
                </Translate>
              </span>
              <span className={styles.heroBadge}>
                <Translate id="homepage.hero.badge.audit">MFA / SSO / 审计追踪</Translate>
              </span>
            </div>
            <Heading as="h1" className={styles.heroTitle}>
              <Translate id="homepage.hero.title">
                构建更安全的远程办公网络，统一管理企业设备
              </Translate>
            </Heading>
            <p className={styles.heroSubtitle}>
              <Translate id="homepage.hero.subtitle">
                Larktun 云雀通将零信任网络、稳定远程控制与集中运维结合，帮助分布式团队快速协作且不牺牲安全。
              </Translate>
            </p>
            <div className={styles.heroActions}>
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started/quick-start">
                <Translate id="homepage.hero.primaryCta">开始接入</Translate>
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/getting-started/install-and-configure">
                <Translate id="homepage.hero.secondaryCta">部署方式与配置</Translate>
              </Link>
              <Link className={styles.ghostLink} to="/showcase">
                <Translate id="homepage.hero.tertiaryCta">浏览使用场景</Translate>
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
            <div className={styles.panelBrand}>
              <img
                className={styles.panelLogo}
                src={useBaseUrl('/img/larktun.png')}
                alt={siteConfig.title}
              />
              <span className={styles.panelEyebrow}>
                <Translate id="homepage.panel.brand">Larktun 云雀通</Translate>
              </span>
            </div>
            <Heading as="h2" className={styles.panelTitle}>
              <Translate id="homepage.panel.title">
                安全网络、远程控制与合规审计统一落在一个控制台里
              </Translate>
            </Heading>
            <ul className={styles.panelList}>
              <li>
                <Translate id="homepage.panel.item.docs">
                  基于 Headscale 与 WireGuard 的零信任网络，支持跨地域、跨平台稳定互联
                </Translate>
              </li>
              <li>
                <Translate id="homepage.panel.item.blog">
                  覆盖 RDP、SSH、VNC 的低延迟远程访问，并支持会话分析与链路质量监测
                </Translate>
              </li>
              <li>
                <Translate id="homepage.panel.item.showcase">
                  支持临时授权、审批、MFA、企业 SSO 和审计日志，满足安全与合规需求
                </Translate>
              </li>
              <li>
                <Translate id="homepage.panel.item.i18n">
                  支持共享中继、专用中继、私有或混合部署，适配从试点到企业级扩展
                </Translate>
              </li>
            </ul>
            <div className={styles.panelMeta}>
              <span>
                <Translate id="homepage.panel.meta.primary">官网真实文案已同步</Translate>
              </span>
              <span>
                <Translate id="homepage.panel.meta.secondary">截图与部署说明已接入</Translate>
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
          'Larktun 云雀通文档中心，包含零信任网络、远程控制、部署方式、问题处理、博客与使用场景。',
      })}>
      <HomepageHeader />
      <main>
        <SnapshotSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
