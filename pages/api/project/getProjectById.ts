import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../prisma'

type Data = {
  name: string
}
export default async function getProjectById(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: true },
  })

  return res.json(project)
}
