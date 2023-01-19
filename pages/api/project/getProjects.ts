import { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '../../../types/types'
import { prisma } from '../prisma'

export default async function getProjects(
  req: NextApiRequest,
  res: NextApiResponse<Project[]>
) {
  let projectsData: Project[] = await prisma.project.findMany()
  projectsData = projectsData.map((el: Project) => {
    el.type = JSON.parse(el.type as string)
    return el
  })
  return res.json(projectsData)
}
