import { allPosts } from 'content-collections'

export function getAllPosts() {
  return [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug) ?? null
}
