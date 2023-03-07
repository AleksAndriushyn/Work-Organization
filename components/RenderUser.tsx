import { Avatar } from '@mui/material'

const RenderUser = ({ name, image }: { name: string; image: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
      }}
    >
      <Avatar src={image ?? ''} alt={name ?? ''} variant="rounded" />
      {name}
    </div>
  )
}
export default RenderUser
