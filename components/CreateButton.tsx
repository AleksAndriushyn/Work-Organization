import { Button } from '@mui/material'

const CreateButton = ({
  handleClickOpen,
  text,
}: {
  handleClickOpen: Function
  text: string
}) => {
  return (
    <div style={{ width: '100%' }}>
      <Button
        variant={'contained'}
        style={{ float: 'right', margin: '2rem 5rem 0 0' }}
        onClick={() => handleClickOpen(true)}
      >
        {text}
      </Button>
    </div>
  )
}
export default CreateButton
