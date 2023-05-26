import React, {useState} from "react";
import {useFormik} from "formik";
import * as yup from 'yup'
import {useNavigate} from "react-router-dom";
import {Box, Button, Typography} from "@mui/material";
import {generateInputError} from "../../../utils/helpers/forms";
import {CommonTextField} from "../../common/CommonTextField";
import {LoginWrapper} from "./LoginWrapper";
import {popupSx} from "../../../utils/sxs";

interface IFormValues {
  email: string,
}

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [initValues] = useState<IFormValues>({
    email: '',
  })

  const validationSchema = yup.object({
    email: yup.string()
      .trim()
      .required(),
  })

  const onCancel = () => {
    navigate('/login')
  }

  const processSubmit = async () => {
    navigate('/login')
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
        }}>Forgot password</Typography>

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
          }}
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
            onClick={onCancel}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Get new password
          </Button>
        </Box>
      </Box>
    </LoginWrapper>
  )
}