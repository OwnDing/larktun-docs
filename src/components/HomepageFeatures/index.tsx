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
  tone: 'docs' | 'blog' | 'showcase';
};

const FeatureList: FeatureItem[] = [
  {
    eyebrow: translate({
      id: 'homepage.features.docs.eyebrow',
      message: 'Documentation',
    }),
    title: translate({
      id: 'homepage.features.docs.title',
      message: '网站介绍、开始上手、问题处理',
    }),
    description: translate({
      id: 'homepage.features.docs.description',
      message:
        '用结构化文档承接产品概览、核心概念、快速配置和常见故障排查，方便后续持续扩充。',
    }),
    cta: translate({
      id: 'homepage.features.docs.cta',
      message: '进入文档',
    }),
    href: '/docs',
    tone: 'docs',
  },
  {
    eyebrow: translate({
      id: 'homepage.features.blog.eyebrow',
      message: 'Blog',
    }),
    title: translate({
      id: 'homepage.features.blog.title',
      message: '发布记录、实践经验与内容更新',
    }),
    description: translate({
      id: 'homepage.features.blog.description',
      message:
        '把版本动态、最佳实践、排障总结沉淀成时间线内容，形成可持续维护的知识流。',
    }),
    cta: translate({
      id: 'homepage.features.blog.cta',
      message: '查看博客',
    }),
    href: '/blog',
    tone: 'blog',
  },
  {
    eyebrow: translate({
      id: 'homepage.features.showcase.eyebrow',
      message: 'Showcase',
    }),
    title: translate({
      id: 'homepage.features.showcase.title',
      message: '案例展示与典型业务场景',
    }),
    description: translate({
      id: 'homepage.features.showcase.description',
      message:
        '用案例页展示客户价值、接入方式和落地路径，让访问者快速理解 Larktun 的使用边界。',
    }),
    cta: translate({
      id: 'homepage.features.showcase.cta',
      message: '浏览案例',
    }),
    href: '/showcase',
    tone: 'showcase',
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
          <span className={styles.sectionEyebrow}>Content Architecture</span>
          <Heading as="h2" className={styles.sectionTitle}>
            {translate({
              id: 'homepage.features.heading',
              message: '三类内容共同构成完整的帮助中心',
            })}
          </Heading>
          <p className={styles.sectionDescription}>
            {translate({
              id: 'homepage.features.subheading',
              message:
                '这套框架既能承载产品说明，也便于后续逐步沉淀博客文章、客户故事和解决方案内容。',
            })}
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
