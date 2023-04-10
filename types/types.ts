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

export type User = {
  id: string
  name: string
  image: string
  email?: string
  tasks?: Task[]
}

export type Status = {
  label: string
  value: string
}

export type Comment = {
  id: string
  message: string
  author: Omit<User, 'tasks'> | string
}

export type Task = {
  id: string
  name: string
  type: Type | string
  description: string
  status: Status | string
  assignee: User | string
  reporter: User | string
  projectId: string
  comments: Comment[] | string
}

export interface IParams extends ParsedUrlQuery {
  id: string
}

export type Template = Omit<Task, 'reporter' | 'status'> & {
  templateName: string
}

export type ActiveComment = {
  index: number
  message: string
}
