import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import CustomList from '../components/CustomList'
import Layout from '../components/Layout'
import ListContent from '../components/ListContent'
import { saveData } from '../lib/api'
import { getProjectById, getProjects } from '../lib/projects'
import styles from '../styles/home/Home.module.scss'
import { Project, Status, Task } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  const projectsData = await getProjects()
  return {
    props: {
      projectsData,
    },
  }
}

const setStatus = (droppableId: string) => {
  switch (droppableId) {
    case 'In Progress':
      return { label: droppableId, value: 'in-progress' }
    case 'To Do':
      return { label: droppableId, value: 'to-do' }
    case 'Done':
      return { label: droppableId, value: 'done' }
  }
}

const Home = ({ projectsData }: { projectsData: Project[] }) => {
  console.log(projectsData)
  const [project, setProject] = useState<Project>(projectsData[0])
  const [tasks, setTasks] = useState<Task[]>(project?.tasks as Task[])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination, draggableId } = result

    if (source.droppableId !== destination.droppableId) {
      setTasks(
        tasks.map((task) => {
          if (task.id === draggableId) {
            task.status = setStatus(destination.droppableId) as Status
            saveData(task, 'task/createTask')
            return task
          }
          return task
        })
      )
    } else {
      const filteredTasks = tasks.filter(
        (task) => (task.status as Status).label === source.droppableId
      )
      const res = filteredTasks.find((task) => task.id === draggableId) as Task
      filteredTasks.splice(source.index, 1)
      filteredTasks.splice(destination.index, 0, res)
      setTasks(
        tasks
          .filter(
            (task) => (task.status as Status).label !== source.droppableId
          )
          .concat(filteredTasks)
      )
    }
  }

  useEffect(() => {
    ;(async () => {
      setTasks(
        (await getProjectById(project?.id as string).then(
          ({ props: { project } }) => project?.tasks
        )) as Task[]
      )
    })()
  }, [project?.id])

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Layout>
        <DragDropContext onDragEnd={onDragEnd}>
          <main className={styles.main}>
            <section className={styles.project_select_block}>
              <FormControl fullWidth>
                <InputLabel style={{ zIndex: 0 }}>{!project ? 'Create a project' : 'Select project'}</InputLabel>
                <Select
                  className={styles.project_select}
                  value={project?.name ?? ''}
                  label="Select project"
                  disabled={!project}
                  onChange={(e) => {
                    setProject(
                      projectsData.find(
                        (el: Project) => el.name === e.target.value
                      ) as Project
                    )
                  }}
                >
                  {projectsData.map((project: Project) => (
                    <MenuItem key={project?.id} value={project?.name}>
                      {project?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </section>
            <section className={styles.board}>
              <CustomList label={'To Do'}>
                {tasks
                  ?.filter((task) => (task.status as Status)?.value === 'to-do')
                  .map((task: Task, index: number) => (
                    <ListContent index={index} task={task} key={task.id} />
                  ))}
              </CustomList>
              <CustomList label={'In Progress'}>
                {tasks
                  ?.filter(
                    (task) => (task.status as Status)?.value === 'in-progress'
                  )
                  .map((task: Task, index: number) => (
                    <ListContent task={task} key={task.id} index={index} />
                  ))}
              </CustomList>
              <CustomList label={'Done'}>
                {tasks
                  ?.filter((task) => (task.status as Status)?.value === 'done')
                  .map((task: Task, index: number) => (
                    <ListContent task={task} index={index} key={task.id} />
                  ))}
              </CustomList>
            </section>
          </main>
        </DragDropContext>
      </Layout>
    </>
  )
}

export default Home





