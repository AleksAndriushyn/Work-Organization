import { LinearProgress } from '@mui/material'
import { Status } from '../../types/types'

type Color =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'inherit'
  | undefined

const CustomLinearProgress = ({
  value,
  color,
}: {
  value: number
  color?: Color
}) => {
  return (
    <LinearProgress
      value={value}
      variant="determinate"
      color={color ?? 'primary'}
      style={{ backgroundColor: '#dfe1e6', width: '50%' }}
    />
  )
}

export const showProgress = (activeStatus: Status) => {
  switch (activeStatus.value) {
    case 'in-progress':
      return <CustomLinearProgress value={50} />
    case 'done':
      return <CustomLinearProgress value={100} color="success" />
    default:
      return <CustomLinearProgress value={0} />
  }
}
