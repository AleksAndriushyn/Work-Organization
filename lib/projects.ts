import { PrismaClient } from '@prisma/client'
import { Project } from '../types/types'

const prisma = new PrismaClient()

export async function getProjects() {
  let projectsData: any = await prisma.project.findMany()
  projectsData = projectsData.map((el: any) => {
    el.type = JSON.parse(el.type)
    return el
  })

  return projectsData
}

export async function getEachProjectId() {
  const projectsData: Project[] = await getProjects()
  const ids = projectsData.map((el: Project) => ({
    params: { id: el.id },
  }))
  return ids
}

export async function getProjectById(itemID: string) {
  const project = await prisma.project.findUnique({
    where: { id: itemID },
    include: { tasks: true },
  })
  const projects = await getProjects()

  if (!project) {
    return {
      props: { hasError: true },
    }
  }

  return {
    props: {
      project,
      projects,
    },
  }
}
