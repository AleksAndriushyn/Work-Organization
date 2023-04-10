import type { NextApiRequest, NextApiResponse } from 'next'
import { Comment, Task } from '../../../types/types'
import { prisma } from '../prisma'

export default async function createTask(
  req: NextApiRequest,
  res: NextApiResponse<Task>
) {
  const data = JSON.parse(req.body)
  data.assignee = JSON.stringify(data.assignee)
  data.reporter = JSON.stringify(data.reporter)
  data.status = JSON.stringify(
    data.id
      ? data.status
      : {
          label: 'To Do',
          value: 'to-do',
          color: 'secondary',
        }
  )

  data.type = JSON.stringify(data.type)
  const comments = data.comments?.map((el: Comment) => ({ id: el.id }))

  let savedTask

  if (data?.id) {
    savedTask = await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        comments: { set: comments },
      },
      include: { comments: true },
    })
  } else {
    savedTask = await prisma.task.create({
      data,
      include: { comments: true },
    })
  }

  console.log('savedTask', savedTask)
  savedTask.comments = savedTask.comments.map((comment) => {
    comment.author = JSON.parse(comment.author)
    return comment
  })
  return res.json(savedTask as Task)
}

