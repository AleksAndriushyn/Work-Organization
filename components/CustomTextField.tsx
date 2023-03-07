import TextField from '@mui/material/TextField'

export const CustomTextField = (props: any) => {
  return (
    <TextField
      multiline
      fullWidth
      onClick={props.setIsEditing}
      onBlur={props.handleOutFocus}
      onKeyDown={props.onKeyDown}
      InputProps={{
        disableUnderline: !props.isEditing,
        style: props.style,
      }}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value ?? ''}
      variant="standard"
    />
  )
}
