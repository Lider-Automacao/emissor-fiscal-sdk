import z from "zod";
import { CST_IBS_CBS_SCHEMA } from "../auxiliares";

export const NFSeIbsCbsSchema = z.object({
  cst: CST_IBS_CBS_SCHEMA,
  classTrib: z.string().min(1).nullable().optional(),
});


export type NFSeIbsCbs = z.infer<typeof NFSeIbsCbsSchema>;