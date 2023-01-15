import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const prisma = new PrismaClient()

export default async function createProject(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST')
    return res.status(405).json({ name: 'Method not allowed' })

  const data = JSON.parse(req.body)
  console.log('data', data)
  data.type = JSON.stringify(data.type)
  let savedProject
  if (data.id) {
    savedProject = await prisma.project.update({
      where: {
        id: data.id,
      },
      data,
    })
    return res.json(savedProject)
  }
  savedProject = await prisma.project.create({
    data,
  })

  return res.json(savedProject)
}

