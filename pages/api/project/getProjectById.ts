import { NextApiRequest, NextApiResponse } from 'next'
import { Comment, Project, Task } from '../../../types/types'
import { prisma } from '../prisma'

export default async function getProjectById(
  req: NextApiRequest,
  res: NextApiResponse<Project>
) {
  const { id } = req.query as Partial<{ [key: string]: string | string[] }>
  const project = (await prisma.project.findUnique({
    where: { id: id as string },
    include: { tasks: { include: { comments: true } } },
  })) as Project
  if (project)
    project.tasks = project?.tasks?.map((task: Task) => {
      task.assignee = JSON.parse(task.assignee as string)
      task.status = JSON.parse(task.status as string)
      task.type = JSON.parse(task.type as string)
      task.reporter = JSON.parse(task.reporter as string)
      task.comments = (task.comments as Comment[]).map((comment: Comment) => {
        comment.author = JSON.parse(comment.author as string)
        return comment
      })
      return task
    })
  return res.json(project)
}
