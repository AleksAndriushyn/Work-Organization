import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '../../../types/types'
import { prisma } from '../prisma'

export default async function createTask(
  req: NextApiRequest,
  res: NextApiResponse<Task>
) {
  const data = JSON.parse(req.body)
  data.assignee = JSON.stringify(data.assignee)
  data.reporter = JSON.stringify(data.reporter)
  data.status = JSON.stringify(
    data.id
      ? data.status
      : {
          label: 'To Do',
          value: 'to-do',
          color: 'secondary',
        }
  )

  data.type = JSON.stringify(data.type)
  let savedTask

  if (data?.id) {
    savedTask = await prisma.task.update({
      where: {
        id: data.id,
      },
      data,
    })
  } else {
    savedTask = await prisma.task.create({
      data,
    })
  }

  console.log(savedTask)
  return res.json(savedTask as Task)
}




