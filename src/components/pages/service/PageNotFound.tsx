import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../redux/hooks";
import {selectUsers} from "../../../redux/selectors/users";
import {Box, Button, Typography} from "@mui/material";

export const PageNotFound = () => {
  const navigate = useNavigate()

  const users = useAppSelector(selectUsers)

  const goToPrevPage = () => {
    navigate(-1)
  }

  const goToDefault = () => {
    navigate('/')
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
    }}>
      <Typography sx={theme => ({
        fontSize: '150px',
        lineHeight: 1,
        fontWeight: 300,
        color: theme.palette.error.light,
        opacity: 0.6,
      })}>404</Typography>
      <Typography sx={theme => ({
        mb: 4,
        fontSize: '35px',
        lineHeight: 1,
        opacity: 0.6,
        color: theme.palette.error.light,
      })}>Page not found!</Typography>

      <Box sx={{
        display: 'flex',
        '& > *:not(:last-of-type)': {
          mr: 2,
        },
      }}>
        <Button onClick={goToPrevPage} variant="outlined">Back to previous page</Button>
        <Button onClick={goToDefault} variant="outlined">Back to {users.token ? 'home' : 'login'}</Button>
      </Box>
    </Box>
  )
}