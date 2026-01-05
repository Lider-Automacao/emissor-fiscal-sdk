import { isEmpty } from "@raicamposs/toolkit";
import z from "zod";

export const StringSomenteNumeros = z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  if (isEmpty(value)) return value;
  return value.trim().replace(/\D/g, "");
}, z.string());

export const NullishStringSomenteNumeros = z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  if (isEmpty(value)) return null;
  return value.trim().replace(/\D/g, "");
}, z.string().nullish().optional());


export const NullishString = z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  if (isEmpty(value)) return null;
  return value;
}, z.string().nullish().optional());