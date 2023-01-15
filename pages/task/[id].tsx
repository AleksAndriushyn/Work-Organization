import { Box, InputLabel } from '@mui/material'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { getTaskById } from '../../lib/tasks'
import { Task } from '../../types/types'

export async function getServerSideProps({ params }: any) {
  return await getTaskById(params?.id)
}

const Task = ({ task }: { task: Task }) => {
  return (
    <>
      <Head>
        <title>Task: {task.name}</title>
      </Head>
      <Layout>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid black',
              padding: '10px',
              justifyContent: 'center',
            }}
          >
            <InputLabel>Name: {task?.name}</InputLabel>
            <InputLabel>Type: {task?.type}</InputLabel>
            <InputLabel>Description: {task?.description}</InputLabel>
          </Box>
        </Box>
      </Layout>
    </>
  )
}

export default Task
