import {useAppDispatch, useAppSelector} from "redux/hooks";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as yup from 'yup'
import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material";
import {generateInputError} from "utils/helpers/forms";
import {CommonTextField} from "../../../../common/CommonTextField";
import {selectTasks} from "../../../../../redux/selectors/tasks";
import {ITaskList} from "../../../../../typescript/entities";
import {updateTaskList} from "../../../../../redux/features/tasks/tasksThunks";
import {ButtonLoader} from "../../../../common/ButtonLoader";
import {UPDATE_TASK_LIST} from "../../../../../redux/variables";

interface IProps {
  onClose: () => void,
  taskList: ITaskList | null,
}

interface IFormValues {
  name: string,
}

export const EditTaskList = ({onClose, taskList}: IProps) => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const tasks = useAppSelector(selectTasks)

  const [initValues] = useState<IFormValues>({
    name: taskList?.name || '',
  })

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .required(),
  })

  const processSubmit = async () => {
    await dispatch(updateTaskList({
      id: taskList!.id,
      name: values.name,
    }))

    onClose()
  }

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
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
      }}>Rename list</Typography>

      <CommonTextField
        name="name"
        required
        value={values.name}
        onChange={handleChange}
        autoFocus
        error={!!errors.name && touched.name}
        helperText={!!errors.name && touched.name && generateInputError('name')}
        placeholder="New name"
        label="New name"
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
          disabled={tasks.loading.includes(UPDATE_TASK_LIST)}
        >
          Rename
          {
            tasks.loading.includes(UPDATE_TASK_LIST) &&
              <ButtonLoader/>
          }
        </Button>
      </Box>
    </Box>
  )
}