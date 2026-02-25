import { os } from '@orpc/server'

export type ApiContext = {
  request?: Request
}

export const o = os.$context<ApiContext>()

export const publicProcedure = o
