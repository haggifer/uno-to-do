import {TasksPage} from "./TasksPage";
import {selectImportantTasks} from "../../../../redux/selectors/tasks";
import {useAppSelector} from "../../../../redux/hooks";
import React, {useState} from "react";
import {CenteredLoader} from "../../../common/CenteredLoader";
import {sortOptions, splitOptions, TasksSortOptionValue, TasksSplitOptionValue} from "./TasksPageFilters";
import {ISelectOption} from "../../../../typescript/common";
import {useTheme} from "@mui/material";

const ImportantTasks = () => {
  const theme = useTheme()

  const tasksDataImportant = useAppSelector(selectImportantTasks)

  const [splitOption, setSplitOption] =
    useState<ISelectOption<TasksSplitOptionValue>>(splitOptions[0])

  const [sortOption, setSortOption] =
    useState<ISelectOption<TasksSortOptionValue>>(sortOptions[0])

  return (
    !tasksDataImportant ?
      <CenteredLoader/> :
      <TasksPage
        header={{
          title: 'Important',
          splitOption: splitOption,
          setSplitOption: setSplitOption,
          sortOption: sortOption,
          setSortOption: setSortOption,
          controls: false,
        }}
        visibleTasks={tasksDataImportant}
        splitValue={splitOption.value}
        sortValue={sortOption.value}
        sx={{
          background: theme.palette.custom.red,
          '& .button_add': {
            background: theme.palette.custom.importantButtonBg,
            '&:hover': {
              background: theme.palette.custom.importantButtonHoverBg,
            }
          },
        }}
      />
  )
}

export default ImportantTasks