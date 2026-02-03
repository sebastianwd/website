import { createFileRoute } from '@tanstack/react-router'
import { Redis } from '@upstash/redis'
import dayjs from 'dayjs'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export const Route = createFileRoute('/api/page-view')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const date = new Date()
        const { slug } = await request.json()

        const country = request.headers.get('x-vercel-ip-country') ?? 'unknown'
        const city = request.headers.get('x-vercel-ip-city') ?? 'unknown'
        const latitude = request.headers.get('x-vercel-ip-latitude') ?? '0'
        const longitude = request.headers.get('x-vercel-ip-longitude') ?? '0'

        if (!slug) {
          return Response.json({ message: 'Missing required parameters' }, { status: 400 })
        }

        const uniqueViewsKey = [country, city.replace(/[^a-zA-Z ]/g, ' '), latitude, longitude, slug].join(':')

        const totalViewsKey = [dayjs(date).format('MM/DD/YYYY'), uniqueViewsKey].join(':')

        await redis.sadd('portfolio-unique', uniqueViewsKey)

        const isNew = await redis.set(['deduplicate', totalViewsKey].join(':'), true, {
          nx: true,
          ex: 60 * 60 * 6
        })

        if (!isNew) {
          return Response.json({ message: 'Ok!' })
        }

        await redis.incr(['portfolio-total', slug].join(':'))

        return Response.json({ message: 'Ok!' })
      },

      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url)
        const slug = searchParams.get('slug')

        const total = await redis.get(['portfolio-total', slug].join(':'))
        const unique = await redis.scard('portfolio-unique')

        return Response.json(
          {
            total: total ? parseInt(total as string) : 0,
            unique: unique || 0
          },
          {
            headers: {
              'Cache-Control': 'public, max-age=21600'
            }
          }
        )
      }
    }
  }
})
