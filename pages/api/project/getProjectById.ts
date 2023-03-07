import { NextApiRequest, NextApiResponse } from 'next'
import { Project, Task } from '../../../types/types'
import { prisma } from '../prisma'

export default async function getProjectById(
  req: NextApiRequest,
  res: NextApiResponse<Project>
) {
  const { id } = req.query as Partial<{ [key: string]: string | string[] }>
  const project = (await prisma.project.findUnique({
    where: { id: id as string },
    include: { tasks: true },
  })) as Project
  console.log(project?.tasks)
  if (project)
    project.tasks = project?.tasks?.map((task: Task) => {
      task.assignee = JSON.parse(task.assignee as string)
      task.status = JSON.parse(task.status as string)
      task.type = JSON.parse(task.type as string)
      task.reporter = JSON.parse(task.reporter as string)
      return task
    })
  return res.json(project)
}
