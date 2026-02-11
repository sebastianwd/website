import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { Surface } from '~/components/surface'
import { WordAnimator } from '~/components/word-animator'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
  loader: async () => {
    const data = await serverLoader()
    return data
  }
})

const serverLoader = createServerFn({
  method: 'GET'
}).handler(async () => {
  const { blog } = await import('~/lib/source')
  const posts = blog.getPages()
  return {
    posts: posts.map((post) => ({
      url: post.url,
      title: post.data.title,
      description: post.data.description,
      author: post.data.author,
      date: post.data.date
    }))
  }
})

function BlogIndex() {
  const { posts } = Route.useLoaderData()

  return (
    <div className='relative overflow-hidden'>
      <section className='container mx-auto px-6 pt-10 pb-20 lg:max-w-5xl'>
        <div className='mb-8'>
          <WordAnimator tag='h1' words='Blog' className='font-clvtc mb-4 h-12 text-4xl tracking-wider text-accent' />
          <p className='text-zinc-300'>Thoughts, tutorials, and insights about web development.</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {posts.map((post) => (
            <Link key={post.url} to={post.url}>
              <Surface className='h-full p-6 transition-all duration-200 hover:border-accent hover:shadow-lg hover:shadow-accent/10'>
                <h2 className='mb-2 text-xl font-semibold text-white'>{post.title}</h2>
                <p className='mb-4 text-zinc-400'>{post.description}</p>
                <div className='flex items-center justify-between text-sm text-zinc-500'>
                  <span>{post.author}</span>
                  <time dateTime={post.date.toString()}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </Surface>
            </Link>
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
