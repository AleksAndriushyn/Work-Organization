import { Box } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import CreateButton from '../components/CreateButton'
import TaskForm from '../components/forms/TaskForm'
import Layout from '../components/Layout'
import CustomModal from '../components/modal/CustomModal'
import ProjectWarningAlert from '../components/ProjectWarningAlert'
import TaskTable from '../components/Task/TaskTable'
import { saveData } from '../lib/api'
import { getProjects } from '../lib/projects'
import { getTasks } from '../lib/tasks'
import styles from '../styles/page-style.module.scss'
import { Project, Task, User } from '../types/types'

export const getServerSideProps: GetServerSideProps = async () => {
  const tasksData = await getTasks()
  const projectsData = await getProjects()
  return {
    props: {
      tasksData,
      projectsData,
    },
  }
}

const Tasks = ({
  tasksData,
  projectsData,
}: {
  tasksData: Task[]
  projectsData: Project[]
}) => {
  const [tasks, setTasks] = useState<Task[]>(tasksData)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [isError, setIsError] = useState(false)
  const [hasProject, setHasProject] = useState(true)

  const { data: session } = useSession()

  const handleClickOpen = (data: boolean) => {
    return !projectsData.length ? setHasProject(false) : setIsOpened(data)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    if (!session) {
      setIsError(true)
      return false
    }
    if (activeTask) activeTask.reporter = session?.user as User
    const res = await saveData(activeTask ?? data, 'task/createTask')
    res.type = JSON.parse(res.type)
    res.assignee = JSON.parse(res.assignee)
    res.reporter = JSON.parse(res.reporter)
    res.status = JSON.parse(res.status)
    handleClickOpen(false)
    setActiveTask(null)
    if (activeTask?.id)
      setTasks(
        tasks.map((el: Task) => {
          if (el.id === activeTask?.id) {
            return (el = activeTask)
          }
          return el
        })
      )
    else setTasks([...tasks, res])
  }

  return (
    <>
      <Head>
        <title>Tasks Page</title>
      </Head>
      <Layout>
        <Box className={styles.page_container}>
          <CreateButton
            text='Create task'
            handleClickOpen={handleClickOpen}
          />
          {isOpened && (
            <CustomModal
              open={isOpened}
              content={
                <TaskForm
                  onSubmit={onSubmit}
                  task={activeTask}
                  setTask={setActiveTask}
                />
              }
              onClose={() => {
                handleClickOpen(false)
                setActiveTask(null)
              }}
              isError={isError}
              form='task-form'
            />
          )}
          <TaskTable
            setTask={setActiveTask}
            setOpened={() => handleClickOpen(true)}
            tasks={tasks}
            setTasks={setTasks}
          />
          {!hasProject && <ProjectWarningAlert />}
        </Box>
      </Layout>
    </>
  )
}

export default Tasks
