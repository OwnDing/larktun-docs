import type {ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

const MIN_HEIGHT = 980;

export default function ArchitectureDemoEmbed(): ReactNode {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [frameHeight, setFrameHeight] = useState(MIN_HEIGHT);
  const demoUrl = useBaseUrl('/architecture-demo/');

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return undefined;
    }

    let observer: ResizeObserver | undefined;

    const syncHeight = () => {
      try {
        const doc = iframe.contentWindow?.document;

        if (!doc) {
          return;
        }

        const nextHeight = Math.max(
          doc.body.scrollHeight,
          doc.documentElement.scrollHeight,
          MIN_HEIGHT,
        );

        setFrameHeight(nextHeight);
      } catch {
        setFrameHeight(MIN_HEIGHT);
      }
    };

    const attachObserver = () => {
      syncHeight();

      if (typeof ResizeObserver === 'undefined') {
        return;
      }

      try {
        const doc = iframe.contentWindow?.document;

        if (!doc) {
          return;
        }

        observer = new ResizeObserver(syncHeight);
        observer.observe(doc.body);
        observer.observe(doc.documentElement);
      } catch {
        observer = undefined;
      }
    };

    iframe.addEventListener('load', attachObserver);
    attachObserver();

    return () => {
      iframe.removeEventListener('load', attachObserver);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.copy}>
          <strong className={styles.title}>
            <Translate id="architectureDemo.card.title">在线架构模拟</Translate>
          </strong>
          <p className={styles.description}>
            <Translate id="architectureDemo.card.description">
              在文档页内直接体验登录、直连和 DERP 中继路径，也可以在新窗口中打开完整演示。
            </Translate>
          </p>
        </div>
        <Link
          className="button button--primary button--sm"
          to={demoUrl}
          target="_blank"
          rel="noopener noreferrer">
          <Translate id="architectureDemo.card.action">打开完整演示</Translate>
        </Link>
      </div>
      <div className={styles.frameShell}>
        <iframe
          ref={iframeRef}
          className={styles.frame}
          src={demoUrl}
          title={translate({
            id: 'architectureDemo.frame.title',
            message: 'Larktun 产品架构在线模拟',
          })}
          style={{height: `${frameHeight}px`}}
          loading="lazy"
        />
      </div>
    </div>
  );
}
