import z from "zod"
import { Nfce } from "../models"
import { PedidoItemSchema } from "./pedido-item"

export const RequestNFCeSchema = z.array(PedidoItemSchema)

export type CalculaNfceRequest = z.infer<typeof RequestNFCeSchema>
export type CalculaNfceResponse = Pick<Nfce, 'itens' | 'total'>