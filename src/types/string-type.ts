import { isEmpty } from "@raicamposs/toolkit";
import z from "zod";

export const NullishString = z.string().transform(value => isEmpty(value) ? null : value).nullable().optional();

export const StringSomenteNumeros = z.string().transform(value => value.replaceAll(/\D/g, ''));
