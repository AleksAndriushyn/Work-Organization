import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../prisma'

type Data = {
  name: string
}
export default async function getProjects(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let projectsData: any = await prisma.project.findMany()
  projectsData = projectsData.map((el: any) => {
    el.type = JSON.parse(el.type)
    return el
  })
  return res.json(projectsData)
}
