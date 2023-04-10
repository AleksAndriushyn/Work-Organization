import type { NextApiRequest, NextApiResponse } from 'next'
import { Comment } from '../../../types/types'
import { prisma } from '../prisma'

export default async function deleteComment(
  req: NextApiRequest,
  res: NextApiResponse<Comment>
) {
  const id = JSON.parse(req.body)
  const deletedComment = await prisma.comment.delete({
    where: {
      id,
    },
  })
  res.json(deletedComment as Comment)
}
