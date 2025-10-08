import z from "zod";

export const PartilhaSchema = z.object({
  baseCalculoIcms: z.number().nullish(),
  baseCalculoFcp: z.number().nullish(),
  percentualIcmsFcp: z.number().nullish(),
  aliquotaInterna: z.number().nullish(),
  aliquotaInterestadual: z.number().nullish(),
  icmsRelativoFcp: z.number().nullish(),
  icmsInterestadual: z.number().nullish(),
  aliquotaInterestadualPart: z.number().nullish(),
});

export type Partilha = z.infer<typeof PartilhaSchema>;
