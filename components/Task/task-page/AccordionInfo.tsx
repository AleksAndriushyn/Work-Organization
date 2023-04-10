import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { Task, User } from '../../../types/types'
import { showProgress } from '../../custom-components/CustomLinearProgress'
import RenderUser from '../../custom-components/CustomUser'

export const AccordionInfo = (props: any) => {
  return (
    <Accordion
      expanded={props.expanded}
      onChange={() => props.setExpanded(!props.expanded)}
      style={{
        height: props.expanded ? '100%' : '50px',
        width: '25rem',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          sx={{
            width: '25%',
          }}
        >
          Details
        </Typography>
        {!props.expanded && (
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            {props.join}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {props.expanded && (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2em',
            }}
          >
            <Button
              style={{
                backgroundColor:
                  props.activeStatus.value === 'in-progress'
                    ? '#1976d2'
                    : props.activeStatus.value === 'done'
                    ? '#2e7d32'
                    : '#dfe1e6',
                color: props.activeStatus.value === 'to-do' ? 'black' : 'white',
                borderRadius: '5px',
                width:
                  props.activeStatus.value === 'in-progress' ? '11em' : '7em',
              }}
              endIcon={<ExpandMoreIcon />}
              onClick={props.handleClick}
            >
              {props.activeStatus.label}
            </Button>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2em',
              }}
            >
              <InputLabel>
                <b>Progress:</b>
              </InputLabel>
              {showProgress(props.activeStatus)}
            </Box>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2em',
              }}
            >
              <InputLabel>
                <b>Assignee:</b>
              </InputLabel>
              {props.isAssigneeEditing ? (
                <FormControl
                  onKeyDown={props.onKeyDownAssignee}
                  style={{
                    width: '14rem',
                    height: '50px',
                  }}
                >
                  <Select
                    style={{
                      height: '50px',
                    }}
                    value={props.assignee.name ?? ''}
                    renderValue={(value: string) => (
                      <RenderUser name={value} image={props.assignee.image} />
                    )}
                    onChange={(event: SelectChangeEvent<string>) => {
                      props.setActiveTask((prevState: Task) => ({
                        ...prevState,
                        assignee: props.users.find(
                          (user: User) => user.name === event.target.value
                        ),
                      }))
                    }}
                  >
                    {props.users.map((user: User) => (
                      <MenuItem key={user.id} value={user.name}>
                        <RenderUser name={user.name} image={user.image} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <InputLabel
                  onClick={() =>
                    props.setIsEditing((prevState: any) => ({
                      ...prevState,
                      isAssigneeEditing: true,
                    }))
                  }
                >
                  <RenderUser
                    name={props.assignee.name}
                    image={props.assignee.image}
                  />
                </InputLabel>
              )}
            </Box>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2em',
              }}
            >
              <InputLabel>
                <b>Reporter:</b>
              </InputLabel>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <InputLabel>
                  <RenderUser
                    name={props.reporter.name}
                    image={props.reporter.image}
                  />
                </InputLabel>
                <InputLabel>{props.reporter.email}</InputLabel>
              </Box>
            </Box>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
