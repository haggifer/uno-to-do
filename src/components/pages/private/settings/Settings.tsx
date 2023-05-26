import {useAppDispatch, useAppSelector} from "redux/hooks";
import React, {useContext, useState} from "react";
import {useFormik} from "formik";
import * as yup from 'yup'
import {
  Avatar,
  Box,
  Button,
  Divider,
  PaletteMode,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {generateInitials} from "../../../../utils/helpers/common";
import {selectUsers} from "../../../../redux/selectors/users";
import {IUser} from "../../../../typescript/entities";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import {Theme} from "@mui/material/styles";
import {getFromLS, setToLS} from "../../../../utils/helpers/localStorage";
import {IThemeModeContext, ThemeModeContext} from "../../../../utils/contexts/ThemeModeContext";
import CloseIcon from '@mui/icons-material/Close';
import {logout} from "../../../../redux/features/users/usersSlice";
import {useNavigate} from "react-router-dom";
import {getDefaultPublicPath} from "../../../../routing/routes/publicRoutes";
import {CommonModal} from "../../../common/CommonModal";
import {UserSettings} from "./UserSettings";

interface IProps {
  onClose: () => void,
}

interface IFormValues {
  mode: PaletteMode | '',
}

const toggleButtonSx = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  ml: '0 !important',
  border: `1px solid ${theme.palette.custom.grey['4']} !important`,
  borderRadius: '10px !important',
  p: '7px 15px 7px 10px',
  background: 'transparent',
  color: theme.palette.custom.settingsToggleButtonColor,
  textTransform: 'unset',
  '&.Mui-selected': {
    borderColor: `${theme.palette.custom.settingsToggleButtonActiveBg} !important`,
    background: theme.palette.custom.settingsToggleButtonActiveBg,
    color: theme.palette.custom.settingsToggleButtonActiveColor,
  },
  '&:not(:last-of-type)': {
    mr: 1,
  },
  '& > *:first-of-type': {
    mr: 2,
    fontSize: '20px',
    color: theme.palette.primary.main,
  },
  '& > *:last-of-type': {
    fontSize: '16px',
    lineHeight: '22px',
  },
})

export const Settings = ({onClose}: IProps) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const user = useAppSelector(selectUsers).current as IUser

  const themeMode = useContext(ThemeModeContext) as IThemeModeContext

  const [initValues] = useState<IFormValues>({
    mode: getFromLS('themeMode') as PaletteMode | null || '',
  })

  const [showUserSettings, setShowUserSettings] = useState<boolean>(false)

  const validationSchema = yup.object({})

  const processSubmit = async () => {

  }

  const onThemeChange = (value: PaletteMode) => {
    if (!value) {
      return
    }

    setFieldValue('mode', value)

    themeMode?.switchMode(value)

    setToLS('themeMode', value)
  }

  const onLogout = () => {
    dispatch(logout())

    navigate(getDefaultPublicPath(true))
  }

  const {
    values,
    handleSubmit,
    setFieldValue,
  } =
    useFormik({
      validationSchema: validationSchema,
      onSubmit: processSubmit,
      initialValues: initValues,
      enableReinitialize: true,
    });

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={theme => ({
          width: upMd ? '400px' : undefined,
          maxWidth: '100%',
          '& > *': {
            width: '100%',
          }
        })}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <Typography variant="h3" sx={{
            fontSize: '24px',
            lineHeight: '24px',
          }}>Settings</Typography>

          <CloseIcon onClick={onClose} sx={theme => ({
            fontSize: '24px',
            color: theme.palette.custom.grey['4'],
            cursor: 'pointer',
          })}/>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
        }}>
          <Avatar
            src={user.avatar || undefined}
            sx={theme => ({
              width: 60,
              height: 60,
              mb: 3,
              background: theme.palette.primary.main,
              fontSize: '22px',
              lineHeight: '28px',
            })}
          >
            {
              !user.avatar &&
              generateInitials(user.full_name)
            }
          </Avatar>

          <Typography variant="h5" sx={{
            fontSize: '22px',
            lineHeight: '28px',
            fontWeight: 500,
          }}>{user.full_name}</Typography>
          <Typography variant="body2" sx={theme => ({
            mb: 3,
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
            color: theme.palette.custom.grey['4'],
          })}>{user.email}</Typography>

          <Button
            onClick={() => setShowUserSettings(true)}
            variant="text"
            sx={{
              mb: 1,
            }}
          >User Settings</Button>

          <Button
            onClick={onLogout}
            variant="text"
            color="error"
          >Sign Out</Button>
        </Box>

        <Divider sx={{
          mb: 2,
        }}/>

        <Box>
          <Typography sx={theme => ({
            mb: 2,
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: 500,
            color: theme.palette.primary.main,
          })}>General</Typography>

          <Typography sx={theme => ({
            mb: 1,
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
          })}>Mode</Typography>

          <ToggleButtonGroup
            value={values.mode}
            onChange={(e, value) => onThemeChange(value)}
            exclusive
            sx={theme => ({
              mb: 2,
            })}
          >
            <ToggleButton value="light" sx={theme => ({
              ...toggleButtonSx(theme),
            })}>
              <WbSunnyIcon/>
              Light
            </ToggleButton>
            <ToggleButton value="dark" sx={theme => ({
              ...toggleButtonSx(theme),
            })}>
              <NightlightRoundIcon/>
              Dark
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider sx={{
          mb: 2,
        }}/>

        <Box>
          <Typography sx={theme => ({
            mb: 2,
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: 500,
            color: theme.palette.primary.main,
          })}>About</Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Typography sx={{
            mr: 3,
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: 500,
          }}>Version</Typography>
          <Typography sx={theme => ({
            mr: 3,
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: 500,
            color: 'primary.main',
          })}>1.0</Typography>
        </Box>
      </Box>

      <CommonModal
        open={showUserSettings}
        onClose={() => setShowUserSettings(false)}
      >
        <UserSettings onClose={() => setShowUserSettings(false)}/>
      </CommonModal>
    </>
  )
}