import { useUser } from '@auth0/nextjs-auth0/client'
import { Box } from '@mui/material'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import FilterInputs from '../components/Task/FilterInputs'
import Layout from '../components/Layout'
import ProjectWarningAlert from '../components/ProjectWarningAlert'
import TaskTable from '../components/Task/TaskTable'
import TemplateOptionsPopper from '../components/TemplateOptionsPopper'
import TaskForm from '../components/forms/TaskForm'
import CustomModal from '../components/modal/CustomModal'
import TemplateModal from '../components/modal/TemplateModal'
import { saveData } from '../lib/api'
import { getProjects } from '../lib/projects'
import { getTasks } from '../lib/tasks'
import { getTemplates } from '../lib/templates'
import styles from '../styles/Page-style.module.scss'
import { Project, Task, Template, User } from '../types/types'
import CreateButton from '../components/custom-components/CreateButton'

export const getServerSideProps: GetServerSideProps = async () => {
  const tasksData = await getTasks()
  const projects = await getProjects()
  const templatesData = await getTemplates()
  return {
    props: {
      tasksData,
      projects,
      templatesData,
    },
  }
}

const Tasks = ({
  tasksData,
  projects,
  templatesData,
}: {
  tasksData: Task[]
  projects: Project[]
  templatesData: Template[]
}) => {
  const [tasks, setTasks] = useState<Task[]>(tasksData)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [isError, setIsError] = useState(false)
  const [hasProject, setHasProject] = useState(true)
  const [isMultiple, setIsMultiple] = useState(false)
  const [tasksCount, setTasksCount] = useState(2)
  const [isSavingTemplate, setIsSavingTemplate] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [templates, setTemplates] = useState<Template[]>(templatesData)
  const [template, setTemplate] = useState<Template | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isSelectTemplateOpen, setIsSelectTemplateOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState<Template | null>(null)
  const [filterOptions, setFilterOptions] = useState({
    name: '',
    assignee: null,
    projectName: '',
  })
  const optionsOpen = Boolean(anchorEl)
  const { user } = useUser()
  const assignees = tasks
    .map((task) => task.assignee as User)
    .filter(
      (assignee, index, arr) =>
        arr.findIndex((otherAssignee) => otherAssignee.id === assignee.id) ===
        index
    ) as User[]

  const handleClickOpen = (data: boolean) => {
    return !projects.length ? setHasProject(false) : setIsOpened(data)
  }

  const setTaskProperties = (task: Task): Task => ({
    ...task,
    type: JSON.parse(task.type as string),
    assignee: JSON.parse(task.assignee as string),
    reporter: JSON.parse(task.reporter as string),
    status: JSON.parse(task.status as string),
  })

  const setTemplateProperties = (template: Template): Template => ({
    ...template,
    type: JSON.parse(template.type as string),
    assignee: JSON.parse(template.assignee as string),
  })

  const updateTasksAfterCreate = (newTask: Task) => {
    const index = tasks.findIndex((task) => task.id === newTask.id)
    if (index >= 0) {
      const newTasks = tasks ? [...tasks] : []
      newTasks[index] = newTask
      setTasks(newTasks)
    } else {
      setTasks([...tasks, newTask])
    }
  }

  const createTask = async (): Promise<Task> => {
    const reporter = {
      name: user?.name,
      image: user?.picture,
      email: user?.email,
    }
    if (activeTask) activeTask.reporter = reporter
    const res = await saveData(activeTask, 'task/createTask')
    return setTaskProperties(res)
  }

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    if (!user) {
      setIsError(true)
      return false
    }

    let res: Task | null = null

    if (isSavingTemplate) {
      if (newTemplate) {
        const savedTemplate = await saveData(
          newTemplate,
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
        newTasks.push(res as Task)
      }

      setTasks([...tasks, ...newTasks])
      setTasksCount(2)
      setIsMultiple(false)
    } else {
      res = await createTask()
      updateTasksAfterCreate(res as Task)
      setIsEditing(false)
    }
    handleClickOpen(false)
    setActiveTask(null)
    setAnchorEl(null)
    setTemplate(null)
    setIsSelectTemplateOpen(false)
    setIsSavingTemplate(false)
    setNewTemplate(null)
    setIsTemplateModalOpen(false)
  }

  const closeModal = () => {
    handleClickOpen(false)
    setActiveTask(null)
    setTasksCount(2)
    setIsEditing(false)
    setIsMultiple(false)
    setIsSavingTemplate(false)
    setAnchorEl(null)
    setTemplate(null)
    setIsSelectTemplateOpen(false)
    setNewTemplate(null)
  }

  return (
    <>
      <Head>
        <title>Tasks Page</title>
      </Head>
      <Layout>
        <Box className={styles.page_container}>
          <CreateButton text="Create task" handleClickOpen={handleClickOpen} />
          <FilterInputs
            filterOptions={filterOptions}
            assignees={assignees}
            setFilterOptions={setFilterOptions}
          />
          <CustomModal
            open={isOpened}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            openTemplateModal={() => {
              setIsTemplateModalOpen(true)
              setAnchorEl(null)
            }}
            saveTemplate={isSavingTemplate}
            content={
              <TaskForm
                onSubmit={onSubmit}
                isMultiple={isMultiple}
                task={activeTask}
                setTask={setActiveTask}
                toggleMultiple={() => setIsMultiple(!isMultiple)}
                tasksCount={tasksCount}
                setTasksCount={setTasksCount}
                saveTemplate={isSavingTemplate}
                setSaveTemplate={setIsSavingTemplate}
                isEditing={isEditing}
              />
            }
            onClose={closeModal}
            isError={isError}
            form="task-form"
          />
          <TaskTable
            setTask={setActiveTask}
            setOpened={() => handleClickOpen(true)}
            tasks={tasks}
            setTasks={setTasks}
            projects={projects}
            setIsEditing={setIsEditing}
            filters={filterOptions}
          />
          {!hasProject && <ProjectWarningAlert />}
        </Box>
      </Layout>
      <TemplateOptionsPopper
        template={template}
        setTemplate={setTemplate}
        templates={templates}
        open={optionsOpen}
        anchorEl={anchorEl}
        task={activeTask}
        setTask={setActiveTask}
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

export default Tasks
