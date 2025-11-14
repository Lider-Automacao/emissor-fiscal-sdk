import z from 'zod'

export const NumberSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number())

export const IntSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number().int())

export const NullishNumberSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number())
  .nullish()

