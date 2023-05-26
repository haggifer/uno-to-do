import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as yup from 'yup'
import {createUser, getUsers, login} from "../../../redux/features/users/usersThunks";
import {getDefaultPrivatePath} from "../../../routing/routes/privateRoutes";
import {Link, useNavigate} from "react-router-dom";
import {clearAlert, setAlert} from "../../../redux/features/alert/alertSlice";
import {selectUsers} from "../../../redux/selectors/users";
import {Box, Button, Typography} from "@mui/material";
import {generateInputError} from "../../../utils/helpers/forms";
import {CommonTextField} from "../../common/CommonTextField";
import {LoginWrapper} from "./LoginWrapper";
import {getFromLS, setToLS} from "../../../utils/helpers/localStorage";
import {popupSx} from "../../../utils/sxs";
import {ButtonLoader} from "../../common/ButtonLoader";
import {CREATE_USER, LOGIN} from "../../../redux/variables";
import {getNewEntityId} from "../../../utils/helpers/common";
import {IUser} from "../../../typescript/entities";
import {useEffectOnce} from "../../../utils/hooks/useEffectOnce";
import {CenteredLoader} from "../../common/CenteredLoader";

interface IFormValues {
  full_name: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const users = useAppSelector(selectUsers)

  const isAlreadyVisited = getFromLS('isAlreadyVisited')

  const [initValues] = useState<IFormValues>({
    full_name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  useEffectOnce(() => {
    dispatch(getUsers())
  })

  const validationSchema = yup.object({
    full_name: yup.string()
      .trim()
      .required(),
    email: yup.string()
      .trim()
      .required(),
    password: yup.string()
      .trim()
      .required(),
    passwordConfirm: yup.string()
      .trim()
      .required(),
  })

  const processSubmit = async () => {
    const {full_name, email, password} = values

    const createUserResult = await dispatch(createUser({
      id: getNewEntityId((users.list as IUser[]).map(user => user.id)),
      full_name,
      email,
      password,
      avatar: null,
    }))

    if (createUserResult.meta.requestStatus === 'fulfilled') {
      const loginResult = await dispatch(login({
        email,
        password,
      }))

      if (loginResult.meta.requestStatus === 'fulfilled') {
        navigate(getDefaultPrivatePath());

        dispatch(clearAlert())

        if (!isAlreadyVisited) {
          setToLS('isAlreadyVisited', '1')
        }
      } else {
        dispatch(setAlert({
          text: 'Incorrect email or password',
          type: 'error',
        }))
      }
    } else {
      dispatch(setAlert({
        text: 'Create current error',
        type: 'error',
      }))
    }
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
    <>
      {
        !users.list ?
          <CenteredLoader/> :

          <LoginWrapper>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={theme => ({
                ...popupSx(theme),
              })}
            >
              <Typography variant="h3" sx={{
                fontSize: '24px',
                lineHeight: '24px',
                marginBottom: '24px',
              }}>Sign up</Typography>

              <CommonTextField
                name="full_name"
                required
                value={values.full_name}
                onChange={handleChange}
                error={!!errors.full_name && touched.full_name}
                helperText={!!errors.full_name && touched.full_name && generateInputError('full_name')}
                placeholder="Full name"
                label="Full name"
                sx={{
                  width: '100%',
                  mb: 2,
                }}
              />
              <CommonTextField
                name="email"
                type="email"
                required
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                label="Email"
                autoFocus
                error={!!errors.email && touched.email}
                helperText={!!errors.email && touched.email && generateInputError('email')}
                sx={{
                  width: '100%',
                  mb: 2,
                }}
              />

              <CommonTextField
                type="password"
                name="password"
                required
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password && touched.password}
                helperText={!!errors.password && touched.password && generateInputError('password')}
                placeholder="Password"
                label="Password"
                sx={{
                  width: '100%',
                  mb: 2,
                }}
              />

              <CommonTextField
                type="password"
                name="passwordConfirm"
                required
                value={values.passwordConfirm}
                onChange={handleChange}
                error={!!values.password && values.password !== values.passwordConfirm && touched.passwordConfirm}
                helperText={!!values.password && values.password !== values.passwordConfirm && touched.passwordConfirm
                  && generateInputError('passwordConfirm')}
                placeholder="Confirm password"
                label="Confirm password"
                sx={{
                  width: '100%',
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={users.loading.includes(CREATE_USER) || users.loading.includes(LOGIN)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: '100%',
                  mt: 4,
                  mb: 3,
                }}
              >
                Sign up
                {
                  (users.loading.includes(CREATE_USER) || users.loading.includes(LOGIN)) &&
                    <ButtonLoader/>
                }
              </Button>

              <Typography sx={theme => ({
                fontSize: '14px',
                lineHeight: '20px',
                color: theme.palette.custom.grey['3'],
                textAlign: 'center',
              })}>
                Already have an account? &nbsp;
                <Box component={Link} to="/login" sx={theme => ({
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                  cursor: 'pointer',
                })}>Log in</Box>
              </Typography>
            </Box>
          </LoginWrapper>
      }
    </>
  )
}