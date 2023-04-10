import { NextApiRequest, NextApiResponse } from 'next'
import { Comment } from '../../../types/types'
import { prisma } from '../prisma'

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse<Comment>
) {
  const data = JSON.parse(req.body)
  data.author = JSON.stringify(data.author)

  let savedComment

  if (data.id) {
    savedComment = await prisma.comment.update({ where: { id: data.id }, data })
  } else savedComment = await prisma.comment.create({ data })

  console.log(savedComment)

  return res.json(savedComment)
}
