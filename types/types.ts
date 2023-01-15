export type Type = {
  id: string
  label: string
  value: string
}

export type Project = {
  id: string
  name: string
  type: Type
  tasks?: Task[]
}

type User = {
  label: string
  imgUrl: string
}

export type Task = {
  id: string
  name: string
  type: string
  description: string
  status: string
  assignee: User
  reporter: string
  projectId: string
}
