import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  tone: 'mesh' | 'control' | 'security';
};

type EntryItem = {
  title: string;
  description: string;
  href: string;
};

const FeatureList: FeatureItem[] = [
  {
    eyebrow: translate({
      id: 'homepage.features.mesh.eyebrow',
      message: 'Zero-Trust Mesh',
    }),
    title: translate({
      id: 'homepage.features.mesh.title',
      message: '零信任安全网络',
    }),
    description: translate({
      id: 'homepage.features.mesh.description',
      message:
        '基于 WireGuard 与 Headscale 构建跨地域稳定互联，默认按最小信任原则接入每台设备。',
    }),
    cta: translate({
      id: 'homepage.features.mesh.cta',
      message: '阅读产品介绍',
    }),
    href: '/docs/introduction/what-is-larktun',
    tone: 'mesh',
  },
  {
    eyebrow: translate({
      id: 'homepage.features.control.eyebrow',
      message: 'Remote Control',
    }),
    title: translate({
      id: 'homepage.features.control.title',
      message: '极速远程控制',
    }),
    description: translate({
      id: 'homepage.features.control.description',
      message:
        '针对 RDP、SSH、VNC 等协议优化链路，支持临时授权、自动回收与跨区域访问体验。',
    }),
    cta: translate({
      id: 'homepage.features.control.cta',
      message: '查看快速开始',
    }),
    href: '/docs/getting-started/quick-start',
    tone: 'control',
  },
  {
    eyebrow: translate({
      id: 'homepage.features.security.eyebrow',
      message: 'Security & Audit',
    }),
    title: translate({
      id: 'homepage.features.security.title',
      message: '默认安全，全链路可追溯',
    }),
    description: translate({
      id: 'homepage.features.security.description',
      message:
        '通过 MFA、企业 SSO、策略模板、审计日志与异常检测，帮助团队把安全治理沉到日常访问流程里。',
    }),
    cta: translate({
      id: 'homepage.features.security.cta',
      message: '查看排障与审计',
    }),
    href: '/docs/troubleshooting/diagnostics',
    tone: 'security',
  },
];

const EntryList: EntryItem[] = [
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
  },
];

function Feature({eyebrow, title, description, cta, href, tone}: FeatureItem) {
  return (
    <article className={clsx(styles.featureCard, styles[tone])}>
      <span className={styles.featureEyebrow}>{eyebrow}</span>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDescription}>{description}</p>
      <Link className={styles.featureLink} to={href}>
        {cta}
      </Link>
    </article>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionEyebrow}>
            {translate({
              id: 'homepage.features.eyebrow',
              message: '内容架构',
            })}
          </span>
          <Heading as="h2" className={styles.sectionTitle}>
            {translate({
              id: 'homepage.features.heading',
              message: '围绕真实产品能力组织文档内容',
            })}
          </Heading>
          <p className={styles.sectionDescription}>
            {translate({
              id: 'homepage.features.subheading',
              message:
                '帮助中心现在已经能直接承接零信任网络、远程控制、安全能力、部署方式与使用场景的正式内容。',
            })}
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
        <div className={styles.entryGrid}>
          {EntryList.map((item) => (
            <Link key={item.title} className={styles.entryCard} to={item.href}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
