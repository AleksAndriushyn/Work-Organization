import { Button } from '@mui/material'

const CreateButton = ({ handleClickOpen, text }: any) => {
  return (
    <div style={{ width: '100%' }}>
      <Button
        variant={'contained'}
        style={{ float: 'right', margin: '10px 30px 0 0' }}
        onClick={() => handleClickOpen(true)}
      >
        {text}
      </Button>
    </div>
  )
}
export default CreateButton
