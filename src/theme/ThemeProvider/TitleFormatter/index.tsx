import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';

const SITE_TITLE_BY_LOCALE: Record<string, string> = {
  'zh-Hans': '云雀通文档',
  en: 'Larktun Docs',
};

const MAX_SEARCH_TITLE_LENGTH = 70;

export default function ThemeProviderTitleFormatter({children}: {children: ReactNode}): ReactNode {
  const {i18n} = useDocusaurusContext();
  const siteTitle = SITE_TITLE_BY_LOCALE[i18n.currentLocale] ?? SITE_TITLE_BY_LOCALE['zh-Hans'];

  return (
    <TitleFormatterProvider
      formatter={({title, titleDelimiter, plugin, defaultFormatter}) =>
        {
          const normalizedTitle = title?.trim();
          const formattedTitle = defaultFormatter({
            title,
            titleDelimiter,
            plugin,
            siteTitle,
          });

          if (
            normalizedTitle &&
            (formattedTitle.length > MAX_SEARCH_TITLE_LENGTH ||
              normalizedTitle.toLowerCase().includes(siteTitle.toLowerCase()))
          ) {
            return normalizedTitle;
          }

          return formattedTitle;
        }
      }>
      {children}
    </TitleFormatterProvider>
  );
}
