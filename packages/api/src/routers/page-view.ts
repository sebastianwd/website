import { Redis } from '@upstash/redis'
import dayjs from 'dayjs'
import { z } from 'zod'

import { o } from '../lib/orpc.server'

const slugInput = z.object({ slug: z.string().optional().default('/') })

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required')
  return new Redis({ url, token })
}

export const pageView = {
  get: o.input(slugInput).handler(async ({ input }) => {
    const redis = getRedis()
    const total = await redis.get(['portfolio-total', input.slug].join(':'))
    const unique = await redis.scard('portfolio-unique')
    return {
      total: total ? parseInt(total as string) : 0,
      unique: unique || 0
    }
  }),

  track: o.input(slugInput).handler(async ({ input, context }) => {
    const request = context.request
    if (!request) throw new Error('Request context required for track')

    const redis = getRedis()
    const date = new Date()
    const country = request.headers.get('x-vercel-ip-country') ?? 'unknown'
    const city = request.headers.get('x-vercel-ip-city') ?? 'unknown'
    const latitude = request.headers.get('x-vercel-ip-latitude') ?? '0'
    const longitude = request.headers.get('x-vercel-ip-longitude') ?? '0'

    const uniqueViewsKey = [country, city.replace(/[^a-zA-Z ]/g, ' '), latitude, longitude, input.slug].join(':')
    const totalViewsKey = [dayjs(date).format('MM/DD/YYYY'), uniqueViewsKey].join(':')

    await redis.sadd('portfolio-unique', uniqueViewsKey)

    const isNew = await redis.set(['deduplicate', totalViewsKey].join(':'), true, {
      nx: true,
      ex: 60 * 60 * 6
    })

    if (!isNew) return { message: 'Ok!' }

    await redis.incr(['portfolio-total', input.slug].join(':'))
    return { message: 'Ok!' }
  })
}
