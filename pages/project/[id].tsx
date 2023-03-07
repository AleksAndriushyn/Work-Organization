import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Content from '../../components/Content'
import TaskForm from '../../components/forms/TaskForm'
import Layout from '../../components/Layout'
import CustomModal from '../../components/modal/CustomModal'
import { saveData } from '../../lib/api'
import { getProjectById } from '../../lib/projects'
import { IParams, Project, Task, User } from '../../types/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams
  return await getProjectById(id)
}

const Project = ({ project }: { project: Project }) => {
  const [proj, setProject] = useState<Project>(project)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [task, setTask] = useState<Task | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(
    proj.tasks ? proj.tasks[0] : null
  )
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0)
  const { data: session } = useSession()
  const [isError, setIsError] = useState(false)

  const onSubmit = async () => {
    if (!session) {
      setIsError(true)
      return false
    }
    if (task) {
      task.projectId = proj.id
      task.reporter = session?.user as User
    }
    const res = await saveData(task ?? activeTask, 'task/createTask')
    setIsOpen(false)
    res.assignee = JSON.parse(res.assignee)
    res.status = JSON.parse(res.status)
    res.type = JSON.parse(res.type)
    res.reporter = JSON.parse(res.reporter)

    if (proj.tasks?.findIndex((t) => t.id === res.id) === -1)
      proj.tasks?.push(res)
    else
      setProject((prevState) => ({
        ...prevState,
        tasks: proj.tasks?.map((t) => {
          if (t.id === res.id) {
            return (t = res)
          }
          return t
        }),
      }))

    setTask(null)
    setActiveTask(res)
    setActiveTaskIndex(
      project?.tasks?.findIndex((el) => el.id === res.id) as number
    )
  }

  useEffect(() => {
    ;(async () => {
      setProject(
        (await getProjectById(project.id).then(
          ({ props: { project } }) => project
        )) as Project
      )
    })()
    if (project.tasks) setActiveTask(project.tasks[0])
  }, [project.id])

  return (
    <>
      <Head>
        <title>Project: {proj.name}</title>
      </Head>
      <Layout>
        <Content
          activeTask={activeTask}
          setActiveTask={setActiveTask}
          project={proj}
          setIsOpen={setIsOpen}
          onSubmit={onSubmit}
          activeTaskIndex={activeTaskIndex}
          setActiveTaskIndex={setActiveTaskIndex}
        />
      </Layout>
      <CustomModal
        content={
          <TaskForm
            project={proj}
            onSubmit={onSubmit}
            task={task}
            setTask={setTask}
          />
        }
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
          setTask(null)
        }}
        isError={isError}
        form='task-form'
      />
    </>
  )
}

export default Project
