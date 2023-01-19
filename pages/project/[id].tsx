import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Content from '../../components/Content'
import Layout from '../../components/Layout'
import TaskDialog from '../../components/Task/TaskDialog'
import { saveData } from '../../lib/api'
import { getProjectById } from '../../lib/projects'
import { IParams, Project, Task } from '../../types/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams
  return await getProjectById(id)
}

const Project = ({ project }: { project: Project }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [task, setTask] = useState<Task | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(
    project.tasks ? project.tasks[0] : null
  )

  const onSubmit = async () => {
    if (task) task.projectId = project.id
    const res = await saveData(task, 'task/createTask')
    setIsOpen(false)
    project.tasks?.push(res)
    setTask(null)
    setActiveTask(res)
  }

  return (
    <>
      <Head>
        <title>Project: {project.name}</title>
      </Head>
      <Layout>
        <Content
          activeTask={activeTask}
          setActiveTask={setActiveTask}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          project={project}
          setIsOpen={setIsOpen}
        />
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
      />
    </>
  )
}

export default Project
