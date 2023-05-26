import {TasksPage} from "./TasksPage";
import {selectTasks} from "../../../../redux/selectors/tasks";
import {useAppSelector} from "../../../../redux/hooks";
import React, {useState} from "react";
import {CenteredLoader} from "../../../common/CenteredLoader";
import {sortOptions, splitOptions, TasksSortOptionValue, TasksSplitOptionValue} from "./TasksPageFilters";
import {ISelectOption} from "../../../../typescript/common";
import {ITask} from "../../../../typescript/entities";

const AllTasks = () => {
  const tasksData = useAppSelector(selectTasks).data as ITask[]

  const [splitOption, setSplitOption] =
    useState<ISelectOption<TasksSplitOptionValue>>(splitOptions[0])

  const [sortOption, setSortOption] =
    useState<ISelectOption<TasksSortOptionValue>>(sortOptions[0])

  return (
    !tasksData ?
      <CenteredLoader/> :
      <TasksPage
        header={{
          title: 'All Tasks',
          splitOption: splitOption,
          setSplitOption: setSplitOption,
          sortOption: sortOption,
          setSortOption: setSortOption,
          controls: false,
        }}
        visibleTasks={tasksData}
        splitValue={splitOption.value}
        sortValue={sortOption.value}
      />
  )
}

export default AllTasks