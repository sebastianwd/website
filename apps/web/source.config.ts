import { defineCollections } from 'fumadocs-mdx/config'
import { z } from 'zod'

export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string().date().or(z.date()),
    image: z.string().optional()
  })
})
