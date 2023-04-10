import {
  Avatar,
  Box,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import styles from '../../styles/home/ListContent.module.scss'
import { Status, Task, Type, User } from '../../types/types'
import TaskIcon from '../Task/TaskIcon'
import { showProgress } from '../custom-components/CustomLinearProgress'

const ListContent = ({
  task,
  index,
  setActiveTask,
  setIsModalOpen,
}: {
  task: Task
  index: number
  setActiveTask: Function
  setIsModalOpen: Function
}) => {
  const type = task.type as Type
  const status = task.status as Status
  const assignee = task.assignee as User

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <ListItem
            id={task.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              onClick={() => {
                setIsModalOpen(true)
                setActiveTask(task)
              }}
              className={snapshot.isDragging ? styles.cardDragged : styles.card}
            >
              <CardContent>
                <Box className={styles.content_block}>
                  <Box className={styles.task_name_block}>
                    <TaskIcon type={type.label} />
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
                    <Box className={styles.assignee_block}>
                      <Tooltip title={assignee?.name}>
                        <Typography className={styles.assignee_name}>
                          {assignee?.name}
                        </Typography>
                      </Tooltip>
                      <Avatar
                        src={assignee?.image ?? ''}
                        alt={assignee?.name ?? ''}
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        )}
      </Draggable>
    </>
  )
}

export default ListContent
