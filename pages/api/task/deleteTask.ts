import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const prisma = new PrismaClient()
export default async function deleteTask(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = JSON.parse(req.body)
  const deleteTask = await prisma.task.delete({
    where: {
      id,
    },
  })
  res.json(deleteTask)
}
