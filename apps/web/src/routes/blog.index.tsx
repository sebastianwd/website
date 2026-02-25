import { createFileRoute, Link } from '@tanstack/react-router'

import { Surface } from '~/components/surface'
import { WordAnimator } from '~/components/word-animator'
import { getAllPosts } from '~/lib/posts'
import { SITE_NAME, SITE_URL } from '~/lib/site'

function titleWithAccent(title: string) {
  const words = title.trim().split(/\s+/)
  if (words.length <= 2) return { lead: '', accent: title }
  const accentCount = Math.min(2, words.length)
  const accentStart = words.length - accentCount
  return {
    lead: words.slice(0, accentStart).join(' '),
    accent: words.slice(accentStart).join(' ')
  }
}

function BlogCard({
  post
}: {
  post: {
    url: string
    title: string
    description: string
    date: string
    image?: string
  }
}) {
  const { lead, accent } = titleWithAccent(post.title)
  const dateFormatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <Link key={post.url} to={post.url} className='block'>
      <div className='flex flex-col gap-4 transition-all duration-200 hover:translate-y-[-2px]'>
        <Surface className='overflow-hidden'>
          <div className='relative aspect-16/10 w-full bg-zinc-900'>
            {post.image ? (
              <img src={post.image} alt='' className='absolute inset-0 size-full object-cover' />
            ) : (
              <div className='flex size-full items-center justify-center text-zinc-600' />
            )}
          </div>
        </Surface>
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg leading-snug font-semibold text-white'>
            {lead && <span>{lead} </span>}
            <span className='text-accent'>{accent}</span>
          </h2>
          <p className='line-clamp-2 text-sm text-zinc-400'>{post.description}</p>
          <time dateTime={new Date(post.date).toISOString()} className='text-xs text-zinc-500'>
            {dateFormatted}
          </time>
        </div>
      </div>
    </Link>
  )
}

const BLOG_DESCRIPTION = 'Some of my experiences and learnings about web development.'

export const Route = createFileRoute('/blog/')({
  loader: () => {
    const posts = getAllPosts()
    return {
      posts: posts.map((post) => ({
        url: `/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        author: post.author,
        date: post.date,
        image: post.image
      }))
    }
  },
  head: () => ({
    meta: [
      { title: `Blog | ${SITE_NAME}` },
      { name: 'description', content: BLOG_DESCRIPTION },
      { property: 'og:title', content: `Blog | ${SITE_NAME}` },
      { property: 'og:description', content: BLOG_DESCRIPTION },
      { property: 'og:url', content: `${SITE_URL}/blog` },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `Blog | ${SITE_NAME}` },
      { name: 'twitter:description', content: BLOG_DESCRIPTION }
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/blog` }]
  }),
  component: BlogIndex
})

function BlogIndex() {
  const { posts } = Route.useLoaderData()

  return (
    <div className='relative overflow-hidden'>
      <section className='container mx-auto px-6 pt-16 pb-20 lg:max-w-5xl'>
        <div className='mb-8'>
          <h1 className='mb-4 flex flex-wrap items-center gap-x-1 font-clvtc text-4xl tracking-wider text-accent'>
            <WordAnimator tag='span' words='Blog' className='h-9 text-accent' />
          </h1>
          <p className='text-zinc-300'>Some of my experiences and learnings about web development.</p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {posts.map((post) => (
            <BlogCard key={post.url} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <Surface className='p-12 text-center'>
            <p className='text-zinc-400'>No blog posts yet. Check back soon!</p>
          </Surface>
        )}
      </section>
    </div>
  )
}
