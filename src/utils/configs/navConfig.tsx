import StarIcon from '@mui/icons-material/Star';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';

export interface INavLink {
  to: string,
  label: string,
  Icon: JSX.Element,
}

export const navLinks: INavLink[] = [
  {
    to: '/tasks/important',
    label: 'Important',
    Icon: <StarIcon sx={theme => ({
      color: theme.palette.custom.red,
    })}/>,
  },
  {
    to: '/tasks',
    label: 'Tasks',
    Icon: <HouseSidingIcon sx={theme => ({
      color: theme.palette.primary.main,
    })}/>,
  },
]