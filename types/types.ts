import { ParsedUrlQuery } from 'querystring'

export type Type = {
  label: string
  value: string
}

export type Project = {
  id: string
  name: string
  type: Type | string
  tasks?: Task[]
}

// type User = {
//   label: string
//   imgUrl: string
// }

export type Task = {
  id: string
  name: string
  type: string
  description: string
  status: string
  assignee: string
  reporter: string
  projectId: string
}

export interface IParams extends ParsedUrlQuery {
  id: string
}
