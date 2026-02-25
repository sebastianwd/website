import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { MDX } from '~/components/mdx'
import { getPostBySlug } from '~/lib/posts'
import { SITE_NAME, SITE_URL } from '~/lib/site'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const url = `${SITE_URL}/blog/${params.slug}`
    const image = loaderData.image ? `${SITE_URL}${loaderData.image}` : undefined
    const meta = [
      { title: `${loaderData.title} | ${SITE_NAME}` },
      { name: 'description', content: loaderData.description },
      { property: 'og:type', content: 'article' as const },
      { property: 'og:title', content: loaderData.title },
      { property: 'og:description', content: loaderData.description },
      { property: 'og:url', content: url },
      ...(image ? [{ property: 'og:image', content: image } as const] : []),
      { name: 'twitter:card', content: 'summary_large_image' as const },
      { name: 'twitter:title', content: loaderData.title },
      { name: 'twitter:description', content: loaderData.description },
      ...(image ? [{ name: 'twitter:image', content: image } as const] : [])
    ]
    const scripts = [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: loaderData.title,
          description: loaderData.description,
          ...(image && { image }),
          author: { '@type': 'Person', name: loaderData.author },
          datePublished: new Date(loaderData.date).toISOString()
        })
      }
    ]
    return {
      meta,
      links: [{ rel: 'canonical', href: url }],
      scripts
    }
  },
  component: BlogPost
})

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <div className='relative overflow-hidden'>
      <section className='container mx-auto px-6 pt-16 pb-12 lg:max-w-5xl'>
        <Link to='/blog' className='mb-8 inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m15 18-6-6 6-6' />
          </svg>
          Back to Blog
        </Link>

        <h1 className='mb-2 text-4xl font-bold'>{post.title}</h1>
        <p className='mb-4 text-lg text-zinc-400'>{post.description}</p>

        <div className='mb-8'>
          <p className='text-sm text-zinc-400'>
            By {post.author} •{' '}
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <article className='prose-ui w-full max-w-full [&_img]:object-contain'>
          <MDX content={post.content} mdast={post.mdast} />
        </article>
      </section>
    </div>
  )
}
