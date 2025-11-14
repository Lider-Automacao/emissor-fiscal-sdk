import { isEmpty } from "@raicamposs/toolkit";
import z from "zod";

export const DateSchema = z.union([z.date(), z.iso.date()]).transform(value => new Date(value));
export const DateNullishSchema = z.union([z.date(), z.iso.date().transform(value => isEmpty(value) ? null : new Date(value))]).nullish();