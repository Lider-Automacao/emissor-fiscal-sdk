import z from 'zod';

export const NumberSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number());

export const NumberMinZeroSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number().min(0));

export const NumberMinZeroDefaultZeroSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number().min(0).default(0));

export const IntSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number().int());

export const IntMinZeroSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number().int().min(0));

export const NullishNumberSchema = z
  .union([
    z.number(),
    z.string().transform((value) => Number.isNaN(value) ? undefined : Number(value)),
  ])
  .pipe(z.number())
  .nullish();

export const PercentualSchema = NumberMinZeroDefaultZeroSchema.pipe(z.number().min(0).max(100));