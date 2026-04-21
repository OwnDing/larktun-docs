import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './showcase.module.css';

type PrincipleItem = {
  title: string;
  description: string;
};

type CaseItem = {
  category: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  href: string;
};

function getPrinciples(): PrincipleItem[] {
  return [
    {
      title: translate({
        id: 'showcase.principles.value.title',
        message: '先讲业务价值',
      }),
      description: translate({
        id: 'showcase.principles.value.description',
        message:
          '每个案例先说明业务背景、挑战和预期目标，避免只展示功能点而缺少上下文。',
      }),
    },
    {
      title: translate({
        id: 'showcase.principles.path.title',
        message: '再讲落地路径',
      }),
      description: translate({
        id: 'showcase.principles.path.description',
        message:
          '通过部署方式、配置建议和连接链路，帮助访问者理解方案是如何真正跑起来的。',
      }),
    },
    {
      title: translate({
        id: 'showcase.principles.reuse.title',
        message: '最后给出复用入口',
      }),
      description: translate({
        id: 'showcase.principles.reuse.description',
        message:
          '每条案例都应链接到对应文档或博客，让用户可以沿着场景继续深入阅读。',
      }),
    },
  ];
}

function getCases(): CaseItem[] {
  return [
    {
      category: translate({
        id: 'showcase.cases.preview.category',
        message: '预发布环境',
      }),
      title: translate({
        id: 'showcase.cases.preview.title',
        message: '让测试与产品团队远程访问分支环境',
      }),
      problem: translate({
        id: 'showcase.cases.preview.problem',
        message:
          '研发团队需要把本地或临时环境暴露给外部同事验证，但又不希望手工维护复杂的网络策略。',
      }),
      solution: translate({
        id: 'showcase.cases.preview.solution',
        message:
          '通过 Larktun 建立临时公网入口，绑定访问策略与回收机制，减少联调过程中的等待成本。',
      }),
      outcome: translate({
        id: 'showcase.cases.preview.outcome',
        message:
          '适合承载“功能演示”“测试验证”“设计评审”这类需要快速上线和快速回收的场景。',
      }),
      href: '/docs/getting-started/quick-start',
    },
    {
      category: translate({
        id: 'showcase.cases.intranet.category',
        message: '内网服务发布',
      }),
      title: translate({
        id: 'showcase.cases.intranet.title',
        message: '将企业内网服务按最小暴露原则对外开放',
      }),
      problem: translate({
        id: 'showcase.cases.intranet.problem',
        message:
          '运维团队需要对外开放部分内部系统，但不能直接暴露整个网络边界或放宽过多防火墙规则。',
      }),
      solution: translate({
        id: 'showcase.cases.intranet.solution',
        message:
          '为指定服务建立单独的访问入口、访问策略和日志追踪，确保开放范围、责任人和审计信息清晰可控。',
      }),
      outcome: translate({
        id: 'showcase.cases.intranet.outcome',
        message:
          '适合承载“管理后台”“内部 API”“灰度接口”这类对可见性和可回溯性要求较高的场景。',
      }),
      href: '/docs/troubleshooting/diagnostics',
    },
    {
      category: translate({
        id: 'showcase.cases.support.category',
        message: '远程排障支持',
      }),
      title: translate({
        id: 'showcase.cases.support.title',
        message: '为客户支持团队提供可控的临时访问通道',
      }),
      problem: translate({
        id: 'showcase.cases.support.problem',
        message:
          '当客户现场出现网络或服务问题时，支持团队需要快速进入现场环境查看问题，但不能留下长期开放的入口。',
      }),
      solution: translate({
        id: 'showcase.cases.support.solution',
        message:
          '使用临时授权、访问时效与日志采集组合策略，支持团队可以在有限时间窗口内完成诊断和协助。',
      }),
      outcome: translate({
        id: 'showcase.cases.support.outcome',
        message:
          '适合承载“问题复现”“联合诊断”“交付支持”这类需要限时、限范围访问的服务场景。',
      }),
      href: '/docs/troubleshooting/common-issues',
    },
  ];
}

export default function ShowcasePage(): ReactNode {
  const principles = getPrinciples();
  const caseStudies = getCases();

  return (
    <Layout
      title={translate({
        id: 'showcase.meta.title',
        message: '案例展示',
      })}
      description={translate({
        id: 'showcase.meta.description',
        message:
          'Larktun 典型使用场景与案例展示页面，适合承载客户案例、解决方案与业务价值说明。',
      })}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroTop}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>
                  <Translate id="showcase.hero.eyebrow">Use Cases</Translate>
                </span>
                <Heading as="h1" className={styles.title}>
                  <Translate id="showcase.hero.title">
                    用案例展示 Larktun 的业务价值与落地方式
                  </Translate>
                </Heading>
                <p className={styles.lead}>
                  <Translate id="showcase.hero.description">
                    这里适合持续补充客户故事、典型场景、部署方式与效果说明，让潜在用户快速理解产品边界与使用收益。
                  </Translate>
                </p>
                <div className={styles.actions}>
                  <Link className="button button--primary button--lg" to="/docs">
                    <Translate id="showcase.hero.primaryCta">阅读相关文档</Translate>
                  </Link>
                  <Link className="button button--secondary button--lg" to="/blog">
                    <Translate id="showcase.hero.secondaryCta">查看实践文章</Translate>
                  </Link>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <span className={styles.summaryLabel}>
                  <Translate id="showcase.summary.label">推荐呈现方式</Translate>
                </span>
                <ul className={styles.summaryList}>
                  <li>
                    <Translate id="showcase.summary.item.problem">
                      先说明业务问题，再介绍方案，而不是直接罗列功能点
                    </Translate>
                  </li>
                  <li>
                    <Translate id="showcase.summary.item.architecture">
                      为每个案例补充接入结构、访问链路和权限策略
                    </Translate>
                  </li>
                  <li>
                    <Translate id="showcase.summary.item.outcome">
                      用结果、收益或时间成本变化增强案例说服力
                    </Translate>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.principles}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Showcase Framework</span>
              <Heading as="h2" className={styles.sectionTitle}>
                <Translate id="showcase.principles.heading">
                  当前案例页已经具备可扩展的展示框架
                </Translate>
              </Heading>
            </div>
            <div className={styles.principleGrid}>
              {principles.map((item) => (
                <article key={item.title} className={styles.principleCard}>
                  <Heading as="h3" className={styles.principleTitle}>
                    {item.title}
                  </Heading>
                  <p className={styles.principleDescription}>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.caseSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Example Cases</span>
              <Heading as="h2" className={styles.sectionTitle}>
                <Translate id="showcase.cases.heading">
                  示例案例卡片可直接替换为真实客户场景
                </Translate>
              </Heading>
            </div>
            <div className={styles.caseGrid}>
              {caseStudies.map((item) => (
                <article key={item.title} className={styles.caseCard}>
                  <span className={styles.caseTag}>{item.category}</span>
                  <Heading as="h3" className={styles.caseTitle}>
                    {item.title}
                  </Heading>
                  <div className={styles.caseBlock}>
                    <strong>
                      <Translate id="showcase.cases.problem.label">业务挑战</Translate>
                    </strong>
                    <p>{item.problem}</p>
                  </div>
                  <div className={styles.caseBlock}>
                    <strong>
                      <Translate id="showcase.cases.solution.label">推荐做法</Translate>
                    </strong>
                    <p>{item.solution}</p>
                  </div>
                  <div className={styles.caseBlock}>
                    <strong>
                      <Translate id="showcase.cases.outcome.label">适用结果</Translate>
                    </strong>
                    <p>{item.outcome}</p>
                  </div>
                  <Link className={styles.caseLink} to={item.href}>
                    <Translate id="showcase.cases.link">查看关联文档</Translate>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
