import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const prisma = new PrismaClient()
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
