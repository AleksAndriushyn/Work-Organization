import type { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '../../../types/types'
import { prisma } from '../prisma'

export default async function createProject(
  req: NextApiRequest,
  res: NextApiResponse<Project>
) {
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

