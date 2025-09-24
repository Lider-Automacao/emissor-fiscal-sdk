import { isEmpty } from "@raicamposs/toolkit";
import z from "zod";

export const NullishString = z.string().nullish().transform(value => isEmpty(value) ? undefined : value)