import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as yup from 'yup'
import {login} from "../../../redux/features/users/usersThunks";
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
import {LOGIN} from "../../../redux/variables";
import {selectAlert} from "../../../redux/selectors/alert";
import {useLocation} from "react-router";

interface IFormValues {
  email: string,
  password: string,
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const users = useAppSelector(selectUsers)
  const alert = useAppSelector(selectAlert)

  const isAlreadyVisited = getFromLS('isAlreadyVisited')

  const [initValues] = useState<IFormValues>({
    email: '',
    password: '',
  })

  const validationSchema = yup.object({
    email: yup.string()
      .trim()
      .required(),
    password: yup.string()
      .required(),
  })

  const onForgotPassword = () => {
    navigate('/forgot-password')
  }

  const onSignUp = () => {
    navigate('/sign-up')
  }

  const processSubmit = async () => {
    const result = await dispatch(login(values))

    if (result.meta.requestStatus === 'fulfilled') {
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
        }}>Log in</Typography>

        <CommonTextField
          type="email"
          name="email"
          required
          value={values.email}
          onChange={handleChange}
          autoFocus
          error={!!errors.email && touched.email}
          helperText={!!errors.email && touched.email && generateInputError('email')}
          placeholder="Email"
          label="Email"
          sx={{
            width: '100%',
            mb: 2,
          }}
        />
        <CommonTextField
          type="password"
          name="password"
          required
          value={values.password}
          onChange={handleChange}
          error={!!errors.password && touched.password}
          helperText={!!errors.password && touched.password && generateInputError('password')}
          placeholder="Password"
          label="Password"
          sx={{
            width: '100%',
          }}
        />

        {
          !!alert.data &&
            <Typography sx={theme => ({
              mt: 2,
              color: theme.palette.error.main,
            })}>{alert.data.text}</Typography>
        }

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 4,
          mb: 3,
          '& > *:not(:last-child)': {
            mr: 2,
          },
        }}>
          <Button
            onClick={onForgotPassword}
            variant="outlined"
          >
            Forgot password
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={users.loading.includes(LOGIN)}
          >
            Log in
            {
              users.loading.includes(LOGIN) &&
                <ButtonLoader/>
            }
          </Button>
        </Box>

        <Typography sx={theme => ({
          fontSize: '14px',
          lineHeight: '20px',
          color: theme.palette.custom.grey['3'],
          textAlign: 'center',
        })}>
          Don't have an account? &nbsp;
          <Box component={Link} to="/sign-up" sx={theme => ({
            fontWeight: 500,
            color: theme.palette.primary.main,
            cursor: 'pointer',
          })}>Sign up</Box>
        </Typography>
      </Box>
    </LoginWrapper>
  )
}