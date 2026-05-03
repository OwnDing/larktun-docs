import type {ReactNode} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import TagsListByLetter from '@theme/TagsListByLetter';
import type {Props} from '@theme/BlogTagsListPage';
import SearchMetadata from '@theme/SearchMetadata';
import Heading from '@theme/Heading';

function getTagsListDescription(): string {
  return translate({
    id: 'theme.blog.tagsList.description',
    message:
      '浏览云雀通博客的全部标签，按零信任网络、远程访问、Headscale、移动端、服务器访问等主题查找文章。',
  });
}

export default function BlogTagsListPage({tags, sidebar}: Props): ReactNode {
  const title = translateTagsPageTitle();
  const description = getTagsListDescription();

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} description={description} />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout sidebar={sidebar}>
        <Heading as="h1">{title}</Heading>
        <p>{description}</p>
        <TagsListByLetter tags={tags} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
