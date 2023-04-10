import { useUser } from '@auth0/nextjs-auth0/client'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Content from '../../components/Task/task-page/Content'
import TemplateOptionsPopper from '../../components/TemplateOptionsPopper'
import TaskForm from '../../components/forms/TaskForm'
import CustomModal from '../../components/modal/CustomModal'
import TemplateModal from '../../components/modal/TemplateModal'
import { saveData } from '../../lib/api'
import { getProjectById } from '../../lib/projects'
import { getTemplates } from '../../lib/templates'
import { IParams, Project, Task, Template, User } from '../../types/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams
  const templatesData = await getTemplates()
  const project = await getProjectById(id)
  return {
    props: {
      project,
      templatesData,
    },
  }
}

const Project = ({
  project,
  templatesData,
}: {
  project: Project
  templatesData: Template[]
}) => {
  const [proj, setProject] = useState<Project>(project)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [task, setTask] = useState<Task | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(
    proj.tasks ? proj.tasks[0] : null
  )
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0)
  const { user } = useUser()
  const [isError, setIsError] = useState(false)
  const [isMultiple, setIsMultiple] = useState(false)
  const [tasksCount, setTasksCount] = useState(2)
  const [isSavingTemplate, setIsSavingTemplate] = useState(false)
  const [isSelectTemplateOpen, setIsSelectTemplateOpen] = useState(false)
  const [templates, setTemplates] = useState<Template[]>(templatesData)
  const [template, setTemplate] = useState<Template | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState<Template | null>(null)
  const optionsOpen = Boolean(anchorEl)

  const setTaskProperties = (task: Task): Task => ({
    ...task,
    type: JSON.parse(task.type as string),
    assignee: JSON.parse(task.assignee as string),
    reporter: JSON.parse(task.reporter as string),
    status: JSON.parse(task.status as string),
  })

  const createTask = async (): Promise<Task> => {
    const data = task ?? activeTask
    const reporter = {
      name: user?.name,
      image: user?.picture,
      email: user?.email,
    }
    if (data) {
      data.projectId = proj.id
      data.reporter = reporter as User
    }

    const res = await saveData(data, 'task/createTask')
    return setTaskProperties(res)
  }

  const updateProjectTasks = (newTask: Task): Project => {
    const tasks = proj.tasks ? [...proj.tasks] : []
    const index = tasks?.findIndex((task) => task.id === newTask.id) as number
    if (index >= 0) {
      tasks[index] = newTask
    } else {
      tasks.push(newTask)
    }
    return {
      ...proj,
      tasks,
    }
  }

  const setTemplateProperties = (template: Template): Template => ({
    ...template,
    type: JSON.parse(template.type as string),
    assignee: JSON.parse(template.assignee as string),
  })

  const onSubmit = async () => {
    if (!user) {
      setIsError(true)
      return false
    }

    setIsOpen(false)
    let res: Task | null = null

    if (isSavingTemplate) {
      if (newTemplate) {
        let templData = null
        if (newTemplate.id) {
          const {id, ...other} = newTemplate
          console.log(id)
          templData = {...other}
        }
        const savedTemplate = await saveData(
          templData,
          'template/createTemplate'
        )
        setTemplates((prevTemplates) => [
          ...prevTemplates,
          setTemplateProperties(savedTemplate),
        ])
      }
      if (!newTemplate) {
        setNewTemplate((prevState: any) => ({
          ...prevState,
          ...activeTask,
        }))
        return
      }
    }

    if (isMultiple) {
      const newTasks = []

      for (let i = 0; i < tasksCount; i++) {
        res = await createTask()
        newTasks.push(res)
      }

      const updatedTasks = proj?.tasks?.concat(newTasks)
      setProject({
        ...proj,
        tasks: updatedTasks,
      })
      setActiveTaskIndex(
        updatedTasks?.findIndex((el) => el.id === res?.id) as number
      )
      setTasksCount(0)
      setIsMultiple(false)
    } else {
      res = await createTask()
      const updatedProject = updateProjectTasks(res)
      setProject(updatedProject)
      setActiveTaskIndex(
        updatedProject?.tasks?.findIndex((el) => el.id === res?.id) as number
      )
    }
    setActiveTask(res)
    setTask(null)
    setIsSelectTemplateOpen(false)
    setIsSavingTemplate(false)
    setNewTemplate(null)
    setIsTemplateModalOpen(false)
    setAnchorEl(null)
  }

  useEffect(() => {
    ;(async () => {
      const fetchedProject = await getProjectById(project.id)
      setProject(fetchedProject)
      if (fetchedProject.tasks) setActiveTask(fetchedProject.tasks[0])
    })()
  }, [project.id])

  useEffect(() => {
    if (project.tasks) setActiveTask(project.tasks[0])
  }, [project.tasks])

  return (
    <>
      <Head>
        <title>Project: {proj.name}</title>
      </Head>
      <Layout>
        <Content
          setProject={setProject}
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
        openTemplateModal={() => {
          setIsTemplateModalOpen(true)
          setAnchorEl(null)
        }}
        saveTemplate={isSavingTemplate}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        content={
          <TaskForm
            project={proj}
            onSubmit={onSubmit}
            task={task}
            isMultiple={isMultiple}
            setTask={setTask}
            toggleMultiple={() => setIsMultiple(!isMultiple)}
            tasksCount={tasksCount}
            setTasksCount={setTasksCount}
            saveTemplate={isSavingTemplate}
            setSaveTemplate={setIsSavingTemplate}
          />
        }
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
          setTask(null)
          setTasksCount(2)
          setIsMultiple(false)
          setIsSavingTemplate(false)
          setAnchorEl(null)
          setTemplate(null)
          setIsSelectTemplateOpen(false)
          setNewTemplate(null)
        }}
        isError={isError}
        form="task-form"
      />
      <TemplateOptionsPopper
        template={template}
        setTemplate={setTemplate}
        templates={templates}
        open={optionsOpen}
        anchorEl={anchorEl}
        task={task}
        setTask={setTask}
        isOpen={isSelectTemplateOpen}
        setIsOpen={setIsSelectTemplateOpen}
      />
      <TemplateModal
        onClose={() => {
          setIsTemplateModalOpen(false)
          setNewTemplate(null)
        }}
        onSubmit={onSubmit}
        template={newTemplate}
        setTemplate={setNewTemplate}
        open={isTemplateModalOpen}
      />
    </>
  )
}

export default Project
