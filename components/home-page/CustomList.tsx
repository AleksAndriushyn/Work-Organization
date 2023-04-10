import { List, ListSubheader } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import styles from '../../styles/home/CustomList.module.scss'

const CustomList = ({ label, children }: { label: string; children: any }) => {
  return (
    <Droppable droppableId={label}>
      {(provided, snapshot) => (
        <List
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={snapshot.isDraggingOver ? styles.dragged : styles.statuses}
        >
          <ListSubheader
            className={
              snapshot.isDraggingOver ? styles.header_dragged : styles.header
            }
          >
            {label}
          </ListSubheader>
          {children}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  )
}

export default CustomList
