export const saveData = async (formData: any, url: string) => {
  const resp = await fetch(`/api/${url}`, {
    method: 'POST',
    body: JSON.stringify(formData),
  })
  return await resp.json()
}

export const onDeleteItem = async (
  id: string,
  setItems: Function,
  items: any,
  url:string
) => {
  const resp = await fetch(`/api/${url}`, {
    method: 'DELETE',
    body: JSON.stringify(id),
  })

  setItems(items.filter((el: any) => el.id !== id))
  return await resp.json()
}
