import { server } from '../config'
import { Template } from '../types/types'

export const getTemplates = async (): Promise<Template[]> => {
  return await fetch(`${server}/api/template/getTemplates`, {
    method: 'GET',
  }).then(async (res) => await res.json())
}
