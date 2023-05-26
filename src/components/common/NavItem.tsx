import {INavLink} from "../../utils/configs/navConfig";
import {Box, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {MouseEventHandler} from "react";

interface IProps {
  link: INavLink,
  onClick?: MouseEventHandler<HTMLAnchorElement>,
}

export const NavItem = ({link, onClick}: IProps) => {
  return (
    <Box
      component={NavLink}
      to={link.to}
      end
      onClick={onClick}
      sx={theme => ({
        display: 'flex',
        alignItems: 'center',
        mb: 1,
        p: 2,
        textDecoration: 'none',

        '&.active': {
          background: theme.palette.custom.navItemActiveBg,
        },
      })}
    >
      {link.Icon}

      <Typography variant="body1" sx={theme => ({
        ml: 3,
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        color: theme.palette.text.primary,
      })}>{link.label}</Typography>

      <ArrowForwardIosIcon sx={theme => ({
        ml: 'auto',
        fontSize: '12px',
        color: theme.palette.custom.grey['4'],
      })}/>
    </Box>
  )
}