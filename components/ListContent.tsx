import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import Router from 'next/router'
import { Draggable } from 'react-beautiful-dnd'
import styles from '../styles/home/ListContent.module.scss'
import { Status, Task, Type, User } from '../types/types'
import { showProgress } from './CustomLinearProgress'
import showIcon from './showIcon'

const ListContent = ({ task, index }: { task: Task; index: number }) => {
  const type = task.type as Type
  const status = task.status as Status
  const assignee = task.assignee as User

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          id={task.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Accordion
            className={
              snapshot.isDragging ? styles.accordionDragged : styles.accordion
            }
          >
            <AccordionSummary>
              <Box className={styles.summary_block}>
                <Box className={styles.task_name_block}>
                  {showIcon(type.label)}
                  <Tooltip title={task.name}>
                    <ListItemText>
                      <Typography className={styles.task_name}>
                        {task.name}
                      </Typography>
                    </ListItemText>
                  </Tooltip>
                </Box>
                <Box className={styles.info_block}>
                  {showProgress(status as Status)}
                  <Tooltip title={assignee?.name}>
                    <Avatar
                      src={assignee?.image ?? ''}
                      alt={assignee?.name ?? ''}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails className={styles.details_block}>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Typography>
                    <b>Status:</b>
                  </Typography>
                  <Box
                    style={{
                      backgroundColor:
                        status.value === 'in-progress'
                          ? '#1976d2'
                          : status.value === 'done'
                          ? '#2e7d32'
                          : '#dfe1e6',
                      borderRadius: '5px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '2rem',
                      width: status.value === 'in-progress' ? '7em' : '4em',
                    }}
                  >
                    <Typography
                      style={{
                        color: status.value === 'to-do' ? 'black' : 'white',
                      }}
                    >
                      {status.label}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Box>
                    <Typography>
                      <b>Assignee:</b>
                    </Typography>
                  </Box>
                  <Tooltip title={assignee?.name}>
                    <Typography
                      style={{
                        width: '6rem',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {assignee?.name}
                    </Typography>
                  </Tooltip>
                  <Avatar
                    src={assignee?.image ?? ''}
                    alt={assignee?.name ?? ''}
                  />
                </Box>
              </Box>
              <Box style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() =>
                    Router.push('/project/[id]', `/project/${task.projectId}`)
                  }
                >
                  View
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </ListItem>
      )}
    </Draggable>
  )
}

export default ListContent
