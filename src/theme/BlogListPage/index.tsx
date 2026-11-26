import type {ReactNode} from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import Heading from '@theme/Heading';

function BlogListPageMetadata({metadata}: Props): ReactNode {
  const {
    siteConfig: {title: siteTitle},
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink, page} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const baseTitle = isBlogOnlyMode ? siteTitle : blogTitle;
  const isPaginated = page > 1;
  const pageSuffix = currentLocale === 'en' ? ` - Page ${page}` : ` - 第 ${page} 页`;
  const title = isPaginated ? `${baseTitle}${pageSuffix}` : baseTitle;

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      {isPaginated && (
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
      )}
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent({metadata, items, sidebar}: Props): ReactNode {
  return (
    <BlogLayout sidebar={sidebar}>
      <header className="margin-bottom--xl">
        <Heading as="h1">{metadata.blogTitle}</Heading>
        <p>{metadata.blogDescription}</p>
      </header>
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
