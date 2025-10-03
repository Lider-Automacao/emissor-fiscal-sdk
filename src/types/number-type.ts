import z from 'zod'

export const NumberSchema = z
  .any()
  .transform((value) => (Number.isNaN(value) ? undefined : Number(value)))
  .pipe(z.number())

export const IntSchema = z
  .any()
  .transform((value) => (Number.isNaN(value) ? undefined : Number(value)))
  .pipe(z.number())

export const NullishNumberSchema = z
  .any()
  .transform((value) => (Number.isNaN(value) ? null : Number(value)))
  .pipe(z.number())
  .nullish()

