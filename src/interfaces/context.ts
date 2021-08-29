import { PrismaClient } from "@prisma/client"
import { Request, Response, request, response } from "express"

const prisma = new PrismaClient()

export type Context = {
  prisma: PrismaClient
  req?: Request
  res?: Response
}

export const context: Context = {
  prisma: prisma,
  req: request,
  res: response
}
