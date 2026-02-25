import { createMdxComponents } from '@prose-ui/react'
import type { ComponentProps } from 'react'
import { SafeMdxRenderer } from 'safe-mdx'

import { BlogImage } from '~/components/blog-image'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(getTextFromChildren).join('')
  if (children != null && typeof children === 'object' && 'props' in children) {
    return getTextFromChildren((children as React.ReactElement<{ children: React.ReactNode }>).props.children)
  }
  return ''
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag: `h${typeof level}` = `h${level}`
  return function Heading({ children, className, ...props }: React.ComponentProps<'h1'>) {
    const id = slugify(getTextFromChildren(children)) || undefined
    return (
      <Tag id={id} className={`group scroll-mt-20 ${className ?? ''}`.trim()} {...props}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            className='ml-2 text-accent opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100 focus:opacity-100'
            aria-hidden
            tabIndex={-1}
          >
            #
          </a>
        )}
      </Tag>
    )
  }
}

const baseComponents = createMdxComponents()
export const mdxComponents = {
  ...baseComponents,
  Image: BlogImage,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6)
}

type BlogPost = {
  content: string
  mdast: unknown
}

type SafeMdxAst = ComponentProps<typeof SafeMdxRenderer>['mdast']

export function MDX({ content, mdast }: BlogPost) {
  return <SafeMdxRenderer markdown={content} mdast={mdast as SafeMdxAst} components={mdxComponents} />
}
