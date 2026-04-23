import type {CSSProperties, ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './showcase.module.css';

type LocalizedText = {
  zh: string;
  en: string;
};

type NodeTone = 'source' | 'control' | 'relay' | 'target' | 'guard';

type TopologyNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  tone: NodeTone;
  pulse?: boolean;
};

type TopologyLink = {
  from: string;
  to: string;
  strong?: boolean;
  dashed?: boolean;
};

type CaseItem = {
  sector: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  challenge: LocalizedText;
  architecture: LocalizedText;
  controls: LocalizedText[];
  outcome: LocalizedText;
  scale: LocalizedText;
  flow: LocalizedText[];
  docsTo: string;
  accent: string;
  topology: {
    nodes: TopologyNode[];
    links: TopologyLink[];
  };
};

function text(zh: string, en: string): LocalizedText {
  return {zh, en};
}

const HERO_FACTS = [
  {
    value: '06',
    label: text('核心业务场景', 'Core business scenarios'),
  },
  {
    value: '03',
    label: text('访问控制层', 'Access-control layers'),
  },
  {
    value: '01',
    label: text('统一案例体系', 'Unified scenario framework'),
  },
] as const;

const METHODS = [
  {
    title: text('先定义边界', 'Define the boundary first'),
    description: text(
      '先写清楚谁在访问、访问什么设备、是否跨公网，再展开连接路径。',
      'Start with who needs access, what device or service is targeted, and whether traffic crosses public networks.',
    ),
  },
  {
    title: text('再约束权限', 'Constrain permissions second'),
    description: text(
      '把 ACL、身份校验和时间窗口写进案例，避免出现“能连但不可控”的访问治理风险。',
      'Encode ACLs, identity verification, and time windows in each case so connectivity stays controllable.',
    ),
  },
  {
    title: text('最后量化效果', 'Quantify outcomes last'),
    description: text(
      '用接入成功率、响应时延和审计可追溯性衡量方案效果，支撑持续优化。',
      'Use connection success rate, latency stability, and audit traceability to measure outcomes and support continuous optimization.',
    ),
  },
] as const;

const CASE_STUDIES: CaseItem[] = [
  {
    sector: text('家庭远程办公', 'Home remote work'),
    title: text('远程访问家里的电脑', 'Secure access to a home computer'),
    summary: text(
      '在外出、出差或移动办公时，从笔记本安全连接家中电脑，继续开发、设计或文件处理。',
      'When away from home, connect securely from a laptop to your home workstation for coding, design, and file work.',
    ),
    challenge: text(
      '家庭宽带 IP 变化快，端口映射方案暴露风险高，传统 DDNS 维护成本也较高。',
      'Residential IP changes frequently, while port forwarding and DDNS increase attack surface and maintenance overhead.',
    ),
    architecture: text(
      '家中主机加入个人租户，外出设备通过身份校验后走加密隧道直连或中继，全程不开放公网端口。',
      'Home devices join a personal tenant; remote devices authenticate first, then connect over encrypted direct or relay paths with zero open inbound ports.',
    ),
    controls: [
      text('仅允许已登记设备访问家庭主机', 'Allow only registered devices to reach home hosts'),
      text('启用 MFA 与新设备确认流程', 'Enforce MFA and new-device verification'),
      text('会话结束后自动收敛访问范围', 'Automatically tighten access scope after sessions'),
    ],
    outcome: text(
      '保持远程桌面与文件传输可用，同时显著降低家庭网络暴露面。',
      'Keeps remote desktop and file transfer available while significantly reducing home-network exposure.',
    ),
    scale: text('典型规模：2-6 台设备', 'Typical scale: 2-6 devices'),
    flow: [
      text('外出终端完成身份校验', 'Remote endpoint passes identity checks'),
      text('控制平面下发临时最小权限策略', 'Control plane pushes least-privilege policy'),
      text('加密通道建立后访问家庭主机', 'Encrypted path connects to home workstation'),
    ],
    docsTo: '/docs/getting-started/desktop-client-operations',
    accent: '#2f8cff',
    topology: {
      nodes: [
        {id: 'n1', x: 50, y: 156, label: '1', tone: 'source', pulse: true},
        {id: 'n2', x: 130, y: 70, label: '2', tone: 'control'},
        {id: 'n3', x: 212, y: 122, label: '3', tone: 'relay', pulse: true},
        {id: 'n4', x: 300, y: 66, label: '4', tone: 'target'},
        {id: 'n5', x: 306, y: 170, label: '5', tone: 'guard'},
      ],
      links: [
        {from: 'n1', to: 'n2', strong: true},
        {from: 'n2', to: 'n3', strong: true},
        {from: 'n3', to: 'n4', strong: true},
        {from: 'n2', to: 'n5', dashed: true},
      ],
    },
  },
  {
    sector: text('个人开发者', 'Solo developer'),
    title: text('个人开发者安全访问公有云服务器', 'Secure access to public-cloud servers'),
    summary: text(
      '个人项目运行在公有云主机上，希望 SSH、数据库维护和发布操作可控、可审计、不过度暴露。',
      'For personal projects on public-cloud VMs, SSH, DB maintenance, and releases must stay secure, auditable, and private.',
    ),
    challenge: text(
      '直接开放 22/3306 到公网风险高；传统 VPN 对单人项目又偏重。',
      'Exposing 22/3306 to the internet is risky, while full VPN stacks are heavy for solo projects.',
    ),
    architecture: text(
      '云服务器作为节点加入租户，按标签和用户身份下发 ACL，只开放必要运维路径。',
      'Cloud instances join the tenant as nodes; ACLs are pushed by identity and tags so only required operations paths are reachable.',
    ),
    controls: [
      text('SSH 仅对白名单开发设备放通', 'Expose SSH only to approved developer devices'),
      text('高风险操作使用临时授权时窗', 'Use temporary authorization windows for sensitive actions'),
      text('所有会话写入审计并可追踪', 'Record every session into traceable audit logs'),
    ],
    outcome: text(
      '公有云主机保持最小暴露，个人运维链路轻量、安全且稳定。',
      'Cloud hosts remain minimally exposed, and solo operations become lightweight, secure, and stable.',
    ),
    scale: text('典型规模：1-20 台云主机', 'Typical scale: 1-20 cloud instances'),
    flow: [
      text('开发设备登录并匹配角色策略', 'Developer device signs in and matches role policy'),
      text('控制平面计算主机 ACL 与路由', 'Control plane computes host ACL and routing'),
      text('SSH / 发布链路按最小权限建立', 'SSH and deployment paths are established with least privilege'),
    ],
    docsTo: '/docs/getting-started/install-and-configure',
    accent: '#18b3a7',
    topology: {
      nodes: [
        {id: 'n1', x: 52, y: 62, label: '1', tone: 'source'},
        {id: 'n2', x: 142, y: 104, label: '2', tone: 'control', pulse: true},
        {id: 'n3', x: 224, y: 56, label: '3', tone: 'relay'},
        {id: 'n4', x: 302, y: 104, label: '4', tone: 'target', pulse: true},
        {id: 'n5', x: 230, y: 166, label: '5', tone: 'guard'},
      ],
      links: [
        {from: 'n1', to: 'n2', strong: true},
        {from: 'n2', to: 'n3', dashed: true},
        {from: 'n2', to: 'n4', strong: true},
        {from: 'n5', to: 'n4', dashed: true},
      ],
    },
  },
  {
    sector: text('家庭安防', 'Home surveillance'),
    title: text('家里监控远程安全访问', 'Secure remote access to home surveillance'),
    summary: text(
      '手机在外网查看 NVR 与摄像头画面，不将监控管理口直接暴露到公网。',
      'View NVR and camera feeds from mobile devices without exposing surveillance admin ports to the public internet.',
    ),
    challenge: text(
      '家用监控平台经常依赖第三方中转服务，隐私与权限边界不透明。',
      'Many home camera stacks rely on opaque third-party relay services with unclear privacy and permission boundaries.',
    ),
    architecture: text(
      'NVR 与网关纳入独立监控子网，家庭成员设备按身份进入，只开放必要视频流端口。',
      'NVR and gateway join an isolated surveillance subnet; family devices authenticate by identity and access only required streaming ports.',
    ),
    controls: [
      text('监控访问权限按家庭成员分级', 'Tier surveillance permissions by family member role'),
      text('高危配置操作需二次确认', 'Require step-up confirmation for risky configuration actions'),
      text('异常登录实时通知', 'Send real-time alerts for abnormal sign-ins'),
    ],
    outcome: text(
      '实现外出随时查看与告警联动，并降低家用摄像头被扫描的风险。',
      'Enables remote monitoring and alert response while reducing camera exposure to internet scans.',
    ),
    scale: text('典型规模：3-30 路监控设备', 'Typical scale: 3-30 surveillance endpoints'),
    flow: [
      text('移动设备发起监控访问请求', 'Mobile device initiates surveillance access request'),
      text('身份与策略校验后下发访问令牌', 'Identity and policy checks issue scoped access token'),
      text('只读视频流通道建立并持续审计', 'Read-only stream path is established with continuous auditing'),
    ],
    docsTo: '/docs/introduction/acls-introduction',
    accent: '#f5a351',
    topology: {
      nodes: [
        {id: 'n1', x: 54, y: 88, label: '1', tone: 'source', pulse: true},
        {id: 'n2', x: 138, y: 150, label: '2', tone: 'control'},
        {id: 'n3', x: 220, y: 94, label: '3', tone: 'relay'},
        {id: 'n4', x: 292, y: 54, label: '4', tone: 'target'},
        {id: 'n5', x: 304, y: 158, label: '5', tone: 'guard', pulse: true},
      ],
      links: [
        {from: 'n1', to: 'n2', strong: true},
        {from: 'n2', to: 'n3', strong: true},
        {from: 'n3', to: 'n4', strong: true},
        {from: 'n3', to: 'n5', dashed: true},
      ],
    },
  },
  {
    sector: text('多地服务器组网', 'Multi-region server mesh'),
    title: text('多地服务器组网', 'Mesh servers across regions'),
    summary: text(
      '将华东、华北、海外服务器统一到一个可控私网，用于发布、日志回传和跨区运维。',
      'Bring East China, North China, and overseas servers into one controllable private mesh for release, logging, and cross-region ops.',
    ),
    challenge: text(
      '公网链路时延抖动与策略分散，会导致跨区访问体验不稳定且排障困难。',
      'Public routing jitter and fragmented policies lead to unstable cross-region access and difficult troubleshooting.',
    ),
    architecture: text(
      '按区域部署中继与策略节点，结合标签路由和健康检查，让运维路径自动选择更优链路。',
      'Deploy regional relays and policy nodes with tag-based routing and health checks so operations traffic can pick healthier paths automatically.',
    ),
    controls: [
      text('区域 ACL 限制横向访问范围', 'Use regional ACLs to limit lateral movement'),
      text('链路健康检查与故障切换', 'Enable path health checks and failover'),
      text('跨区延迟、丢包可观测', 'Observe latency and packet loss across regions'),
    ],
    outcome: text(
      '跨地域访问更加稳定，发布通道与运维通道统一管理。',
      'Cross-region connectivity becomes more stable with unified control over release and operations paths.',
    ),
    scale: text('典型规模：5-200 台服务器', 'Typical scale: 5-200 servers'),
    flow: [
      text('区域节点按标签加入同一私网', 'Regional nodes join the same mesh by tags'),
      text('策略引擎按链路质量选择路径', 'Policy engine selects paths by link health'),
      text('故障时自动切换到备用中继', 'Traffic fails over automatically when a path degrades'),
    ],
    docsTo: '/docs/introduction/product-architecture',
    accent: '#5f7cff',
    topology: {
      nodes: [
        {id: 'n1', x: 44, y: 106, label: '1', tone: 'source'},
        {id: 'n2', x: 124, y: 52, label: '2', tone: 'control'},
        {id: 'n3', x: 200, y: 104, label: '3', tone: 'relay', pulse: true},
        {id: 'n4', x: 286, y: 48, label: '4', tone: 'target'},
        {id: 'n5', x: 310, y: 142, label: '5', tone: 'guard'},
      ],
      links: [
        {from: 'n1', to: 'n2', strong: true},
        {from: 'n2', to: 'n3', dashed: true},
        {from: 'n3', to: 'n4', strong: true},
        {from: 'n3', to: 'n5', strong: true},
      ],
    },
  },
  {
    sector: text('工业互联', 'Industrial networking'),
    title: text('工厂设备组网', 'Connect factory equipment securely'),
    summary: text(
      '把 PLC、边缘网关、工控机纳入安全网络，支持总部和驻场工程师远程诊断。',
      'Onboard PLCs, edge gateways, and industrial PCs into a secure mesh so HQ and field engineers can diagnose remotely.',
    ),
    challenge: text(
      '工控网与办公网必须隔离，且停机窗口短，现场排障成本高。',
      'Industrial and office networks must stay isolated, downtime windows are short, and on-site troubleshooting is expensive.',
    ),
    architecture: text(
      '工业网关作为接入边界，按设备标签定义协议级 ACL，仅开放必要维护链路。',
      'Use industrial gateways as trust boundaries and enforce protocol-level ACLs by device tags to expose only essential maintenance paths.',
    ),
    controls: [
      text('按角色区分总部、驻场和供应商权限', 'Separate HQ, field, and vendor roles with RBAC'),
      text('关键操作全量审计并留痕', 'Capture full audit trails for critical operations'),
      text('维护窗口自动启停策略', 'Automatically enable/disable policy by maintenance window'),
    ],
    outcome: text(
      '减少现场出差和停机时间，同时满足工业安全合规要求。',
      'Cuts on-site trips and downtime while meeting industrial security compliance requirements.',
    ),
    scale: text('典型规模：1-10 个工厂站点', 'Typical scale: 1-10 factory sites'),
    flow: [
      text('设备通过工业网关接入控制平面', 'Devices connect through industrial gateways to the control plane'),
      text('协议与端口按工位策略分级开放', 'Protocols and ports are opened by workstation-level policy tiers'),
      text('远程诊断全程记录并支持追溯', 'Remote diagnostics are fully logged for traceability'),
    ],
    docsTo: '/docs/introduction/routes-introduction',
    accent: '#ff8a4c',
    topology: {
      nodes: [
        {id: 'n1', x: 46, y: 148, label: '1', tone: 'source'},
        {id: 'n2', x: 132, y: 92, label: '2', tone: 'control', pulse: true},
        {id: 'n3', x: 212, y: 146, label: '3', tone: 'relay'},
        {id: 'n4', x: 296, y: 98, label: '4', tone: 'target'},
        {id: 'n5', x: 292, y: 42, label: '5', tone: 'guard'},
      ],
      links: [
        {from: 'n1', to: 'n2', strong: true},
        {from: 'n2', to: 'n3', strong: true},
        {from: 'n3', to: 'n4', strong: true},
        {from: 'n2', to: 'n5', dashed: true},
      ],
    },
  },
  {
    sector: text('协同运维', 'Collaborative operations'),
    title: text('多团队协同与第三方运维接入', 'Multi-team and third-party operator access'),
    summary: text(
      '总部、外包与客户侧工程师在同一项目协同运维，避免共享账号与过度授权。',
      'HQ teams, contractors, and customer engineers collaborate on the same environment without shared accounts or over-permissioning.',
    ),
    challenge: text(
      '跨组织协作频繁，权限边界和责任追踪难，项目结束后回收权限不及时。',
      'Cross-org collaboration is frequent, boundaries are hard to enforce, and permission revocation is often delayed after project closure.',
    ),
    architecture: text(
      '按组织与角色分组，结合服务标签和访问时窗发放短期权限，自动回收。',
      'Group identities by organization and role, then grant short-lived access by service tags and time windows with automatic revocation.',
    ),
    controls: [
      text('一次性审批与短时访问令牌', 'One-time approvals with short-lived access tokens'),
      text('会话留痕与异常行为告警', 'Session traceability with anomaly alerts'),
      text('离场即回收权限与设备信任', 'Revoke permissions and device trust on offboarding'),
    ],
    outcome: text(
      '跨团队协作效率提升，审计责任更清晰，适合长期托管项目。',
      'Improves cross-team delivery speed with clearer audit accountability for long-running managed projects.',
    ),
    scale: text('典型规模：10-300 台托管节点', 'Typical scale: 10-300 managed nodes'),
    flow: [
      text('协作方按角色进入租户分组', 'Partners join tenant groups based on role'),
      text('审批后下发最小权限策略与时窗', 'Approval issues least-privilege policy and time window'),
      text('项目结束自动回收访问链路', 'Access paths are revoked automatically when work ends'),
    ],
    docsTo: '/docs/troubleshooting/common-issues',
    accent: '#30c2a0',
    topology: {
      nodes: [
        {id: 'n1', x: 48, y: 62, label: '1', tone: 'source'},
        {id: 'n2', x: 130, y: 148, label: '2', tone: 'control'},
        {id: 'n3', x: 210, y: 90, label: '3', tone: 'relay', pulse: true},
        {id: 'n4', x: 294, y: 144, label: '4', tone: 'target'},
        {id: 'n5', x: 302, y: 54, label: '5', tone: 'guard', pulse: true},
      ],
      links: [
        {from: 'n1', to: 'n2', strong: true},
        {from: 'n2', to: 'n3', dashed: true},
        {from: 'n3', to: 'n4', strong: true},
        {from: 'n3', to: 'n5', strong: true},
      ],
    },
  },
];

function TopologyGraph({item, index, t}: {item: CaseItem; index: number; t: (value: LocalizedText) => string}): ReactNode {
  const nodeMap = new Map(item.topology.nodes.map((node) => [node.id, node]));

  return (
    <figure className={styles.topologyFigure}>
      <svg
        className={styles.topologySvg}
        viewBox="0 0 350 220"
        role="img"
        aria-label={`${t(item.title)} topology ${index + 1}`}>
        <rect x="0" y="0" width="350" height="220" rx="20" className={styles.topologyBackdrop} />
        <g className={styles.topologyGridLayer}>
          {Array.from({length: 6}).map((_, idx) => (
            <line key={`rh-${idx}`} x1="20" y1={34 + idx * 30} x2="330" y2={34 + idx * 30} />
          ))}
          {Array.from({length: 8}).map((_, idx) => (
            <line key={`rv-${idx}`} x1={20 + idx * 42} y1="28" x2={20 + idx * 42} y2="194" />
          ))}
        </g>

        <g>
          {item.topology.links.map((link) => {
            const from = nodeMap.get(link.from);
            const to = nodeMap.get(link.to);
            if (!from || !to) {
              return null;
            }

            return (
              <line
                key={`${link.from}-${link.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={clsx(
                  styles.topologyLink,
                  link.strong && styles.topologyLinkStrong,
                  link.dashed && styles.topologyLinkDashed,
                )}
              />
            );
          })}
        </g>

        <g>
          {item.topology.nodes.map((node) => (
            <g
              key={node.id}
              transform={`translate(${node.x} ${node.y})`}
              data-tone={node.tone}
              className={styles.topologyNode}>
              <circle r="17" className={styles.topologyNodeOuter} />
              <circle
                r="11"
                className={clsx(styles.topologyNodeCore, node.pulse && styles.topologyNodePulse)}
              />
              <text textAnchor="middle" dy="4" className={styles.topologyNodeLabel}>
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <figcaption className={styles.topologyCaption}>{t(item.scale)}</figcaption>
    </figure>
  );
}

export default function ShowcasePage(): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();

  const isEnglish = currentLocale.startsWith('en');
  const t = (value: LocalizedText): string => (isEnglish ? value.en : value.zh);
  const brandName = isEnglish ? 'Larktun' : '云雀通';
  const heroCaseImage = useBaseUrl('/img/showcase/case.webp');
  const homeScenarioVideo = useBaseUrl('/img/showcase/home-en.mp4');
  const serverSshImage = useBaseUrl('/img/showcase/server-ssh.webp');
  const nvrImage = useBaseUrl('/img/showcase/nvr.webp');
  const multiServerImage = useBaseUrl('/img/showcase/multi-server.webp');
  const factoryImage = useBaseUrl('/img/showcase/factory.webp');
  const engineerImage = useBaseUrl('/img/showcase/engineer.webp');

  const pageTitle = isEnglish ? 'Showcase' : '案例展示';
  const pageDescription = isEnglish
    ? `${brandName} use-case showcase covering topology visuals, access-control strategy, and implementation outcomes.`
    : `${brandName} 案例展示页面，覆盖网络拓扑图、访问控制策略与实施成效。`;

  const eyebrow = isEnglish ? 'Casebook' : '案例库';

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.sectionInner}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.heroEyebrow}>{eyebrow}</p>
                <Heading as="h1" className={styles.heroTitle}>
                  {isEnglish
                    ? `${brandName} showcase for secure networking scenarios`
                    : `${brandName} 安全组网案例展示`}
                </Heading>
                <p className={styles.heroLead}>
                  {isEnglish
                    ? 'Covering home remote desktop, solo developer cloud access, home surveillance, multi-region server mesh, factory equipment networking, and collaborative operations with a consistent presentation structure.'
                    : '统一覆盖家庭远程办公、个人开发者上云、家庭监控、多地服务器组网、工厂设备组网与跨团队协同运维，面向真实业务场景实践。'}
                </p>
                <div className={styles.heroActions}>
                  <Link className={clsx('button button--lg', styles.primaryAction)} to="/docs">
                    {isEnglish ? 'Open docs' : '查看文档'}
                  </Link>
                  <Link className={clsx('button button--lg', styles.secondaryAction)} to="/blog">
                    {isEnglish ? 'Browse blog' : '查看博客'}
                  </Link>
                </div>
                <ul className={styles.heroFacts}>
                  {HERO_FACTS.map((fact) => (
                    <li key={fact.value}>
                      <strong>{fact.value}</strong>
                      <span>{t(fact.label)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.heroVisual}>
                <img
                  className={styles.heroSignalMap}
                  src={heroCaseImage}
                  alt={
                    isEnglish
                      ? `${brandName} showcase case library visual`
                      : `${brandName} 案例库展示图`
                  }
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.methodSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{isEnglish ? 'Methodology' : '方法框架'}</p>
              <Heading as="h2" className={styles.sectionTitle}>
                {isEnglish
                  ? 'A unified method for scenario planning and implementation'
                  : '统一方法框架，支撑场景规划与实施'}
              </Heading>
            </div>
            <div className={styles.methodGrid}>
              {METHODS.map((item) => (
                <article key={item.title.zh} className={styles.methodItem}>
                  <Heading as="h3" className={styles.methodTitle}>
                    {t(item.title)}
                  </Heading>
                  <p>{t(item.description)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.caseSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{isEnglish ? 'Scenarios' : '场景案例'}</p>
              <Heading as="h2" className={styles.sectionTitle}>
                {isEnglish
                  ? 'Six core business scenarios'
                  : '6 个核心业务场景'}
              </Heading>
              <p className={styles.sectionLead}>
                {isEnglish
                  ? 'Each case includes challenge, architecture, security controls, expected outcomes, and topology visualization.'
                  : '每个案例都包含业务挑战、推荐架构、安全控制、预期结果与拓扑可视化。'}
              </p>
            </div>

            <div className={styles.caseList}>
              {CASE_STUDIES.map((item, index) => (
                <article
                  key={item.title.zh}
                  className={styles.caseItem}
                  style={{'--case-accent': item.accent} as CSSProperties}>
                  <div className={styles.caseContent}>
                    <div className={styles.caseHead}>
                      <span className={styles.caseIndex}>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <p className={styles.caseSector}>{t(item.sector)}</p>
                        <Heading as="h3" className={styles.caseTitle}>
                          {t(item.title)}
                        </Heading>
                      </div>
                    </div>
                    <p className={styles.caseSummary}>{t(item.summary)}</p>

                    <dl className={styles.caseDetails}>
                      <div>
                        <dt>{isEnglish ? 'Challenge' : '业务挑战'}</dt>
                        <dd>{t(item.challenge)}</dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? 'Architecture' : '推荐架构'}</dt>
                        <dd>{t(item.architecture)}</dd>
                      </div>
                      <div>
                        <dt>{isEnglish ? 'Outcome' : '预期结果'}</dt>
                        <dd>{t(item.outcome)}</dd>
                      </div>
                    </dl>

                    <div className={styles.controlBox}>
                      <strong>{isEnglish ? 'Security controls' : '安全控制点'}</strong>
                      <ul>
                        {item.controls.map((control) => (
                          <li key={control.zh}>{t(control)}</li>
                        ))}
                      </ul>
                    </div>

                    <Link className={styles.caseLink} to={item.docsTo}>
                      {isEnglish ? 'Open implementation guide' : '查看落地文档'}
                    </Link>
                  </div>

                  <div className={styles.caseVisual}>
                    {index === 0 ? (
                      <figure className={styles.topologyFigure}>
                        <video
                          className={styles.caseVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label={
                            isEnglish
                              ? `${t(item.title)} scenario video`
                              : `${t(item.title)} 场景演示视频`
                          }>
                          <source src={homeScenarioVideo} type="video/mp4" />
                        </video>
                        <figcaption className={styles.topologyCaption}>{t(item.scale)}</figcaption>
                      </figure>
                    ) : index === 1 ? (
                      <figure className={styles.topologyFigure}>
                        <img
                          className={styles.caseImage}
                          src={serverSshImage}
                          alt={
                            isEnglish
                              ? `${t(item.title)} scenario image`
                              : `${t(item.title)} 场景配图`
                          }
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption className={styles.topologyCaption}>{t(item.scale)}</figcaption>
                      </figure>
                    ) : index === 2 ? (
                      <figure className={styles.topologyFigure}>
                        <img
                          className={styles.caseImage}
                          src={nvrImage}
                          alt={
                            isEnglish
                              ? `${t(item.title)} scenario image`
                              : `${t(item.title)} 场景配图`
                          }
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption className={styles.topologyCaption}>{t(item.scale)}</figcaption>
                      </figure>
                    ) : index === 3 ? (
                      <figure className={styles.topologyFigure}>
                        <img
                          className={styles.caseImage}
                          src={multiServerImage}
                          alt={
                            isEnglish
                              ? `${t(item.title)} scenario image`
                              : `${t(item.title)} 场景配图`
                          }
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption className={styles.topologyCaption}>{t(item.scale)}</figcaption>
                      </figure>
                    ) : index === 4 ? (
                      <figure className={styles.topologyFigure}>
                        <img
                          className={styles.caseImage}
                          src={factoryImage}
                          alt={
                            isEnglish
                              ? `${t(item.title)} scenario image`
                              : `${t(item.title)} 场景配图`
                          }
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption className={styles.topologyCaption}>{t(item.scale)}</figcaption>
                      </figure>
                    ) : index === 5 ? (
                      <figure className={styles.topologyFigure}>
                        <img
                          className={styles.caseImage}
                          src={engineerImage}
                          alt={
                            isEnglish
                              ? `${t(item.title)} scenario image`
                              : `${t(item.title)} 场景配图`
                          }
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption className={styles.topologyCaption}>{t(item.scale)}</figcaption>
                      </figure>
                    ) : (
                      <TopologyGraph item={item} index={index} t={t} />
                    )}
                    <ol className={styles.flowList}>
                      {item.flow.map((step) => (
                        <li key={step.zh}>{t(step)}</li>
                      ))}
                    </ol>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalSection}>
          <div className={styles.sectionInner}>
            <div className={styles.finalPanel}>
              <Heading as="h2" className={styles.finalTitle}>
                {isEnglish
                  ? 'A continuously evolving library of industry use cases'
                  : '持续更新的行业实践案例库'}
              </Heading>
              <p>
                {isEnglish
                  ? 'Built on a consistent structure, this page supports solution communication, implementation planning, and operations optimization.'
                  : '基于统一结构沉淀案例内容，支持方案沟通、实施规划与运营优化。'}
              </p>
              <div className={styles.finalActions}>
                <Link className={clsx('button button--lg', styles.primaryAction)} to="/docs/introduction/what-is-larktun">
                  {isEnglish ? 'Product introduction' : '产品介绍'}
                </Link>
                <Link className={clsx('button button--lg', styles.secondaryAction)} to="https://larktun.com">
                  {isEnglish ? 'Visit larktun.com' : '访问 larktun.com'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
