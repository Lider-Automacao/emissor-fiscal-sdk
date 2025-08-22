import z from 'zod'

export const NumberSchema = z
  .any()
  .transform((value) => (Number.isNaN(value) ? null : Number(value)))
// .pipe(z.number().optional().nullable())

export const IntSchema = z
  .any()
  .transform((value) => (Number.isNaN(value) ? null : Number(value)))
// .pipe(z.number().int().optional().nullable())
