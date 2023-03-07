import { v4 as uuidv4 } from 'uuid'
import { User } from '../types/types'

export async function getRandomUsers(): Promise<User[]> {
  const data = await fetch('https://randomuser.me/api/?results=10', {
    method: 'GET',
  })
    .then(async (res) => await res.json())
    .then((data) =>
      data.results.map((res: any) => ({
        id: (res.id.value ?? res.id.name).split(/\s+/) + uuidv4(),
        name: res.name.first + ' ' + res.name.last,
        image: res.picture.thumbnail,
      }))
    )
  return data
}
