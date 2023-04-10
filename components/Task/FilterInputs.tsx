import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { ChangeEvent, MouseEventHandler, useState } from 'react'
import { User } from '../../types/types'
type FilterOption = {
  name: string
  projectName: string
  assignee: User | null
}
type FilterInputsProps = {
  filterOptions: FilterOption
  assignees: User[]
  setFilterOptions: Function
}

const FilterInputs = ({
  filterOptions,
  assignees,
  setFilterOptions,
}: FilterInputsProps) => {
  const [numOptions, setNumOptions] = useState(3)

  const handleLoadMore = () => {
    setNumOptions(numOptions + 3)
  }

  const handleLoadLess = () => {
    setNumOptions(numOptions - 3)
  }

  const CustomMenuItem = ({
    value,
    children,
    onClick,
  }: {
    value?: string | undefined | null
    children: JSX.Element
    onClick?: MouseEventHandler<HTMLLIElement>
  }) => (
    <MenuItem value={value ?? ''} onClick={onClick}>
      {children}
    </MenuItem>
  )

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterOptions((prev: FilterOption) => ({
      ...prev,
      name: e.target.value,
    }))

  const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterOptions((prev: FilterOption) => ({
      ...prev,
      projectName: e.target.value,
    }))

  const onAssigneeChange = (e: SelectChangeEvent<string>) =>
    setFilterOptions((prev: FilterOption) => ({
      ...prev,
      assignee: assignees.find((assignee) => assignee.name === e.target.value),
    }))

  const onUnselect = () =>
    setFilterOptions((prev: FilterOption) => ({
      ...prev,
      assignee: null,
    }))

  return (
    <Box style={{ display: 'flex', gap: '1rem' }}>
      <TextField
        label="Find by name"
        onChange={onNameChange}
        value={filterOptions.name}
        sx={{ zIndex: 0 }}
      />
      <FormControl>
        <InputLabel>Find by assignee</InputLabel>
        <Select
          label="Find by assignee"
          sx={{ width: '12rem' }}
          value={filterOptions.assignee?.name ?? ''}
          onChange={onAssigneeChange}
        >
          {filterOptions.assignee && (
            <CustomMenuItem onClick={() => onUnselect()}>
              <b>Unselect</b>
            </CustomMenuItem>
          )}
          {numOptions < assignees.length && (
            <CustomMenuItem
              value={filterOptions.assignee?.name}
              onClick={handleLoadMore}
            >
              <b>Load more</b>
            </CustomMenuItem>
          )}
          {numOptions > 3 && (
            <CustomMenuItem
              value={filterOptions.assignee?.name}
              onClick={handleLoadLess}
            >
              <b>Load less</b>
            </CustomMenuItem>
          )}
          {assignees.slice(0, numOptions).map((assignee: User) => (
            <CustomMenuItem key={assignee.id} value={assignee.name}>
              <>{assignee.name}</>
            </CustomMenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Find by project"
        onChange={onProjectNameChange}
        value={filterOptions.projectName}
      />
    </Box>
  )
}

export default FilterInputs
