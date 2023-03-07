import { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '../../../types/types'
import { prisma } from '../prisma'

export default async function getTasks(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
) {
  let tasksData: any = await prisma.task.findMany()
  tasksData = tasksData.map((task: Task) => {
    task.assignee = JSON.parse(task.assignee as string)
    task.status = JSON.parse(task.status as string)
    task.type = JSON.parse(task.type as string)
    task.reporter = JSON.parse(task.reporter as string)
    return task
  })
  return res.json(tasksData)
}
