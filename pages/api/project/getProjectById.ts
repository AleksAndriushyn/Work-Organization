import { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '../../../types/types'
import { prisma } from '../prisma'

export default async function getProjectById(
  req: NextApiRequest,
  res: NextApiResponse<Project | null>
) {
  const { id } = req.query as Partial<{ [key: string]: string | string[] }>
  const project = (await prisma.project.findUnique({
    where: { id:id as string },
    include: { tasks: true },
  })) as Project | null

  return res.json(project)
}
