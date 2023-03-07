import { Box } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import CreateButton from '../components/CreateButton'
import ProjectForm from '../components/forms/ProjectForm'
import Layout from '../components/Layout'
import CustomModal from '../components/modal/CustomModal'
import ProjectTable from '../components/Project/ProjectTable'
import { saveData } from '../lib/api'
import { getProjects } from '../lib/projects'
import styles from '../styles/page-style.module.scss'
import { Project } from '../types/types'

export const getServerSideProps: GetServerSideProps = async () => {
  const projectsData = await getProjects()
  return {
    props: {
      projectsData,
    },
  }
}

const Projects = ({ projectsData }: { projectsData: Project[] }) => {
  const [projects, setProjects] = useState<Project[]>(projectsData)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const { data: session } = useSession()
  const [isError, setIsError] = useState(false)
  const handleClickOpen = (data: boolean) => {
    setIsOpened(data)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    if (!session) {
      setIsError(true)
      return false
    }
    const res = await saveData(activeProject ?? data, 'project/createProject')
    res.type = JSON.parse(res.type)

    setIsOpened(false)
    setActiveProject(null)
    if (activeProject?.id)
      setProjects(
        projects.map((el: Project) => {
          if (el.id === activeProject?.id) {
            return (el = activeProject)
          }
          return el
        })
      )
    else setProjects([...projects, res])
  }

  return (
    <>
      <Head>
        <title>Projects Page</title>
      </Head>
      <Layout>
        <Box className={styles.page_container}>
          <CreateButton
            text='Create project'
            handleClickOpen={handleClickOpen}
          />
          {isOpened && (
            <CustomModal
              open={isOpened}
              content={
                <ProjectForm
                  onSubmit={onSubmit}
                  project={activeProject}
                  setProject={setActiveProject}
                />
              }
              onClose={() => {
                handleClickOpen(false)
                setActiveProject(null)
              }}
              isError={isError}
              form='project-form'
            />
          )}

          <ProjectTable
            setProject={setActiveProject}
            setOpened={() => handleClickOpen(true)}
            projects={projects}
            setProjects={setProjects}
          />
        </Box>
      </Layout>
    </>
  )
}

export default Projects

