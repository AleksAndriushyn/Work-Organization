import Head from 'next/head'
import { useState } from 'react'
import CreateButton from '../components/CreateButton'
import Layout from '../components/Layout'
import {
  Styles,
  TableStyle,
} from '../components/styled-components/global.styled'
import TaskDialog from '../components/Task/TaskDialog'
import TaskTable from '../components/Task/TaskTable'
import { saveData } from '../lib/api'
import { getProjects } from '../lib/projects'
import { getTasks } from '../lib/tasks'
import { Project, Task } from '../types/types'

export async function getStaticProps() {
  const tasksData = await getTasks()
  const projects = await getProjects()
  return {
    props: {
      tasksData,
      projects,
    },
  }
}

const Projects = ({
  tasksData,
  projects,
}: {
  tasksData: Task[]
  projects: Project[]
}) => {
  const [tasks, setTasks] = useState<Task[]>(tasksData)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const handleClickOpen = (data: boolean) => {
    setIsOpened(data)
  }

  const onSubmit = async (data: Task) => {
    const res = await saveData(activeTask ?? data, 'task/createTask')

    handleClickOpen(false)
    setActiveTask(null)
    if (activeTask?.id)
      setTasks(
        tasks.map((el: Task) => {
          if (el.id === activeTask?.id) {
            el = activeTask
            return el
          }
          return el
        })
      )
    else setTasks([...tasks, res])
  }

  return (
    <>
      <Head>
        <title>Projects Page</title>
      </Head>
      <Layout>
        <Styles>
          <CreateButton
            text={'Create task'}
            handleClickOpen={handleClickOpen}
          />
          {isOpened && (
            <TaskDialog
              open={isOpened}
              task={activeTask}
              setTask={setActiveTask}
              projects={projects}
              onClose={() => {
                handleClickOpen(false)
                setActiveTask(null)
              }}
              onSubmit={onSubmit}
              project={null}
            />
          )}
          <TableStyle>
            <TaskTable
              setTask={setActiveTask}
              setOpened={() => handleClickOpen(true)}
              tasks={tasks}
              setTasks={setTasks}
            />
          </TableStyle>
        </Styles>
      </Layout>
    </>
  )
}

export default Projects
