import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, {MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {IPartialTask, ITask} from "../../../../typescript/entities";
import StarIcon from "@mui/icons-material/Star";
import {getDateStringFromVerbal, getFormattedDate, getUTCDueDateString} from "../../../../utils/helpers/dates";
import TodayIcon from '@mui/icons-material/Today';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import moment from "moment/moment";
import {StaticDatePicker} from "@mui/x-date-pickers";
import {Moment} from "moment";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {DeleteTask} from "./modals/DeleteTask";
import {Resizable, ResizeCallbackData} from "react-resizable";
import {CommonModal} from "../../../common/CommonModal";
import {Transition, TransitionStatus} from "react-transition-group";
import {Theme} from "@mui/material/styles";
import {SystemStyleObject} from "@mui/system/styleFunctionSx/styleFunctionSx";

interface IProps {
  activeTask: ITask | null,
  setActiveTask: (newValue: ITask | null) => void,
  updateTask: (updatedPartialTask: IPartialTask) => void,
}

export const defaultDetailsWidth = 320
export const minDetailsWidth = 320
export const maxDetailsWidth = 600

export const taskDetailsTransitionDuration = 200

export const TasksDetails = ({activeTask, setActiveTask, updateTask}: IProps) => {
  const detailsRef = useRef(null)

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const upSm = useMediaQuery(theme.breakpoints.up('sm'))

  const [detailsWidth, setDetailsWidth] = useState<number>(defaultDetailsWidth)

  const detailsWidthCss = useMemo<string>(() => {
    return upSm ?
      `${detailsWidth}px` :
      '100vw'
  }, [detailsWidth, upSm])

  const [detailsTransition, setDetailsTransition] = useState<boolean>(true)

  const [localTitleValue, setLocalTitleValue] = useState<string>('')

  const [localNoteValue, setLocalNoteValue] = useState<string>('')

  const [showDueDateOptions, setShowDueDateOptions] = useState<boolean>(false)

  const [showDueDateDatepicker, setShowDueDateDatepicker] = useState<boolean>(false)

  const [datepickerValue, setDatepickerValue] = useState<Moment | null>(null)

  const [deleteTask, setDeleteTask] = useState<boolean>(false)

  useEffect(() => {
    setDetailsWidth(defaultDetailsWidth)
  }, [upSm])

  useEffect(() => {
    setLocalTitleValue(activeTask?.title || '')
    setLocalNoteValue(activeTask?.note || '')

    const datepickerStringValue = datepickerValue && getUTCDueDateString(datepickerValue)

    if (activeTask && activeTask.due_date !== datepickerStringValue) {
      setDatepickerValue(activeTask?.due_date ? moment(activeTask.due_date) : null)
    }
  }, [activeTask])

  useEffect(() => {
    if (!showDueDateOptions) {
      setShowDueDateDatepicker(false)
    }
  }, [showDueDateOptions])

  useEffect(() => {
    const datepickerStringValue = datepickerValue && datepickerValue.toISOString()

    if (activeTask && activeTask?.due_date !== datepickerStringValue) {
      updateTask({
        id: activeTask.id,
        due_date: datepickerValue && getUTCDueDateString(datepickerValue),
      })
    }
  }, [datepickerValue])

  const onTitleBlur = useCallback(() => {
    if (localTitleValue) {
      updateTask({
        id: activeTask!.id,
        title: localTitleValue,
      })
    }
  }, [activeTask, localTitleValue, updateTask])

  const onNoteBlur = useCallback(() => {
    if (localNoteValue) {
      updateTask({
        id: activeTask!.id,
        note: localNoteValue,
      })
    }
  }, [activeTask, localNoteValue, updateTask])

  const onCompletedClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    updateTask({
      id: activeTask!.id,
      completed: !activeTask!.completed,
    })

    e.stopPropagation()
  }, [activeTask, updateTask])

  const onImportantClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    updateTask({
      id: activeTask!.id,
      important: !activeTask!.important,
    })

    e.stopPropagation()
  }, [activeTask, updateTask])

  const onDueDateCloseClick: MouseEventHandler<SVGElement> = useCallback((e) => {
    setShowDueDateOptions(false)

    if (activeTask!.due_date) {
      updateTask({
        id: activeTask!.id,
        due_date: null,
      })
    }

    e.stopPropagation()
  }, [activeTask, updateTask])

  const onDueDateOptionClick = useCallback((value: 'today' | 'tomorrow' | 'currentWeek') => {
    const dateString = getUTCDueDateString(
      moment(getDateStringFromVerbal(value))
    )

    updateTask({
      id: activeTask!.id,
      due_date: dateString,
    })
  }, [activeTask, updateTask])

  const onResize = (
    event: React.SyntheticEvent<Element, Event>,
    {node, size, handle}: ResizeCallbackData
  ) => {
    setDetailsWidth(size.width)
  }

  const getDetailsTransitionStyles = (state: TransitionStatus, theme: Theme): SystemStyleObject<Theme> => {
    switch (state) {
      case "entering":
        return {
          right: 0,
        }
      case "entered":
        return {
          right: 0,
        }
      case "exiting":
        return {
          right: `-${detailsWidthCss}`,
        }
      case "exited":
        return {
          right: `-${detailsWidthCss}`,
        }
      default:
        return {}
    }
  };

  const content = useMemo(() => (
    <Box sx={theme => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      minHeight: '100vh',
      pt: upMd ? 8 : 4,
      px: upMd ? 4 : 3,
      pb: upMd ? 4 : 3,
      background: theme.palette.custom.basicBg,
    })}>
      {
        !!activeTask &&
          <>
              <Box>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    pt: '8px',
                  }}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '28px',
                      }}>
                          <Checkbox
                              checked={activeTask.completed}
                              onClick={onCompletedClick}
                              sx={theme => ({
                                p: 0,
                                color: theme.palette.custom.grey['4'],
                              })}
                          />
                      </Box>

                      <TextField
                          value={localTitleValue}
                          onChange={e => setLocalTitleValue(e.currentTarget.value)}
                          onBlur={onTitleBlur}
                          placeholder="Task name cannot be empty"
                          multiline={true}
                          sx={theme => ({
                            mx: 4,
                            '&, & *': {
                              '&, &:focus': {
                                border: '0 !important',
                                outline: '0 !important',
                                padding: '0 !important',
                                fontSize: '22px !important',
                                lineHeight: '28px !important',
                                '&::placeholder': {
                                  opacity: '1 !important',
                                  color: `${theme.palette.custom.grey['4']} !important`,
                                }
                              },
                            }
                          })}
                      />

                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '28px',
                        ml: 'auto',
                      }}>
                          <Box
                              onClick={onImportantClick}
                              sx={{
                                ml: 'auto',
                                cursor: 'pointer',
                              }}
                          >
                            {
                              activeTask.important ?
                                <StarIcon sx={theme => ({
                                  display: 'block',
                                  fill: theme.palette.custom.red,
                                })}/> :
                                <StarIcon sx={theme => ({
                                  display: 'block',
                                  fill: theme.palette.custom.grey['2'],
                                })}/>
                            }
                          </Box>
                      </Box>
                  </Box>

                  <Divider sx={{
                    my: 4,
                  }}/>

                  <Box>
                      <Box
                          onClick={() => {
                            setShowDueDateOptions(!showDueDateOptions)
                          }}
                          sx={theme => ({
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                          })}
                      >
                          <TodayIcon sx={theme => ({
                            color: activeTask!.due_date ? theme.palette.primary.main : theme.palette.custom.grey['4'],
                          })}/>

                          <Typography variant="subtitle1" sx={theme => ({
                            mx: 3,
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: 500,
                            color: activeTask!.due_date ? theme.palette.primary.main : theme.palette.custom.grey['4'],
                          })}>
                            {
                              activeTask!.due_date ?
                                `Due ${getFormattedDate(new Date(activeTask.due_date))}` :
                                'Add Due Date'
                            }
                          </Typography>

                        {
                          (!!activeTask!.due_date || showDueDateOptions) &&
                            <CloseIcon
                                onClick={onDueDateCloseClick}
                                sx={theme => ({
                                  ml: 'auto',
                                  color: theme.palette.custom.grey['4'],
                                })}
                            />
                        }
                      </Box>

                    {
                      showDueDateOptions &&
                        <>
                            <Box sx={{
                              mt: 3,
                              '& > *': {
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2,
                                cursor: 'pointer',
                              },
                            }}>
                                <Box
                                    onClick={() => onDueDateOptionClick('today')}
                                    sx={theme => ({})}
                                >
                                    <TodayIcon/>

                                    <Typography sx={{
                                      ml: 3,
                                      fontSize: '16px',
                                      lineHeight: '24px',
                                      fontWeight: 500,
                                    }}>Today</Typography>
                                </Box>
                                <Box
                                    onClick={() => onDueDateOptionClick('tomorrow')}
                                    sx={theme => ({})}
                                >
                                    <TodayIcon/>

                                    <Typography sx={{
                                      ml: 3,
                                      fontSize: '16px',
                                      lineHeight: '24px',
                                      fontWeight: 500,
                                    }}>Tomorrow</Typography>
                                </Box>
                                <Box
                                    onClick={() => onDueDateOptionClick('currentWeek')}
                                    sx={theme => ({})}
                                >
                                    <TodayIcon/>

                                    <Typography sx={{
                                      ml: 3,
                                      fontSize: '16px',
                                      lineHeight: '24px',
                                      fontWeight: 500,
                                    }}>Current Week</Typography>
                                </Box>
                                <Box
                                    onClick={() => {
                                      setShowDueDateDatepicker(!showDueDateDatepicker)
                                    }}
                                    sx={theme => ({})}
                                >
                                    <TodayIcon/>

                                    <Typography sx={{
                                      ml: 3,
                                      fontSize: '16px',
                                      lineHeight: '24px',
                                      fontWeight: 500,
                                    }}>Pick a Date</Typography>

                                  {
                                    showDueDateDatepicker ?
                                      <ExpandLessIcon sx={{
                                        ml: 'auto',
                                      }}/> :
                                      <ExpandMoreIcon sx={{
                                        ml: 'auto',
                                      }}/>
                                  }
                                </Box>
                            </Box>

                          {
                            showDueDateDatepicker &&
                              <StaticDatePicker
                                  value={datepickerValue}
                                  onChange={setDatepickerValue}
                                  disablePast
                                  sx={{
                                    ml: -4,
                                    '& .MuiDialogActions-root': {
                                      display: 'none',
                                    }
                                  }}
                              />
                          }
                        </>
                    }
                  </Box>

                  <Divider sx={{
                    my: 4,
                  }}/>

                  <Box>
                    {
                      localNoteValue &&
                        <InputLabel sx={theme => ({
                          fontSize: '12px',
                          lineHeight: '16px',
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                        })}>Note</InputLabel>
                    }
                      <TextField
                          value={localNoteValue}
                          onChange={e => setLocalNoteValue(e.currentTarget.value)}
                          onBlur={onNoteBlur}
                          placeholder="Add note"
                          multiline={true}
                          sx={theme => ({
                            width: '100%',
                            maxHeight: '300px',
                            overflow: 'auto',
                            '&, & *': {
                              '&, &:focus': {
                                border: '0 !important',
                                outline: '0 !important',
                                padding: '0 !important',
                                fontSize: '16px !important',
                                lineHeight: '24px !important',
                                fontWeight: '500 !important',
                                '&::placeholder': {
                                  opacity: '1 !important',
                                  color: `${theme.palette.custom.grey['4']} !important`,
                                }
                              },
                            }
                          })}
                      />
                  </Box>

                  <Divider sx={{
                    my: 4,
                  }}/>
              </Box>

              <Box sx={theme => ({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& *': {
                  color: theme.palette.custom.grey['4'],
                },
              })}>
                  <IconButton
                      onClick={() => setActiveTask(null)}
                      sx={{
                        ml: -2,
                      }}
                  >
                      <ArrowForwardIosIcon/>
                  </IconButton>
                  <Typography variant="body1" sx={{
                    mx: 3,
                    fontSize: '12px',
                    lineHeight: '16px',
                    fontWeight: 500,
                  }}>
                    {`Created ${getFormattedDate(new Date(activeTask.creation_date))}`}
                  </Typography>
                  <IconButton
                      onClick={() => setDeleteTask(true)}
                      sx={{
                        mr: -2,
                      }}
                  >
                      <DeleteOutlineIcon/>
                  </IconButton>
              </Box>
          </>
      }
    </Box>
  ), [activeTask, datepickerValue, localNoteValue, localTitleValue, onCompletedClick, onDueDateCloseClick, onDueDateOptionClick, onImportantClick, onNoteBlur, onTitleBlur, setActiveTask, showDueDateDatepicker, showDueDateOptions, upMd])

  return (
    <>
      <Transition
        nodeRef={detailsRef}
        in={!!activeTask}
        timeout={taskDetailsTransitionDuration}
        onEntered={() => {
          setDetailsTransition(false)
        }}
        onExit={() => {
          setDetailsTransition(true)
        }}
      >
        {
          state => (
            <Box
              ref={detailsRef}
            >
              {
                upSm ?
                  <Resizable
                    width={detailsWidth as number}
                    onResize={onResize}
                    axis="x"
                    resizeHandles={['w']}
                    minConstraints={[minDetailsWidth, 0]}
                    maxConstraints={[maxDetailsWidth, 0]}
                    handle={(
                      <Box sx={{
                        display: !upMd ? 'none' : undefined,
                        position: 'absolute',
                        top: 0,
                        left: '-5px',
                        width: '10px',
                        height: '100%',
                        cursor: 'ew-resize',
                      }}></Box>
                    )}
                  >
                    <Box sx={{
                      position: 'relative',
                      width: activeTask ? (detailsWidthCss) : 0,
                      minHeight: '100vh',
                      overflowX: 'hidden',
                      transition: detailsTransition ? `${taskDetailsTransitionDuration}ms` : undefined,
                    }}>
                      <Box sx={theme => ({
                        ...getDetailsTransitionStyles(state, theme),
                        position: 'absolute',
                        top: 0,
                        width: detailsWidthCss,
                        maxWidth: '100%',
                        transition: detailsTransition ? `${taskDetailsTransitionDuration}ms` : undefined,
                      })}>
                        {content}
                      </Box>
                      <Box sx={{
                        width: '100%',
                        transition: detailsTransition ? `${taskDetailsTransitionDuration}ms` : undefined,
                      }}/>
                    </Box>
                  </Resizable> :
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: activeTask ? (detailsWidthCss) : 0,
                    minHeight: '100vh',
                    overflowX: 'hidden',
                    zIndex: 2,
                    transition: detailsTransition ? `${taskDetailsTransitionDuration}ms` : undefined,
                  }}>
                    <Box
                      sx={{
                        ...getDetailsTransitionStyles(state, theme),
                        position: 'absolute',
                        top: 0,
                        right: !!activeTask ? 0 : `-${detailsWidthCss}`,
                        width: detailsWidthCss,
                        transition: detailsTransition ? `${taskDetailsTransitionDuration}ms` : undefined,
                      }}
                    >
                      {content}
                    </Box>
                  </Box>
              }
            </Box>
          )
        }
      </Transition>

      <CommonModal
        open={deleteTask}
        onClose={() => setDeleteTask(false)}
      >
        <DeleteTask
          onClose={() => setDeleteTask(false)}
          task={activeTask}
        />
      </CommonModal>
    </>
  )
}