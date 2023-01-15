import { PrismaClient, Task } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTasks() {
  let tasksData: Task[] = await prisma.task.findMany()

  return tasksData
}

export async function getTaskById(itemID: string) {
  const task = await prisma.task.findUnique({
    where: { id: itemID },
  })

  if (!task) {
    return {
      props: { hasError: true },
    }
  }

  return {
    props: {
      task,
    },
  }
}
