import { NextApiRequest, NextApiResponse } from 'next'
import { Template } from '../../../types/types'
import { prisma } from '../prisma'

export default async function getTemplates(
  req: NextApiRequest,
  res: NextApiResponse<Template[]>
) {
  let templateData: any = await prisma.template.findMany()
  console.log(templateData)
  templateData = templateData.map((template: Template) => {
    template.assignee = JSON.parse(template.assignee as string)
    template.type = JSON.parse(template.type as string)
    return template
  })
  return res.json(templateData)
}
