import AddIcon from '@mui/icons-material/Add'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  Box,
  Button,
  Drawer,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import Head from 'next/head'
import { useState } from 'react'
import CreateButton from '../../components/CreateButton'
import Layout from '../../components/Layout'
import { Styles } from '../../components/styled-components/global.styled'
import TaskDialog from '../../components/Task/TaskDialog'
import { saveData } from '../../lib/api'
import { getProjectById } from '../../lib/projects'
import { Project, Task } from '../../types/types'

export async function getServerSideProps({ params }: any) {
  return await getProjectById(params?.id)
}

const Project = ({
  project,
  projects,
}: {
  project: Project
  projects: Project[]
}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [task, setTask] = useState<Task | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(
    project?.tasks ? project?.tasks[0] : null
  )

  const onSubmit = async () => {
    if (task) task.projectId = project.id
    const res = await saveData(task, 'task/createTask')
    setIsOpen(false)
    project?.tasks?.push(res)
    setTask(null)
    setActiveTask(res)
  }

  return (
    <>
      <Head>
        <title>Project: {project.name}</title>
      </Head>
      <Layout>
        <Button
          style={{ marginTop: '10px' }}
          startIcon={<ChevronRightIcon />}
          onClick={() => setDrawerOpen(true)}
        />
        <Styles>
          <Drawer
            anchor={'left'}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <List>
              <ListSubheader>Project: {project.name}</ListSubheader>
              {project.tasks?.map((task: Task) => (
                <ListItem key={task.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setActiveTask(task)
                    }}
                  >
                    <ListItemText primary={task.name} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setIsOpen(true)}
                  variant="contained"
                />
              </ListItem>
            </List>
          </Drawer>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {project?.tasks?.length ? (
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  border: '1px solid black',
                  padding: '10px',
                }}
              >
                <InputLabel>Name: {activeTask?.name}</InputLabel>
                <InputLabel>Type: {activeTask?.type}</InputLabel>
                <InputLabel>Description: {activeTask?.description}</InputLabel>
              </Box>
            ) : (
              <>
                <InputLabel>No tasks available</InputLabel>
                <CreateButton
                  text={'Create task'}
                  handleClickOpen={setIsOpen}
                />
              </>
            )}
          </Box>
        </Styles>
      </Layout>
      <TaskDialog
        project={project}
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
          setTask(null)
        }}
        onSubmit={onSubmit}
        task={task}
        setTask={setTask}
        projects={projects}
      />
    </>
  )
}

export default Project
