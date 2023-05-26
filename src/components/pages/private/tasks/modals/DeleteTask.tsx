import {useAppDispatch, useAppSelector} from "redux/hooks";
import React from "react";
import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material";
import {ITask} from "../../../../../typescript/entities";
import {deleteTask} from "../../../../../redux/features/tasks/tasksThunks";
import {selectTasks} from "../../../../../redux/selectors/tasks";
import {ButtonLoader} from "../../../../common/ButtonLoader";
import {DELETE_TASK} from "../../../../../redux/variables";

interface IProps {
  onClose: () => void,
  task: ITask | null,
}

export const DeleteTask = ({onClose, task}: IProps) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const tasks = useAppSelector(selectTasks)

  const onDelete = async () => {
    await dispatch(deleteTask(task!.id))

    onClose()
  }

  return (
    <Box
      sx={theme => ({
        width: upMd ? '310px' : undefined,
        maxWidth: '100%',
        '& > *': {
          width: '100%',
        }
      })}
    >
      <Typography variant="h3" sx={{
        fontSize: '24px',
        lineHeight: '24px',
        marginBottom: '24px',
      }}>Are you sure?</Typography>

      <Typography sx={theme => ({
        fontSize: '14px',
        lineHeight: '20px',
        color: theme.palette.custom.grey['2'],
      })}>Task will be permanently deleted</Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 4,
        '& > *:not(:last-child)': {
          mr: 2,
        },
      }}>
        <Button
          onClick={onClose}
          variant="text"
        >Cancel</Button>

        <Button
          onClick={onDelete}
          variant="contained"
          color="error"
          disabled={tasks.loading.includes(DELETE_TASK)}
        >
          Delete
          {
            tasks.loading.includes(DELETE_TASK) &&
              <ButtonLoader/>
          }
        </Button>
      </Box>
    </Box>
  )
}