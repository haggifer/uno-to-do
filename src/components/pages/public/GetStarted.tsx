import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material";
import logo from 'assets/images/logo-with-text.png'
import welcomePrint from 'assets/images/welcome-print.png'
import {useNavigate} from "react-router-dom";

export const GetStarted = () => {
  const navigate = useNavigate()

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const onStart = () => {
    navigate('/sign-up')
  }

  return (
    <Box sx={theme => ({
      display: 'flex',
      height: '100vh',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
      },
    })}>
      <Box sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '450px',
        p: '120px 60px',
        [theme.breakpoints.down('lg')]: {
          width: '375px',
          px: '30px',
        },
        [theme.breakpoints.down('md')]: {
          width: 'unset',
          flexShrink: 0,
          p: '40px 30px 60px',
        },
        [theme.breakpoints.down('sm')]: {
          alignItems: 'center',
          pt: '20px',
        },
      })}>
        {
          !isMobile &&
            <Box
                component="img"
                src={logo}
                sx={{
                  height: '30px',
                  objectFit: 'contain',
                }}
            />
        }

        <Box sx={theme => ({
          my: '100px',
          [theme.breakpoints.down('md')]: {
            my: '40px',
          },
          [theme.breakpoints.down('sm')]: {
            mt: 0,
            mb: '80px',
          },
        })}>
          <Typography variant="h2" sx={theme => ({
            mb: '16px',
            fontSize: '57px',
            lineHeight: '64px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '36px',
              lineHeight: '44px',
              textAlign: 'center',
            },
          })}>
            Welcome to
            {isMobile ? <br/> : ' '}
            Uno To Do!
          </Typography>
          <Typography variant="subtitle1" sx={theme => ({
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 500,
            color: 'blue',
            [theme.breakpoints.down('md')]: {
              fontSize: '20px',
              lineHeight: '30px',
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: '16px',
              lineHeight: '24px',
              textAlign: 'center',
            },
          })}>Start using the best to-do app
            {!isMobile && `, you can create and manage your To Do lists to improve your organization.`}</Typography>
        </Box>

        <Button
          onClick={onStart}
          variant="contained"
          sx={{
            width: '100%',
          }}
        >Get Started</Button>
      </Box>
      <Box sx={theme => ({
        flexGrow: 1,
        p: '60px 90px',
        [theme.breakpoints.up('sm')]: {
          background: 'rgba(89, 70, 210, 0.08)',
        },
        [theme.breakpoints.down('md')]: {
          p: '30px',
        },
        [theme.breakpoints.down('sm')]: {
          p: '30px 20px 20px',
        },
      })}>
        <Box
          sx={theme => ({
            backgroundImage: `url(${welcomePrint})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            [theme.breakpoints.up('md')]: {
              width: 'calc(100% / 862 * 800)',
              height: '100%',
              maxWidth: '100%',
            },
            [theme.breakpoints.down('md')]: {
              width: '100%',
              height: '100%',
              maxHeight: '100%',
            },
          })}
        />
      </Box>
    </Box>
  )
}