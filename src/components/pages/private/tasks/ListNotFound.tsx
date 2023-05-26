import {useNavigate} from "react-router-dom";
import {Box, Button, darken, Typography} from "@mui/material";
import {useAppSelector} from "../../../../redux/hooks";
import {selectUsers} from "../../../../redux/selectors/users";

export const ListNotFound = () => {
  const navigate = useNavigate()

  const users = useAppSelector(selectUsers)

  const goToPrevPage = () => {
    navigate(-1)
  }

  const goToDefault = () => {
    navigate('/')
  }

  return (
    <Box sx={theme => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      background: theme.palette.custom.tasksBg,
    })}>
      <Typography sx={theme => ({
        mb: 4,
        fontSize: '35px',
        lineHeight: 1,
        color: theme.palette.custom.contrastTextColor,
      })}>Task list not found</Typography>

      <Box sx={{
        display: 'flex',
        '& > *:not(:last-of-type)': {
          mr: 2,
        },
      }}>
        <Button onClick={goToPrevPage} variant="outlined" sx={theme => ({
          color: theme.palette.custom.contrastTextColor,
          borderColor: theme.palette.custom.contrastTextColor,
          '&:hover': {
            borderColor: darken(theme.palette.custom.contrastTextColor, 0.2),
          }
        })}>Back to previous page</Button>
        <Button onClick={goToDefault} variant="outlined" sx={theme => ({
          color: theme.palette.custom.contrastTextColor,
          borderColor: theme.palette.custom.contrastTextColor,
          '&:hover': {
            borderColor: darken(theme.palette.custom.contrastTextColor, 0.2),
          }
        })}>Back to {users.token ? 'home' : 'login'}</Button>
      </Box>
    </Box>
  )
}