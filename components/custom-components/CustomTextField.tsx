import TextField from '@mui/material/TextField'
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react'

export const CustomTextField = ({
  setIsEditing,
  handleOutFocus,
  onKeyDown,
  isEditing,
  style,
  placeholder,
  onChange,
  value,
  disabled,
}: {
  setIsEditing: MouseEventHandler<HTMLDivElement>
  handleOutFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>
  isEditing: boolean
  style?: any
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  value: string
  disabled?: boolean
}) => {
  return (
    <TextField
      multiline
      fullWidth
      disabled={disabled}
      onClick={setIsEditing}
      onBlur={handleOutFocus}
      onKeyDown={onKeyDown}
      InputProps={{
        disableUnderline: !isEditing,
        style: style,
      }}
      sx={{
        '& .MuiInputBase-input.Mui-disabled': {
          WebkitTextFillColor: 'black',
        },
      }}
      placeholder={placeholder}
      onChange={onChange}
      value={value ?? ''}
      variant="standard"
    />
  )
}
