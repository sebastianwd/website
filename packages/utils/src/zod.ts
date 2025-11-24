import { z } from 'zod'

export function zObjectValues<T extends Record<string, any>>(obj: T) {
  const values = Object.values(obj) as T[keyof T][]
  return z.enum(values as [T[keyof T], ...T[keyof T][]])
}
