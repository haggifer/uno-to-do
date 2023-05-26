import {IPartialTask, ITask} from "../../../../typescript/entities";
import {Box, Checkbox, Typography, useMediaQuery, useTheme} from "@mui/material";
import {MouseEventHandler, useMemo} from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {getVerbalDate, IVerbalDate} from "../../../../utils/helpers/dates";
import classNames from "classnames";
import {taskDetailsTransitionDuration} from "./TaskDetails";

interface IProps {
  task: ITask,
  updateTask: (updatedPartialTask: IPartialTask) => void,
  activeTask: ITask | null,
  setActiveTask: (newTask: ITask | null) => void,
}

export const TasksItem = ({task, updateTask, activeTask, setActiveTask}: IProps) => {
  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const verbalDate = useMemo<IVerbalDate | null>(() => {
    if (!task.due_date) {
      return null
    }

    const expDate = new Date(task.due_date)

    return getVerbalDate(expDate)
  }, [task.due_date])

  const onBoxClick: MouseEventHandler<HTMLDivElement> = (e) => {
    setActiveTask(task)
  }

  const onTaskCompletedClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    updateTask({
      id: task.id,
      completed: !task.completed,
    })

    e.stopPropagation()
  }

  const onTaskImportantClick: MouseEventHandler<HTMLDivElement> = (e) => {
    updateTask({
      id: task.id,
      important: !task.important,
    })

    e.stopPropagation()
  }

  return (
    <Box
      onClick={onBoxClick}
      className={classNames({active: task.id === activeTask?.id})}
      sx={theme => ({
        display: 'flex',
        alignItems: 'center',
        minHeight: '60px',
        mb: 1,
        mr: 2,
        borderRadius: '10px',
        py: 2,
        px: upMd ? 4 : 3,
        backgroundColor: theme.palette.custom.basicBg,
        cursor: 'pointer',
        transition: `${taskDetailsTransitionDuration}ms`,
        '&.active': {
          background: theme.palette.custom.tasksActiveItemBg,
        }
      })}
    >
      <Checkbox
        checked={task.completed}
        onClick={onTaskCompletedClick}
        sx={theme => ({
          p: upMd ? undefined : 0,
          color: theme.palette.custom.grey['400'],
        })}
      />

      <Box sx={{
        ml: upMd ? 5 : 2,
        mr: upMd ? 5 : 2,
      }}>
        <Typography variant="subtitle1" sx={{
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 500,
        }}>{task.title}</Typography>

        {
          (verbalDate || task.note) &&
            <Typography variant="subtitle2" sx={theme => ({
              mt: 1,
              fontSize: '14px',
              lineHeight: '20px',
              color: theme.palette.custom.grey['4'],
            })}>
                <Box component="span" sx={theme => ({
                  color: verbalDate?.accent === 'danger' ? theme.palette.custom.red :
                    verbalDate?.accent === 'warning' ? theme.palette.warning.light : '',
                })}>
                  {
                    !!verbalDate &&
                    verbalDate.label
                  }
                </Box>

              {
                !!verbalDate &&
                !!task.note &&
                ' - '
              }

              {
                !!task.note &&
                'Note'
              }
            </Typography>
        }
      </Box>

      <Box
        onClick={onTaskImportantClick}
        sx={{
          ml: 'auto',
          cursor: 'pointer',
        }}
      >
        {
          task.important ?
            <StarIcon sx={theme => ({
              display: 'block',
              fill: theme.palette.custom.red,
            })}/> :
            <StarBorderIcon sx={theme => ({
              display: 'block',
              fill: theme.palette.custom.grey['2'],
            })}/>
        }
      </Box>
    </Box>
  )
}