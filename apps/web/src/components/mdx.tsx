import { createMdxComponents } from '@prose-ui/react'
import type { ComponentProps } from 'react'
import { SafeMdxRenderer } from 'safe-mdx'

import { BlogImage } from '~/components/blog-image'

export const mdxComponents = {
  ...createMdxComponents(),
  Image: BlogImage
}

type BlogPost = {
  content: string
  mdast: unknown
}

type SafeMdxAst = ComponentProps<typeof SafeMdxRenderer>['mdast']

export function MDX({ content, mdast }: BlogPost) {
  return <SafeMdxRenderer markdown={content} mdast={mdast as SafeMdxAst} components={mdxComponents} />
}
