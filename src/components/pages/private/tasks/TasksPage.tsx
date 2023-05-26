import {Box, Button, SxProps, Tab, Tabs, Typography, useMediaQuery, useTheme} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {IPartialTask, ITask, ITaskList} from "../../../../typescript/entities";
import {TasksItem} from "./TasksItem";
import {CommonTabPanels} from "../../../common/CommonTabPanels";
import {TasksSortOptionValue, TasksSplitOptionValue} from "./TasksPageFilters";
import _ from "lodash";
import AddIcon from "@mui/icons-material/Add";
import {Theme} from "@mui/material/styles";
import {SystemStyleObject} from "@mui/system/styleFunctionSx/styleFunctionSx";
import {useAppDispatch} from "../../../../redux/hooks";
import {updateTask} from "../../../../redux/features/tasks/tasksThunks";
import {AddTask} from "./modals/AddTask";
import {TasksDetails} from "./TaskDetails";
import {CommonModal} from "../../../common/CommonModal";
import {DeleteTaskList} from "./modals/DeleteTaskList";
import {EditTaskList} from "./modals/EditTaskList";
import {TasksPageHeader} from "./TasksPageHeader";
import {ISelectOption} from "../../../../typescript/common";

interface IProps {
  header: {
    title: string,
    splitOption: ISelectOption<TasksSplitOptionValue>,
    setSplitOption: (newOption: ISelectOption<TasksSplitOptionValue>) => void,
    sortOption: ISelectOption<TasksSortOptionValue>,
    setSortOption: (newOption: ISelectOption<TasksSortOptionValue>) => void,
    controls?: boolean,
  },
  visibleTasks: ITask[],
  targetTaskList?: ITaskList,
  splitValue: TasksSplitOptionValue,
  sortValue: TasksSortOptionValue,
  sx?: SxProps<Theme>,
}

export const tasksHeaderTitleHeight = 40
export const tasksHeaderFiltersHeight = 38
export const tasksHeaderMarginBottom = 2

export const tasksAddButtonMarginTop = 4
export const tasksAddButtonHeight = 40

export const TasksPage = ({header, visibleTasks, targetTaskList, splitValue, sortValue, sx}: IProps) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const tasksPagePaddingTop = useMemo(() => upMd ? 8 : 4, [upMd])
  const tasksPagePaddingBottom = useMemo(() => upMd ? 4 : 3, [upMd])

  const [tabIndex, setTabIndex] = useState<number>(0)

  const [addTask, setAddTask] = useState<boolean>(false)
  const [editTaskList, setEditTaskList] = useState<boolean>(false)
  const [deleteTaskList, setDeleteTaskList] = useState<boolean>(false)

  const [activeTask, setActiveTask] = useState<ITask | null>(null)

  useEffect(() => {
    setActiveTask(visibleTasks.find(task => task.id === activeTask?.id) || null)
  }, [visibleTasks])

  useEffect(() => {
    setTabIndex(0)
  }, [splitValue])

  const processUpdateTask = useCallback((updatedPartialTask: IPartialTask) => {
    dispatch(updateTask(updatedPartialTask))
  }, [])

  const contentHeightCss = useMemo(() => {
    const occupiedHeight = parseInt(theme.spacing(tasksPagePaddingTop)) + tasksHeaderTitleHeight
      + parseInt(theme.spacing(tasksHeaderMarginBottom)) + tasksHeaderFiltersHeight
      + parseInt(theme.spacing(tasksHeaderMarginBottom)) + parseInt(theme.spacing(tasksAddButtonMarginTop))
      + tasksAddButtonHeight + parseInt(theme.spacing(tasksPagePaddingBottom))

    return `calc(100vh - ${occupiedHeight}px)`
  }, [tasksPagePaddingBottom, tasksPagePaddingTop, theme])

  const tasksContent = useMemo(() => {
    if (!visibleTasks.length) {
      return (
        <Typography variant="subtitle1" sx={theme => ({
          color: theme.palette.custom.contrastTextColor,
        })}>No tasks</Typography>
      )
    }

    const getSortedTasks = (tasks: ITask[]) => {
      switch (sortValue) {
        case "byTitle":
          return _.sortBy(tasks, task => [task.title, task.creation_date])
        case "byImportant":
          return _.sortBy(tasks, task => [!task.important, task.creation_date])
        case "byCompleted":
          return _.sortBy(tasks, task => [!task.completed, task.creation_date])
        case "":
          return _.sortBy(tasks, task => task.creation_date)
      }
    }

    switch (splitValue) {
      case "":
        return (
          getSortedTasks(visibleTasks)
            .map(task => (
              <TasksItem
                task={task}
                updateTask={processUpdateTask}
                activeTask={activeTask}
                setActiveTask={setActiveTask}
                key={task.id}
              />
            ))
        )
      case "byCompleted":
        return (
          <>
            <Tabs
              value={tabIndex}
              onChange={(e, value) => setTabIndex(value)}
              sx={{
                mb: 2,
                '& .MuiTab-root': {
                  minWidth: '180px',
                  textTransform: 'capitalize',
                },
              }}
            >
              <Tab label="To Do"/>
              <Tab label="Completed"/>
            </Tabs>

            <CommonTabPanels
              currentIndex={tabIndex}
              items={[
                {
                  children: getSortedTasks(visibleTasks.filter(task => !task.completed))
                    .map(task => (
                      <TasksItem
                        task={task}
                        updateTask={processUpdateTask}
                        activeTask={activeTask}
                        setActiveTask={setActiveTask}
                        key={task.id}
                      />
                    )),
                },
                {
                  children: getSortedTasks(visibleTasks.filter(task => task.completed))
                    .map(task => (
                      <TasksItem
                        task={task}
                        updateTask={processUpdateTask}
                        activeTask={activeTask}
                        setActiveTask={setActiveTask}
                        key={task.id}
                      />
                    ))
                },
              ]}
            />
          </>
        )
      case "byImportant":
        return (
          <>
            <Tabs
              value={tabIndex}
              onChange={(e, value) => setTabIndex(value)}
              sx={{
                mb: 2,
                '& .MuiTab-root': {
                  minWidth: '180px',
                  textTransform: 'capitalize',
                },
              }}
            >
              <Tab label="Important"/>
              <Tab label="Not important"/>
            </Tabs>

            <CommonTabPanels
              currentIndex={tabIndex}
              items={[
                {
                  children: getSortedTasks(visibleTasks.filter(task => task.important))
                    .map(task => (
                      <TasksItem
                        task={task}
                        updateTask={processUpdateTask}
                        activeTask={activeTask}
                        setActiveTask={setActiveTask}
                        key={task.id}
                      />
                    )),
                },
                {
                  children: getSortedTasks(visibleTasks.filter(task => !task.important))
                    .map(task => (
                      <TasksItem
                        task={task}
                        updateTask={processUpdateTask}
                        activeTask={activeTask}
                        setActiveTask={setActiveTask}
                        key={task.id}
                      />
                    ))
                },
              ]}
            />
          </>
        )
    }
  }, [visibleTasks, splitValue, sortValue, tabIndex, processUpdateTask, activeTask])

  return (
    <>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
      }}>
        <Box sx={theme => ({
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          px: upMd ? 4 : 3,
          pt: tasksPagePaddingTop,
          pb: tasksPagePaddingBottom,
          background: theme.palette.custom.tasksBg,
          ...(sx ? sx as SystemStyleObject<Theme> : {}),
        })}>
          <Box>
            <TasksPageHeader
              title={header.title}
              splitOption={header.splitOption}
              setSplitOption={header.setSplitOption}
              sortOption={header.sortOption}
              setSortOption={header.setSortOption}
              controls={
                header.controls ?
                  {
                    edit: editTaskList,
                    setEdit: setEditTaskList,
                    delete: deleteTaskList,
                    setDelete: setDeleteTaskList,
                  } : undefined
              }
            />

            <Box sx={{
              maxHeight: contentHeightCss,
              overflow: 'auto',
              mr: -2,
            }}>
              {tasksContent}
            </Box>
          </Box>

          <Button
            variant="text"
            className="button_add"
            onClick={() => setAddTask(true)}
            sx={theme => ({
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              p: 2,
              background: theme.palette.custom.tasksButtonBg,
              '&:hover': {
                background: '#8f82cc',
              },
              '&, & *': {
                color: theme.palette.common.white,
              },
            })}
          >
            <AddIcon sx={{
              mr: 2,
            }}/>

            Add a task
          </Button>
        </Box>

        <TasksDetails activeTask={activeTask} setActiveTask={setActiveTask} updateTask={processUpdateTask}/>
      </Box>

      <CommonModal
        open={addTask}
        onClose={() => setAddTask(false)}
      >
        <AddTask onClose={() => setAddTask(false)} defaultList={targetTaskList}/>
      </CommonModal>

      {
        targetTaskList &&
          <>
              <CommonModal
                  open={editTaskList}
                  onClose={() => setEditTaskList(false)}
              >
                  <EditTaskList
                      onClose={() => setEditTaskList(false)}
                      taskList={targetTaskList}
                  />
              </CommonModal>

              <CommonModal
                  open={deleteTaskList}
                  onClose={() => setDeleteTaskList(false)}
              >
                  <DeleteTaskList
                      onClose={() => setDeleteTaskList(false)}
                      taskList={targetTaskList}
                  />
              </CommonModal>
          </>
      }
    </>
  )
}