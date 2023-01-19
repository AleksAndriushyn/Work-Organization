import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import CreateButton from '../components/CreateButton'
import Layout from '../components/Layout'
import ProjectDialog from '../components/Project/ProjectDialog'
import ProjectTable from '../components/Project/ProjectTable'
import { server } from '../config'
import { saveData } from '../lib/api'
// import { getProjects } from '../lib/projects'
import { Styles, TableStyle } from '../styled-components/global.styled'
import { Project } from '../types/types'

export const getServerSideProps: GetServerSideProps = async () => {
  const projectsData = await fetch(`${server}/api/project/getProjects`, {
    method: 'GET',
  }).then(async (res) => await res.json())
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

  const handleClickOpen = (data: boolean) => {
    setIsOpened(data)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const res = await saveData(activeProject ?? data, 'project/createProject')
    res.type = JSON.parse(res.type)

    setIsOpened(false)
    setActiveProject(null)
    if (activeProject?.id)
      setProjects(
        projects.map((el: Project) => {
          if (el.id === activeProject?.id) {
            el = activeProject
            return el
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
        <Styles>
          <CreateButton
            text={'Create project'}
            handleClickOpen={handleClickOpen}
          />
          {isOpened && (
            <ProjectDialog
              open={isOpened}
              project={activeProject}
              setTask={setActiveProject}
              onClose={() => {
                handleClickOpen(false)
                setActiveProject(null)
              }}
              onSubmit={onSubmit}
            />
          )}
          <TableStyle>
            <ProjectTable
              setProject={setActiveProject}
              setOpened={() => handleClickOpen(true)}
              projects={projects}
              setProjects={setProjects}
            />
          </TableStyle>
        </Styles>
      </Layout>
    </>
  )
}

export default Projects

