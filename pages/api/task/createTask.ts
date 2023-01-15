import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  type: string
  description: string
  projectId: string
}

const prisma = new PrismaClient()

export default async function createTask(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = JSON.parse(req.body)
  console.log('data', data)
  let savedTask

  if (data.id) {
    savedTask = await prisma.task.update({
      where: {
        id: data.id,
      },
      data,
    })
    return res.json(savedTask)
  }

  savedTask = await prisma.task.create({
    data,
  })

  return res.json(savedTask)
}

