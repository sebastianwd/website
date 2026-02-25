import { defineCollection, defineConfig } from '@content-collections/core'
import { remarkPlugins } from '@prose-ui/core'
import { remark } from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import { remarkMarkAndUnravel } from 'safe-mdx/parse'
import { z } from 'zod'

type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[]

const mdxProcessor = remark()
  .use(remarkMdx)
  .use(remarkFrontmatter, ['yaml', 'toml'])
  .use(remarkPlugins())
  .use(remarkMarkAndUnravel)
  .use(() => {
    return (tree, file) => {
      file.data.ast = tree
    }
  })

const parseMdxAst = async (content: string): Promise<JsonValue> => {
  const file = await mdxProcessor.process(content)
  return JSON.parse(JSON.stringify(file.data.ast))
}

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string(),
    image: z.string().optional(),
    content: z.string()
  }),
  transform: async (document) => {
    const mdast = await parseMdxAst(document.content)
    const slug = document._meta.filePath.replace(/\.mdx?$/, '')
    return {
      ...document,
      mdast,
      slug
    }
  }
})

export default defineConfig({
  collections: [posts]
})
