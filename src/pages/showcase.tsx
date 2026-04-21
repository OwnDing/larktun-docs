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
        message: '先界定团队类型',
      }),
      description: translate({
        id: 'showcase.principles.value.description',
        message:
          '按远程研发、IT 运维与 MSP、企业远程办公等团队类型拆分内容，更容易映射真实交付场景。',
      }),
    },
    {
      title: translate({
        id: 'showcase.principles.path.title',
        message: '再说明访问路径',
      }),
      description: translate({
        id: 'showcase.principles.path.description',
        message:
          '把中继方式、身份策略、审批和审计放进案例中，帮助读者理解方案如何真正落地。',
      }),
    },
    {
      title: translate({
        id: 'showcase.principles.reuse.title',
        message: '最后连接文档入口',
      }),
      description: translate({
        id: 'showcase.principles.reuse.description',
        message:
          '每个场景都应回链到快速开始、部署方式或排障文档，减少售前与交付阶段的重复解释。',
      }),
    },
  ];
}

function getCases(): CaseItem[] {
  return [
    {
      category: translate({
        id: 'showcase.cases.preview.category',
        message: '远程研发团队',
      }),
      title: translate({
        id: 'showcase.cases.preview.title',
        message: '让海外或异地研发团队安全访问代码仓库与构建节点',
      }),
      problem: translate({
        id: 'showcase.cases.preview.problem',
        message:
          '分布式研发团队需要访问构建节点、调试环境和内部资源，但传统 VPN 成本高、体验差且策略难以细化。',
      }),
      solution: translate({
        id: 'showcase.cases.preview.solution',
        message:
          '通过零信任网络、共享或专用中继、策略模板和会话分析，研发成员可以按需访问目标资源，同时保留完整审计链路。',
      }),
      outcome: translate({
        id: 'showcase.cases.preview.outcome',
        message:
          '适合跨地域研发、分支联调、夜间值守和远程桌面支持等需要稳定远程控制的场景。',
      }),
      href: '/docs/getting-started/quick-start',
    },
    {
      category: translate({
        id: 'showcase.cases.intranet.category',
        message: 'IT 运维与 MSP',
      }),
      title: translate({
        id: 'showcase.cases.intranet.title',
        message: '集中管理多客户服务器、桌面资产与设备健康状态',
      }),
      problem: translate({
        id: 'showcase.cases.intranet.problem',
        message:
          '运维团队或 MSP 需要统一管理多套设备资产，同时还要平衡响应速度、权限边界与客户隔离要求。',
      }),
      solution: translate({
        id: 'showcase.cases.intranet.solution',
        message:
          '通过工作空间隔离、设备生命周期管理、专用中继和安全事件中心，把多客户设备治理放到一个控制台里。',
      }),
      outcome: translate({
        id: 'showcase.cases.intranet.outcome',
        message:
          '适合资产巡检、桌面运维、故障响应、长期代维和多团队协作交付等场景。',
      }),
      href: '/docs/troubleshooting/diagnostics',
    },
    {
      category: translate({
        id: 'showcase.cases.support.category',
        message: '企业远程办公',
      }),
      title: translate({
        id: 'showcase.cases.support.title',
        message: '为内部系统提供安全入口，并支持临时授权、审批与行为审计',
      }),
      problem: translate({
        id: 'showcase.cases.support.problem',
        message:
          '企业内部系统需要支持远程访问，但又不能让授权失控、审计缺失或跨部门权限长期滞留。',
      }),
      solution: translate({
        id: 'showcase.cases.support.solution',
        message:
          '结合审批、临时授权、MFA、企业 SSO 与安全日志，可以在不牺牲效率的前提下给远程办公提供统一入口。',
      }),
      outcome: translate({
        id: 'showcase.cases.support.outcome',
        message:
          '适合总部与分支协作、外部合作方限时访问、合规审计和内部系统远程接入等场景。',
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
                  <Translate id="showcase.hero.eyebrow">使用场景</Translate>
                </span>
                <Heading as="h1" className={styles.title}>
                  <Translate id="showcase.hero.title">
                    满足不同规模团队的混合办公与远程访问需求
                  </Translate>
                </Heading>
                <p className={styles.lead}>
                  <Translate id="showcase.hero.description">
                    Larktun 官网当前重点覆盖远程研发团队、IT 运维与 MSP、企业远程办公三类场景，本页已经把这些主线整理成可继续扩展的案例框架。
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
                      先说明团队与资源边界，再说明采用共享中继、专用中继或私有部署
                    </Translate>
                  </li>
                  <li>
                    <Translate id="showcase.summary.item.architecture">
                      把 Headscale、访问策略、审批和审计放进同一条访问路径里
                    </Translate>
                  </li>
                  <li>
                    <Translate id="showcase.summary.item.outcome">
                      用稳定性、响应效率与合规收益来呈现场景价值
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
              <span className={styles.sectionEyebrow}>
                <Translate id="showcase.cases.eyebrow">示例案例</Translate>
              </span>
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
