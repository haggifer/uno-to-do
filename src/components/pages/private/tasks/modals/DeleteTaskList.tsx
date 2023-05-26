import {useAppDispatch, useAppSelector} from "redux/hooks";
import React from "react";
import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material";
import {ITaskList} from "../../../../../typescript/entities";
import {deleteTaskList} from "../../../../../redux/features/tasks/tasksThunks";
import {selectTasks} from "../../../../../redux/selectors/tasks";
import {ButtonLoader} from "../../../../common/ButtonLoader";
import {DELETE_TASK_LIST} from "../../../../../redux/variables";

interface IProps {
  onClose: () => void,
  taskList: ITaskList | null,
}

export const DeleteTaskList = ({onClose, taskList}: IProps) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const tasks = useAppSelector(selectTasks)

  const onDelete = async () => {
    await dispatch(deleteTaskList(taskList!.id))

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
      })}>Task list will be permanently deleted</Typography>

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
          disabled={tasks.loading.includes(DELETE_TASK_LIST)}
        >
          Delete
          {
            tasks.loading.includes(DELETE_TASK_LIST) &&
              <ButtonLoader/>
          }
        </Button>
      </Box>
    </Box>
  )
}