import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import CreateButton from '../components/CreateButton'
import Layout from '../components/Layout'
import TaskDialog from '../components/Task/TaskDialog'
import TaskTable from '../components/Task/TaskTable'
import { saveData } from '../lib/api'
import { getTasks } from '../lib/tasks'
import { Styles, TableStyle } from '../styled-components/global.styled'
import { Task } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  const tasksData = await getTasks()
  return {
    props: {
      tasksData,
    },
  }
}

const Tasks = ({ tasksData }: { tasksData: Task[] }) => {
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
        <title>Tasks Page</title>
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

export default Tasks
