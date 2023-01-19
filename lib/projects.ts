import { server } from '../config'
import { Project } from '../types/types'

export async function getProjects(): Promise<Project[]> {
  console.log('server', server)
  return await fetch(`${server}/api/project/getProjects`, {
    method: 'GET',
  }).then(async (res) => await res.json())
}

export async function getProjectById(itemID: string) {
  const project: Project = await fetch(
    `${server}/api/project/getProjectById?id=${itemID}`,
    {
      method: 'GET',
    }
  ).then(async (res) => await res.json())

  if (!project) {
    return {
      props: { hasError: true },
    }
  }

  return {
    props: {
      project,
    },
  }
}
