import Head from 'next/head'
import { PrismaClient } from '@prisma/client'
import { useState } from 'react'
import ProjectForm from '../../components/forms/ProjectForm'
import styled from 'styled-components'
import ProjectTable from '../../components/ProjectTable'
import { Button } from '@mui/material'
import ProjectDialog from '../../components/ProjectDialog'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-align: center;
      :last-child {
        border-right: 0;
      }
    }
  }
`

export async function getStaticProps(): Promise<any> {
  const prisma = new PrismaClient()
  const projectsData = await prisma.project.findMany()
  return { props: { projectsData } }
}

export type Project = {
  id: string
  name: string
}

const saveData = async (formData: Project) => {
  const resp = await fetch('/api/createProject', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
  return await resp.json()
}

const Companies = ({ projectsData }: { projectsData: Project[] }) => {
  const [projects, setProjects] = useState<Project[]>(projectsData)
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const handleClickOpen = (data: boolean) => {
    setIsOpened(data)
  }

  console.log('projects', projects)

  const onSubmit = async (data: Project) => {
    const res = await saveData(data)
    setProjects([...projects, res])
    setIsOpened(false)
  }

  return (
    <>
      <Head>
        <title>Projects Page</title>
      </Head>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          marginTop: '40px',
        }}
      >
        <Button onClick={() => handleClickOpen(true)}>Create project</Button>
        {isOpened && (
          <ProjectDialog
            open={isOpened}
            onClose={() => handleClickOpen(false)}
            onSubmit={onSubmit}
          />
        )}
        <Styles>
          <ProjectTable projects={projects} setProjects={setProjects} />
        </Styles>
      </div>
    </>
  )
}

export default Companies

