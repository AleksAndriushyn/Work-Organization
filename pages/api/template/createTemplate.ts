import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../prisma'
import { Template } from '../../../types/types'

export default async function createTemplate(
  req: NextApiRequest,
  res: NextApiResponse<Template>
) {
  const data = JSON.parse(req.body)
  data.assignee = JSON.stringify(data.assignee)
  delete data.reporter
  delete data.status
  delete data.comments
  data.type = JSON.stringify(data.type)

  const savedTemplate = await prisma.template.create({
    data,
  })

  console.log(savedTemplate)
  return res.json(savedTemplate as Template)
}
