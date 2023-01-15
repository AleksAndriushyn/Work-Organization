import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTasks() {
  return await prisma.task.findMany()
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
