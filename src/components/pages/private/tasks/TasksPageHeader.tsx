import {tasksHeaderFiltersHeight, tasksHeaderMarginBottom, tasksHeaderTitleHeight} from "./TasksPage";
import {Box, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {TasksPageFilters, TasksSortOptionValue, TasksSplitOptionValue} from "./TasksPageFilters";
import {ISelectOption} from "../../../../typescript/common";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuIcon from "@mui/icons-material/Menu";
import React, {useContext} from "react";
import {ISidebarContext, SidebarContext} from "../../../../utils/contexts/SidebarContext";

interface IProps {
  title: string,
  splitOption: ISelectOption<TasksSplitOptionValue>,
  setSplitOption: (newValue: ISelectOption<TasksSplitOptionValue>) => void,
  sortOption: ISelectOption<TasksSortOptionValue>,
  setSortOption: (newValue: ISelectOption<TasksSortOptionValue>) => void,
  controls?: {
    edit: boolean,
    setEdit: (value: boolean) => void,
    delete: boolean,
    setDelete: (value: boolean) => void,
  },
}

export const TasksPageHeader = ({title, splitOption, setSplitOption, sortOption, setSortOption, controls}: IProps) => {
  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const {open, setOpen} = useContext(SidebarContext) as ISidebarContext

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: upMd ? `${tasksHeaderTitleHeight}px` : undefined,
        mb: tasksHeaderMarginBottom,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          {
            !upMd &&
              <IconButton onClick={() => setOpen(!open)} sx={theme => ({
                p: 0,
                mr: 3,
                color: theme.palette.custom.contrastTextColor,
              })}>
                  <MenuIcon/>
              </IconButton>
          }

          <Typography variant="h3" sx={theme => ({
            fontSize: '22px',
            lineHeight: '28px',
            color: theme.palette.custom.contrastTextColor,
          })}>{title}</Typography>
        </Box>

        {
          controls &&
            <Box sx={theme => ({
              display: 'flex',
              '& svg': {
                fontSize: '24px',
                color: theme.palette.custom.contrastTextColor,
              },
            })}>
                <IconButton onClick={() => controls.setEdit(true)}>
                    <DriveFileRenameOutlineIcon/>
                </IconButton>
                <IconButton onClick={() => controls.setDelete(true)}>
                    <DeleteOutlineIcon/>
                </IconButton>
            </Box>
        }
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: `${tasksHeaderFiltersHeight}px`,
        mb: tasksHeaderMarginBottom,
      }}>
        <TasksPageFilters
          splitOption={splitOption}
          setSplitOption={setSplitOption}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </Box>
    </>
  )
}