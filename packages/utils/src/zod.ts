import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function zObjectValues<T extends Record<string, any>>(obj: T) {
  const values = Object.values(obj) as T[keyof T][]
  return z.enum(values as [T[keyof T], ...T[keyof T][]])
}
