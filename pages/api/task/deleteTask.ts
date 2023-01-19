import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '../../../types/types'
import { prisma } from '../prisma'

export default async function deleteTask(
  req: NextApiRequest,
  res: NextApiResponse<Task>
) {
  const id = JSON.parse(req.body)
  const deleteTask = await prisma.task.delete({
    where: {
      id,
    },
  })
  res.json(deleteTask)
}
