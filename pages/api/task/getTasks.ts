import { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '../../../types/types'
import { prisma } from '../prisma'

export default async function getTasks(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
) {
  const tasks: any = await prisma.task.findMany()
  return res.json(tasks)
}
