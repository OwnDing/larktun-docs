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
        message: '先定义租户边界',
      }),
      description: translate({
        id: 'showcase.principles.value.description',
        message: '案例首先明确租户范围、隔离网络和访问对象，避免跨租户描述混淆。',
      }),
    },
    {
      title: translate({
        id: 'showcase.principles.path.title',
        message: '再说明 ACL 与中继路径',
      }),
      description: translate({
        id: 'showcase.principles.path.description',
        message: '案例中需要给出 ACL 生效方式，以及共享、专用或自建中继的选择理由。',
      }),
    },
    {
      title: translate({
        id: 'showcase.principles.reuse.title',
        message: '最后验证体验与稳定性',
      }),
      description: translate({
        id: 'showcase.principles.reuse.description',
        message: '每个案例都建议补充低占用、无打扰和链路稳定性验证结果。',
      }),
    },
  ];
}

function getCases(): CaseItem[] {
  return [
    {
      category: translate({
        id: 'showcase.cases.preview.category',
        message: 'SaaS 多租户平台',
      }),
      title: translate({
        id: 'showcase.cases.preview.title',
        message: '为多客户交付团队提供严格租户隔离与独立 ACL 管理',
      }),
      problem: translate({
        id: 'showcase.cases.preview.problem',
        message:
          '交付团队同时管理多个客户环境，必须保证客户之间网络、策略和日志完全隔离。',
      }),
      solution: translate({
        id: 'showcase.cases.preview.solution',
        message:
          '按客户创建独立租户，为每个租户定义独立 ACL 模板，并通过审计日志按租户归档。',
      }),
      outcome: translate({
        id: 'showcase.cases.preview.outcome',
        message: '实现多客户并行运维且边界清晰，降低误授权和跨租户风险。',
      }),
      href: '/docs/introduction/what-is-larktun',
    },
    {
      category: translate({
        id: 'showcase.cases.intranet.category',
        message: '自定义中继场景',
      }),
      title: translate({
        id: 'showcase.cases.intranet.title',
        message: '跨地域研发团队通过自建中继提升连接可控性',
      }),
      problem: translate({
        id: 'showcase.cases.intranet.problem',
        message:
          '跨地域团队在公网环境中存在时延波动，默认路径难以满足稳定性目标。',
      }),
      solution: translate({
        id: 'showcase.cases.intranet.solution',
        message:
          '在主要区域部署自建中继节点，结合健康检查和故障切换策略保证链路连续性。',
      }),
      outcome: translate({
        id: 'showcase.cases.intranet.outcome',
        message: '网络路径更可控，跨地域访问延迟与断连率明显改善。',
      }),
      href: '/docs/getting-started/install-and-configure',
    },
    {
      category: translate({
        id: 'showcase.cases.support.category',
        message: '终端体验优化',
      }),
      title: translate({
        id: 'showcase.cases.support.title',
        message: '在办公终端长期运行客户端并保持低占用、少打扰',
      }),
      problem: translate({
        id: 'showcase.cases.support.problem',
        message: '终端用户关注性能影响和弹窗打扰，运维团队关注远程连接持续稳定。',
      }),
      solution: translate({
        id: 'showcase.cases.support.solution',
        message:
          '启用低内存后台运行配置，结合自动重连与告警机制，确保用户体验与可维护性。',
      }),
      outcome: translate({
        id: 'showcase.cases.support.outcome',
        message: '客户端可长期无感运行，支持团队在日常办公中持续使用远程能力。',
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
          'Larktun 场景案例页，重点呈现多租户隔离、独立 ACL、自定义中继与稳定体验。',
      })}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroTop}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>
                  <Translate id="showcase.hero.eyebrow">使用场景</Translate>
                </span>
                <Heading as="h1" className={styles.title}>
                  <Translate id="showcase.hero.title">
                    围绕多租户隔离与稳定访问能力构建可复用案例库
                  </Translate>
                </Heading>
                <p className={styles.lead}>
                  <Translate id="showcase.hero.description">
                    本页示例覆盖 SaaS 多租户管理、自定义中继部署和低占用终端体验三类主题，适合作为真实客户案例模板。
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
                      先写清租户边界和隔离目标，再展开访问流程
                    </Translate>
                  </li>
                  <li>
                    <Translate id="showcase.summary.item.architecture">
                      明确 ACL 生效逻辑和中继选择依据
                    </Translate>
                  </li>
                  <li>
                    <Translate id="showcase.summary.item.outcome">
                      用低占用、不打扰和稳定性指标总结效果
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
              <span className={styles.sectionEyebrow}>
                <Translate id="showcase.principles.eyebrow">展示框架</Translate>
              </span>
              <Heading as="h2" className={styles.sectionTitle}>
                <Translate id="showcase.principles.heading">
                  用统一结构描述案例，便于复用到售前与交付
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
              <span className={styles.sectionEyebrow}>
                <Translate id="showcase.cases.eyebrow">示例案例</Translate>
              </span>
              <Heading as="h2" className={styles.sectionTitle}>
                <Translate id="showcase.cases.heading">
                  示例卡片可直接替换为真实项目并持续扩展
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
