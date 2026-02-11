import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import browserCollections from 'fumadocs-mdx:collections/browser'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Suspense } from 'react'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  loader: async ({ params }) => {
    const data = await serverLoader({ data: params.slug })
    await clientLoader.preload(data.path)
    return data
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
      date: page.data.date
    }
  })

const clientLoader = browserCollections.blogPosts.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    return (
      <>
        <h1 className='mb-2 text-4xl font-bold'>{frontmatter.title}</h1>
        <p className='mb-4 text-lg text-fd-muted-foreground'>{frontmatter.description}</p>
        <article className='prose'>
          <MDX components={defaultMdxComponents} />
        </article>
      </>
    )
  }
})

function BlogPost() {
  const data = useFumadocsLoader(Route.useLoaderData())

  return (
    <div className='container py-12'>
      <Link to='/blog' className='mb-8 inline-flex items-center gap-2 text-fd-muted-foreground hover:text-fd-foreground'>
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
    </div>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { blog } = await import('~/lib/source')
  return blog.getPages().map((page) => ({
    slug: page.slugs[0]
  }))
}
