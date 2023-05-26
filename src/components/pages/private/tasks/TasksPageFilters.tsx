import {ISelectOption} from "../../../../typescript/common";
import {Box} from "@mui/material";
import {CommonSelect} from "../../../common/CommonSelect";

export type TasksSplitOptionValue = '' | 'byCompleted' | 'byImportant';

export const splitOptions: Readonly<ISelectOption<TasksSplitOptionValue>[]> = [
  {label: 'No split', value: ''},
  {label: 'Split by selected', value: 'byCompleted'},
  {label: 'Split by importance', value: 'byImportant'},
]

export type TasksSortOptionValue = '' | 'byTitle' | 'byCompleted' | 'byImportant';

export const sortOptions: Readonly<ISelectOption<TasksSortOptionValue>[]> = [
  {label: 'No sorting', value: ''},
  {label: 'Sort by title', value: 'byTitle'},
  {label: 'Sort by completed', value: 'byCompleted'},
  {label: 'Sort by important', value: 'byImportant'},
]

interface IProps {
  splitOption: ISelectOption<TasksSplitOptionValue>,
  setSplitOption: (newValue: ISelectOption<TasksSplitOptionValue>) => void,
  sortOption: ISelectOption<TasksSortOptionValue>,
  setSortOption: (newValue: ISelectOption<TasksSortOptionValue>) => void,
}

export const TasksPageFilters = ({splitOption, setSplitOption, sortOption, setSortOption}: IProps) => {
  return (
    <Box sx={{
      display: 'flex',
      '& > *:not(:last-child)': {
        mr: 2,
      },
    }}>
      <CommonSelect<TasksSplitOptionValue, false>
        classNamePrefix="react-select"
        value={splitOption}
        onChange={newValue => {
          setSplitOption(newValue as ISelectOption<TasksSplitOptionValue>)
        }}
        options={splitOptions}
      />

      <CommonSelect<TasksSortOptionValue, false>
        classNamePrefix="react-select"
        value={sortOption}
        onChange={newValue => {
          setSortOption(newValue as ISelectOption<TasksSplitOptionValue>)
        }}
        options={sortOptions}
      />
    </Box>
  )
}