import { server } from '../config'
import { Project } from '../types/types'

export const getProjects = async (): Promise<Project[]> => {
  return await fetch(`${server}/api/project/getProjects`, {
    method: 'GET',
  }).then(async (res) => await res.json())
}

export const getProjectById = async (itemID: string):Promise<Project> => {
  const project: Project = await fetch(
    `${server}/api/project/getProjectById?id=${itemID}`,
    {
      method: 'GET',
    }
  ).then(async (res) => await res.json())

  return project
}
