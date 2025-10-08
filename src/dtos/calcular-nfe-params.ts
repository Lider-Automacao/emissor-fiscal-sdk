import z from "zod"
import { Nfe } from "../models"
import { PedidoItemSchema } from "./pedido-item"

export const RequestNFeSchema = z.array(PedidoItemSchema)

export type CalculaNfeRequest = z.infer<typeof RequestNFeSchema>
export type CalculaNfeResponse = Pick<Nfe, 'itens' | 'total'>