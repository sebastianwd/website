import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import browserCollections from 'fumadocs-mdx:collections/browser'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Suspense } from 'react'

import { BlogImage } from '~/components/blog-image'
import { SITE_NAME, SITE_URL } from '~/lib/site'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  loader: async ({ params }) => {
    const data = await serverLoader({ data: params.slug })
    await clientLoader.preload(data.path)
    return data
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
  }
})

const serverLoader = createServerFn({
  method: 'GET'
})
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { blog } = await import('~/lib/source')
    const page = blog.getPage([slug])
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    if (!page) throw notFound()

    return {
      path: page.path,
      title: page.data.title,
      description: page.data.description,
      author: page.data.author,
      date: page.data.date,
      image: page.data.image
    }
  })

const clientLoader = browserCollections.blogPosts.createClientLoader({
  component({ toc: _toc, frontmatter, default: MDX }) {
    return (
      <>
        <h1 className='mb-2 text-4xl font-bold'>{frontmatter.title}</h1>
        <p className='mb-4 text-lg text-fd-muted-foreground'>{frontmatter.description}</p>
        <article className='prose'>
          <MDX components={{ ...defaultMdxComponents, Image: BlogImage }} />
        </article>
      </>
    )
  }
})

function BlogPost() {
  const data = useFumadocsLoader(Route.useLoaderData())

  return (
    <div className='relative overflow-hidden'>
      <section className='container mx-auto px-6 pt-16 pb-12 lg:max-w-5xl'>
        <Link
          to='/blog'
          className='mb-8 inline-flex items-center gap-2 text-fd-muted-foreground hover:text-fd-foreground'
        >
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

        <div className='mb-8'>
          <p className='text-sm text-fd-muted-foreground'>
            By {data.author} •{' '}
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <Suspense fallback={<div className='text-fd-muted-foreground'>Loading...</div>}>
          {clientLoader.useContent(data.path)}
        </Suspense>
      </section>
    </div>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { blog } = await import('~/lib/source')
  return blog.getPages().map((page) => ({
    slug: page.slugs[0]!
  }))
}
