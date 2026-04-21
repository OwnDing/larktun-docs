import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';

const SITE_TITLE_BY_LOCALE: Record<string, string> = {
  'zh-Hans': '云雀通',
  en: 'Larktun',
};

export default function ThemeProviderTitleFormatter({children}: {children: ReactNode}): ReactNode {
  const {i18n} = useDocusaurusContext();
  const siteTitle = SITE_TITLE_BY_LOCALE[i18n.currentLocale] ?? SITE_TITLE_BY_LOCALE['zh-Hans'];

  return (
    <TitleFormatterProvider
      formatter={({title, titleDelimiter, plugin, defaultFormatter}) =>
        defaultFormatter({
          title,
          titleDelimiter,
          plugin,
          siteTitle,
        })
      }>
      {children}
    </TitleFormatterProvider>
  );
}
