import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../prisma'

type Data = {
  name: string
}
export default async function getTasks(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tasks: any = await prisma.task.findMany()
  return res.json(tasks)
}
