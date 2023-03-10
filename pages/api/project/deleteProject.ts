import type { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '../../../types/types'
import { prisma } from '../prisma'

export default async function deleteProject(
  req: NextApiRequest,
  res: NextApiResponse<Project>
) {
  const id = JSON.parse(req.body)
  const deleteProject = await prisma.project.delete({
    where: {
      id,
    },
  })
  res.json(deleteProject as Project)
}
