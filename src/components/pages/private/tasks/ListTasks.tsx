import React, {useMemo, useState} from "react";
import {TasksPage} from "./TasksPage";
import {sortOptions, splitOptions, TasksSortOptionValue, TasksSplitOptionValue} from "./TasksPageFilters";
import {useAppSelector} from "../../../../redux/hooks";
import {selectTasks} from "../../../../redux/selectors/tasks";
import {ISelectOption} from "../../../../typescript/common";
import {useParams} from "react-router";
import {ListNotFound} from "./ListNotFound";

const ListTasks = () => {
  const params = useParams()

  const tasksData = useAppSelector(selectTasks).data!
  const taskLists = useAppSelector(selectTasks).lists!

  const targetList = useMemo(() => {
    return taskLists.find(list => list.id === Number(params.listId))
  }, [params.listId, taskLists])

  const targetListTasks = useMemo(() => {
    return tasksData.filter(task => task.list_id === targetList?.id)
  }, [targetList, tasksData])

  const [splitOption, setSplitOption] =
    useState<ISelectOption<TasksSplitOptionValue>>(splitOptions[0])

  const [sortOption, setSortOption] =
    useState<ISelectOption<TasksSortOptionValue>>(sortOptions[0])

  return (
    !targetList || !targetListTasks ?
      <ListNotFound/> :
      <TasksPage
        header={{
          title: targetList.name,
          splitOption: splitOption,
          setSplitOption: setSplitOption,
          sortOption: sortOption,
          setSortOption: setSortOption,
          controls: true,
        }}
        visibleTasks={targetListTasks}
        targetTaskList={targetList}
        splitValue={splitOption.value}
        sortValue={sortOption.value}
      />
  )
}

export default ListTasks