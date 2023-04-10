import { Avatar } from '@mui/material'

const CustomUser = ({ name, image }: { name: string; image: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
      }}
    >
      <Avatar src={image ?? ''} alt={name ?? ''} variant="rounded" />
      <p
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '9rem',
        }}
      >
        {name}
      </p>
    </div>
  )
}
export default CustomUser
