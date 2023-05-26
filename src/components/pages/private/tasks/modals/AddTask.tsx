import {useAppDispatch, useAppSelector} from "redux/hooks";
import React, {useMemo, useState} from "react";
import {useFormik} from "formik";
import * as yup from 'yup'
import {Box, Button, Checkbox, FormControlLabel, Typography, useMediaQuery, useTheme} from "@mui/material";
import {generateInputError} from "utils/helpers/forms";
import {CommonTextField} from "../../../../common/CommonTextField";
import {selectTasks} from "../../../../../redux/selectors/tasks";
import {DatePicker} from "@mui/x-date-pickers";
import {Moment} from "moment";
import {ISelectOption} from "../../../../../typescript/common";
import {ITask, ITaskList} from "../../../../../typescript/entities";
import {CommonSelect} from "../../../../common/CommonSelect";
import {getNewEntityId} from "../../../../../utils/helpers/common";
import {getUTCDueDateString} from "../../../../../utils/helpers/dates";
import {createTask} from "../../../../../redux/features/tasks/tasksThunks";
import {ButtonLoader} from "../../../../common/ButtonLoader";
import {CREATE_TASK} from "../../../../../redux/variables";

interface IProps {
  onClose: () => void,
  defaultList?: ITaskList,
}

interface IFormValues {
  title: string,
  important: boolean,
  due_date: Moment | null,
  note: string,
  list: ISelectOption<number> | null,
}

export const AddTask = ({onClose, defaultList}: IProps) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const tasks = useAppSelector(selectTasks)

  const taskListOptions = useMemo(() => [
    ...(tasks.lists as ITaskList[]).map(list => ({
      label: list.name,
      value: list.id,
    })),
  ], [tasks.lists])

  const [initValues] = useState<IFormValues>({
    title: '',
    important: false,
    due_date: null,
    note: '',
    list: defaultList ?
      taskListOptions.find(option => option.value === defaultList.id)! :
      null,
  })

  const validationSchema = yup.object({
    title: yup.string()
      .trim()
      .required(),
    note: yup.string()
      .trim(),
  })

  const processSubmit = async () => {
    const newTask = {
      id: getNewEntityId((tasks.data as ITask[]).map(task => task.id)),
      title: values.title,
      creation_date: (new Date()).toISOString(),
      due_date: values.due_date && getUTCDueDateString(values.due_date),
      note: values.note || null,
      list_id: values.list?.value || null,
      important: values.important,
      completed: false,
    }

    await dispatch(createTask(newTask))

    onClose()
  }

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
  } =
    useFormik({
      validationSchema: validationSchema,
      onSubmit: processSubmit,
      initialValues: initValues,
      enableReinitialize: true,
    });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={theme => ({
        width: upMd ? '700px' : undefined,
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
      }}>Add a task</Typography>

      <CommonTextField
        name="title"
        required
        value={values.title}
        onChange={handleChange}
        autoFocus
        error={!!errors.title && touched.title}
        helperText={!!errors.title && touched.title && generateInputError('title')}
        placeholder="Title"
        label="Title"
        sx={{
          mb: 2,
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="important"
            checked={values.important}
            onChange={handleChange}
          />
        }
        label="Important"
        sx={{
          mb: 2,
        }}
      />

      <DatePicker
        value={values.due_date}
        onChange={newValue => {
          setFieldValue('due_date', newValue)
        }}
        disablePast
        sx={{
          mb: 2,
        }}
      />

      <CommonSelect<number, false>
        name="list"
        value={values.list}
        placeholder="Select task list..."
        onChange={newValue => setFieldValue('list', newValue)}
        options={taskListOptions}
        styles={{
          control: {
            height: '56px',
            marginBottom: theme.spacing(2),
          },
        }}
      />

      <CommonTextField
        name="note"
        required
        value={values.note}
        onChange={handleChange}
        multiline
        minRows={3}
        placeholder="Note"
        label="Note"
      />

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
          type="submit"
          variant="contained"
          disabled={tasks.loading.includes(CREATE_TASK)}
        >
          Add
          {
            tasks.loading.includes(CREATE_TASK) &&
              <ButtonLoader/>
          }
        </Button>
      </Box>
    </Box>
  )
}