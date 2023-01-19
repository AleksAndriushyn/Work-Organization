import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '../../../types/types'
import { prisma } from '../prisma'

export default async function createTask(
  req: NextApiRequest,
  res: NextApiResponse<Task>
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

