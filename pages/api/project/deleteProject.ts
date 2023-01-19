import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../prisma'

type Data = {
  name: string
}

export default async function deleteProject(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = JSON.parse(req.body)
  const deleteProject = await prisma.project.delete({
    where: {
      id,
    },
  })
  res.json(deleteProject)
}
