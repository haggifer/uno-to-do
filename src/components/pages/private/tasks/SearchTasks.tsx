import {TasksPage} from "./TasksPage";
import {selectTasks} from "../../../../redux/selectors/tasks";
import {useAppSelector} from "../../../../redux/hooks";
import React, {useMemo, useState} from "react";
import {CenteredLoader} from "../../../common/CenteredLoader";
import {sortOptions, splitOptions, TasksSortOptionValue, TasksSplitOptionValue} from "./TasksPageFilters";
import {ISelectOption} from "../../../../typescript/common";
import {ITask} from "../../../../typescript/entities";
import {useSearchParams} from "react-router-dom";

const SearchTasks = () => {
  const [params] = useSearchParams()

  const tasksData = useAppSelector(selectTasks).data as ITask[]

  const filteredTaskData = useMemo(() => {
    return tasksData.filter(
      task => !params.get('title') ||
        task.title.toLowerCase().includes((params.get('title') as string).toLowerCase())
    )
  }, [tasksData, params])

  const [splitOption, setSplitOption] =
    useState<ISelectOption<TasksSplitOptionValue>>(splitOptions[0])

  const [sortOption, setSortOption] =
    useState<ISelectOption<TasksSortOptionValue>>(sortOptions[0])

  return (
    !tasksData ?
      <CenteredLoader/> :
      <TasksPage
        header={{
          title: 'Search',
          splitOption: splitOption,
          setSplitOption: setSplitOption,
          sortOption: sortOption,
          setSortOption: setSortOption,
          controls: false,
        }}
        visibleTasks={filteredTaskData}
        splitValue={splitOption.value}
        sortValue={sortOption.value}
      />
  )
}

export default SearchTasks