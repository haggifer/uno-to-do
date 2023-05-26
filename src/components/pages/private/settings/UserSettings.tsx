import {useAppDispatch, useAppSelector} from "redux/hooks";
import React, {useEffect, useMemo, useState} from "react";
import {useFormik} from "formik";
import * as yup from 'yup'
import {Avatar, Box, Button, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {generateInputError} from "utils/helpers/forms";
import {CommonTextField} from "../../../common/CommonTextField";
import {selectUsers} from "redux/selectors/users";
import {IUser} from "typescript/entities";
import {DragDrop as DragDropComponent} from "@uppy/react";
import Uppy, {UppyFile} from "@uppy/core";
import defaultLocale from "utils/defaultUppyLocale";
import DragDrop from "@uppy/drag-drop";
import {generateInitials} from "../../../../utils/helpers/common";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {updateUser} from "../../../../redux/features/users/usersThunks";

interface IProps {
  onClose: () => void,
}

interface IFormValues {
  avatar: UppyFile | null,
  full_name: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

export const UserSettings = ({onClose}: IProps) => {
  const dispatch = useAppDispatch()

  const uppy = useMemo(() => (
    new Uppy({
      autoProceed: true,
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ['image/jpeg', 'image/png'],
      },
      locale: {
        ...defaultLocale,
        strings: {
          ...defaultLocale.strings,
          youCanOnlyUploadFileTypes: 'You can only upload JPEG or PNG files',
        }
      },
    }).use(DragDrop)
  ), [])

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const user = useAppSelector(selectUsers).current as IUser

  const [initValues] = useState<IFormValues>({
    avatar: null,
    full_name: user.full_name,
    email: user.email,
    password: '',
    passwordConfirm: '',
  })

  const [isAvatarUpdated, setIsAvatarUpdated] = useState(false)

  const validationSchema = yup.object({
    full_name: yup.string()
      .trim()
      .required(),
    email: yup.string()
      .trim()
      .required(),
    password: yup.string()
      .trim(),
    passwordConfirm: yup.string()
      .trim(),
  })

  const processSubmit = async () => {
    await dispatch(updateUser({
      id: user.id,
      avatar: null,
      full_name: values.full_name,
      email: values.email,
      password: values.password || undefined,
    }))

    onClose()
  }

  const onRemoveFile = () => {
    setIsAvatarUpdated(true)

    if (values.avatar) {
      uppy.removeFile(values.avatar.id)

      setFieldValue('avatar', null)
    }
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

  useEffect(() => {
    uppy.on('files-added', (files) => {
      setIsAvatarUpdated(true)

      setFieldValue('avatar', files[0])
    })
  }, [setFieldValue, uppy])

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
      }}>User settings</Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Avatar
          sx={theme => ({
            position: 'relative',
            width: 200,
            height: 200,
            mb: 3,
            background: theme.palette.primary.main,
            fontSize: '70px',
            lineHeight: '84px',
          })}
        >
          {
            values.avatar || (user.avatar && !isAvatarUpdated) ?
              <img
                src={((values.avatar && URL.createObjectURL(values.avatar.data)) || user.avatar) as string}
                alt="avatar"
              /> :
              generateInitials(user.full_name)
          }

          <Box sx={theme => ({
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            zIndex: 2,
            transition: '0.2s',
            '&:hover': {
              opacity: 1,
            },
          })}>
            <Box sx={theme => ({
              position: 'absolute',
              bottom: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '30%',
              transition: '0.2s',
              '&:after': {
                content: "''",
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.5,
                zIndex: -1,
                background: theme.palette.custom.grey['4'],
                transition: '0.2s',
              },
              '& > *': {
                position: 'relative',
                '&:not(:last-child)': {
                  mr: 1,
                },
                '&:hover': {
                  background: theme.palette.custom.grey['3'],
                },
                '& > *': {
                  fontSize: '25px',
                  color: theme.palette.custom.grey['1'],
                }
              }
            })}>
              <IconButton>
                <AddIcon/>

                <Box
                  component={DragDropComponent}
                  uppy={uppy}
                  sx={theme => ({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    '& *': {
                      cursor: 'pointer',
                    }
                  })}
                />
              </IconButton>
              {
                (values.avatar || (user.avatar && !isAvatarUpdated)) &&
                  <IconButton onClick={onRemoveFile}>
                      <DeleteIcon/>
                  </IconButton>
              }
            </Box>
          </Box>
        </Avatar>
      </Box>

      <CommonTextField
        name="full_name"
        required
        value={values.full_name}
        onChange={handleChange}
        autoFocus
        error={!!errors.full_name && touched.full_name}
        helperText={!!errors.full_name && touched.full_name && generateInputError('full_name')}
        placeholder="Full name"
        label="Full name"
        sx={{
          mb: 2,
        }}
      />

      <CommonTextField
        name="email"
        type="email"
        required
        value={values.email}
        onChange={handleChange}
        autoFocus
        error={!!errors.email && touched.email}
        helperText={!!errors.email && touched.email && generateInputError('email')}
        placeholder="Email"
        label="Email"
        sx={{
          mb: 2,
        }}
      />

      <CommonTextField
        name="password"
        type="password"
        autoComplete="new-password"
        value={values.password}
        onChange={handleChange}
        autoFocus
        error={!!errors.password && touched.password}
        helperText={!!errors.password && touched.password && generateInputError('password')}
        placeholder="Password"
        label="Password"
        sx={{
          mb: 2,
        }}
      />

      <CommonTextField
        name="passwordConfirm"
        type="password"
        value={values.passwordConfirm}
        onChange={handleChange}
        autoFocus
        error={!!values.password && values.password !== values.passwordConfirm}
        helperText={!!values.password && values.password !== values.passwordConfirm && touched.passwordConfirm
          && generateInputError('passwordConfirm')}
        placeholder="Confirm password"
        label="Confirm password"
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
          // disabled={tasks.loading.includes(CREATE_TASK_LIST)}
        >
          Confirm
          {/*{*/}
          {/*  tasks.loading.includes(CREATE_TASK_LIST) &&*/}
          {/*    <ButtonLoader/>*/}
          {/*}*/}
        </Button>
      </Box>
    </Box>
  )
}