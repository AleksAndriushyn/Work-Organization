import { server } from '../config'

export async function getTasks() {
  return await fetch(`${server}/api/task/getTasks`, {
    method: 'GET',
  }).then(async (res) => await res.json())
}
