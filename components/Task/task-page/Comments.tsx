import { useUser } from '@auth0/nextjs-auth0/client'
import ClearIcon from '@mui/icons-material/Clear'
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputLabel,
  Tooltip,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { saveData } from '../../../lib/api'
import {
  ActiveComment,
  Comment,
  Project,
  Task,
  User,
} from '../../../types/types'
import { CustomTextField } from '../../custom-components/CustomTextField'

export const Comments = ({
  comments,
  project,
  setProject,
  activeTask,
  setActiveTask,
  tasks,
  setTasks,
}: {
  comments: Comment[]
  project?: Project
  setProject?: Function
  activeTask: Task | null
  setActiveTask: Function
  tasks?: Task[]
  setTasks?: Function
}) => {
  const [newComment, setNewComment] = useState<string>('')
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null)
  const { user } = useUser()

  const updateComments = (newComments: Comment[]) => {
    if (!activeTask) {
      return
    }
    if (tasks) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === activeTask.id) {
          return { ...task, comments: newComments }
        }
        return task
      })

      setTasks?.(updatedTasks)
    }

    if (project) {
      setProject?.({
        ...project,
        tasks: project.tasks?.map((task) => {
          if (task.id === activeTask.id) {
            return { ...task, comments: newComments }
          }
          return task
        }),
      })
    }
  }

  const handleUpdateComment = (index: number, comment: string) => {
    const updatedComments = [...comments]
    updatedComments[index].message = comment
    const updatedActiveTask = {
      ...activeTask,
      comments: updatedComments,
    }
    setActiveTask(updatedActiveTask)
  }

  const saveComment = async (commentText: Comment | string) => {
    const comment = typeof commentText === 'string' ? null : commentText

    if (comment?.id) {
      if (activeComment?.message !== comment.message) {
        await saveData(comment, 'comment/createComment')
        updateComments(activeTask?.comments as Comment[])
      }
    } else if (activeTask && commentText) {
      const author = {
        name: user?.name,
        image: user?.picture,
        email: user?.email,
      }
      const data = {
        message: commentText,
        author,
        taskId: activeTask.id,
      }

      const savedComment = await saveData(data, 'comment/createComment')
      savedComment.author = JSON.parse(savedComment.author)

      const updatedComments = [savedComment, ...comments]

      setActiveTask({ ...activeTask, comments: updatedComments })
      updateComments(updatedComments)
      setNewComment('')
    }
    setActiveComment(null)
  }

  const deleteComment = async (commentId: string) => {
    let updatedComments = [...comments]
    updatedComments = updatedComments?.filter((el) => el.id !== commentId)
    setActiveTask({
      ...activeTask,
      comments: updatedComments,
    })
    updateComments(updatedComments)
    await fetch('/api/comment/deleteComment', {
      method: 'DELETE',
      body: JSON.stringify(commentId),
    })
  }

  return (
    <>
      <InputLabel>
        <b>Comments:</b>
      </InputLabel>
      <CustomTextField
        isEditing={activeComment?.index === comments.length}
        setIsEditing={() =>
          setActiveComment({
            index: comments.length,
            message: '',
          })
        }
        placeholder={'Add a comment...'}
        onChange={(
          event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => setNewComment(event.target.value)}
        value={newComment}
      />
      {activeComment?.index === comments.length && (
        <ButtonGroup
          style={{
            marginTop: '0.5rem',
          }}
        >
          <Button variant="contained" onClick={() => saveComment(newComment)}>
            Save
          </Button>
          <Button
            onClick={() => {
              setActiveComment(null)
              setNewComment('')
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      )}
      <Box
        style={{
          marginTop: '1rem',
        }}
      >
        {comments.map((comm: Comment, index: number) => {
          const author = comm.author as User
          const isDisabled = user?.email !== author.email
          return (
            <Box
              key={comm.id}
              style={{
                display: 'flex',
                gap: '1rem',
                width: '100%',
              }}
            >
              <Avatar src={author.image} />
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}
                >
                  <Typography>
                    <b>{author.name ?? 'Not registered'}</b>
                  </Typography>
                  {!isDisabled && (
                    <Tooltip title="Delete" placement="right">
                      <IconButton
                        color="error"
                        onClick={() => deleteComment(comm.id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                <CustomTextField
                  disabled={isDisabled}
                  isEditing={activeComment?.index === index}
                  setIsEditing={() =>
                    !isDisabled &&
                    !activeComment &&
                    setActiveComment({
                      message: comm.message,
                      index,
                    })
                  }
                  onChange={(
                    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => handleUpdateComment(index, event.target.value)}
                  value={comm?.message}
                />
                <ButtonGroup
                  style={{
                    marginTop: '0.5rem',
                  }}
                >
                  {activeComment?.index === index && (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => saveComment(comm)}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          comm.message = activeComment?.message
                          setActiveComment(null)
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {/* : ( !isDisabled && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteComment(comm.id)}
                >
                  Delete
                </Button>
                ) ) */}
                </ButtonGroup>
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}
