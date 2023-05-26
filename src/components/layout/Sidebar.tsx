import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {useAppSelector} from "../../redux/hooks";
import {selectUsers} from "../../redux/selectors/users";
import {generateInitials} from "../../utils/helpers/common";
import {IUser} from "../../typescript/entities";
import {CommonTextField} from "../common/CommonTextField";
import React, {useContext, useEffect, useRef, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {navLinks} from "../../utils/configs/navConfig";
import {NavItem} from "../common/NavItem";
import {selectTasks} from "../../redux/selectors/tasks";
import ListIcon from '@mui/icons-material/List';
import {CenteredLoader} from "../common/CenteredLoader";
import AddIcon from '@mui/icons-material/Add';
import {Resizable, ResizeCallbackData} from "react-resizable";
import {CommonModal} from "../common/CommonModal";
import {AddTaskList} from "../pages/private/tasks/modals/AddTaskList";
import SettingsIcon from '@mui/icons-material/Settings';
import {Settings} from "../pages/private/settings/Settings";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useLocation} from "react-router";
import CloseIcon from '@mui/icons-material/Close';
import {ISidebarContext, SidebarContext} from "../../utils/contexts/SidebarContext";

export const defaultOpenSidebarWidth = 280
export const minOpenSidebarWidth = 250
export const maxOpenSidebarWidth = 400

export const sidebarTransitionDuration = 200

export const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const sidebarWrapperRef = useRef(null)

  const theme = useTheme()

  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const upSm = useMediaQuery(theme.breakpoints.up('sm'))

  const {open, setOpen} = useContext(SidebarContext) as ISidebarContext

  const [params, setParams] = useSearchParams()

  const user = useAppSelector(selectUsers).current as IUser

  const tasks = useAppSelector(selectTasks)

  const [searchInputValue, setSearchInputValue] = useState<string>('')

  const [sidebarWidth, setSidebarWidth] = useState<number | string>(defaultOpenSidebarWidth)

  const [addTaskList, setAddTaskList] = useState<boolean>(false)

  const [showSettings, setShowSettings] = useState<boolean>(false)

  useEffect(() => {
    setSearchInputValue(params.get('title') || '')
  }, [params])

  useEffect(() => {
    if (upMd) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [setOpen, upMd])

  useEffect(() => {
    if (upSm) {
      setSidebarWidth(defaultOpenSidebarWidth)
    } else {
      setSidebarWidth('100vw')
    }
  }, [upSm])

  const onResize = (
    event: React.SyntheticEvent<Element, Event>,
    {node, size, handle}: ResizeCallbackData
  ) => {
    setSidebarWidth(size.width)
  }

  const onSearch = (value: string) => {
    if (searchInputValue || location.pathname === '/tasks/search') {
      setParams({
        title: searchInputValue,
      })
    }

    if (searchInputValue && location.pathname !== '/tasks/search') {
      navigate({
        pathname: '/tasks/search',
        search: `?title=${searchInputValue}`,
      })
    }
  }

  const onNavLinkClick = () => {
    if (!upMd) {
      setOpen(false)
    }
  }

  const content = (
    <Box sx={theme => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: typeof sidebarWidth === 'string' ? sidebarWidth : `${sidebarWidth}px`,
      height: `100vh`,
      pt: upMd ? 8 : 4,
      px: upMd ? 4 : 3,
      pb: upMd ? 4 : 3,
      background: theme.palette.custom.basicBg,
    })}>
      {
        open &&
          <>
              <Box>
                {
                  !upMd &&
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      mb: 3,
                    }}>
                        <IconButton onClick={() => setOpen(false)} sx={{
                          p: 0,
                        }}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                }

                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                  }}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                          <Avatar
                              src={user.avatar || undefined}
                              sx={theme => ({
                                width: 32,
                                height: 32,
                                mr: 2,
                                background: theme.palette.primary.main,
                                fontSize: 14,
                              })}
                          >
                            {
                              !user.avatar &&
                              generateInitials(user.full_name)
                            }
                          </Avatar>

                          <Box>
                              <Typography variant="h5" sx={{
                                fontSize: '14px',
                                lineHeight: '20px',
                                fontWeight: 500,
                              }}>{user.full_name}</Typography>
                              <Typography variant="body2" sx={theme => ({
                                fontSize: '12px',
                                lineHeight: '16px',
                                color: theme.palette.custom.grey['4'],
                              })}>{user.email}</Typography>
                          </Box>
                      </Box>

                      <IconButton onClick={() => setShowSettings(true)} sx={{
                        p: !upMd ? 0 : undefined,
                      }}>
                          <SettingsIcon/>
                      </IconButton>
                  </Box>

                  <CommonTextField
                      value={searchInputValue}
                      onChange={e => setSearchInputValue(e.currentTarget.value)}
                      onBlur={() => onSearch(searchInputValue)}
                      onKeyDown={e => e.key === 'Enter' && onSearch(searchInputValue)}
                      placeholder="Search"
                      noLabel={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={theme => ({
                              color: theme.palette.primary.main,
                            })}/>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        width: '100%',
                        mb: 4,
                      }}
                  />

                  <Box component="ul" sx={{
                    marginBlockStart: 0,
                    marginBlockEnd: 0,
                    paddingInlineStart: 0,
                  }}>
                    {
                      navLinks.map(link => (
                        <Box component="li" key={link.to} sx={{
                          listStyle: 'none',
                        }}>
                          <NavItem link={link} onClick={onNavLinkClick}/>
                        </Box>
                      ))
                    }

                      <Divider sx={{
                        my: 2,
                      }}/>

                    {
                      tasks.lists ?
                        tasks.lists.map(task => {
                          const link = {
                            to: `/tasks/lists/${task.id}`,
                            label: task.name,
                            Icon: <ListIcon sx={theme => ({
                              color: theme.palette.custom.navTaskListIconColor,
                            })}/>,
                          }

                          return (
                            <Box component="li" key={task.name} sx={{
                              listStyle: 'none',
                            }}>
                              <NavItem link={link} onClick={onNavLinkClick}/>
                            </Box>
                          )
                        }) :

                        <CenteredLoader size={25}/>
                    }
                  </Box>
              </Box>

              <Button
                  onClick={() => setAddTaskList(true)}
                  variant="text"
                  sx={theme => ({
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    '&, & *': {
                      color: theme.palette.primary.main,
                    },
                  })}
              >
                  <AddIcon sx={{
                    mr: 2,
                  }}/>

                  New List
              </Button>
          </>
      }
    </Box>
  )

  return (
    <>
      <Box
        component="aside"
        sx={theme => ({
          position: !upSm && open ? 'fixed' : 'relative',
          flexShrink: 0,
          width: !upSm && open ? '100%' : undefined,
          zIndex: 2,
        })}
      >
        {
          !upMd ?
            <Box sx={{
              position: 'relative',
            }}>
              <Box
                ref={sidebarWrapperRef}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: open ? 0 : `-${typeof sidebarWidth === 'string' ? sidebarWidth : `${sidebarWidth}px`}`,
                  zIndex: 2,
                  transition: `${sidebarTransitionDuration}ms`,
                }}
              >
                {content}
              </Box>
              <Box
                onClick={e => {
                  setOpen(false)
                }}
                sx={{
                  display: !open ? 'none' : undefined,
                  content: "''",
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: '#0008',
                  zIndex: -1,
                }}
              />
            </Box> :
            <Resizable
              width={sidebarWidth as number}
              onResize={onResize}
              axis="x"
              resizeHandles={['e']}
              minConstraints={[minOpenSidebarWidth, 0]}
              maxConstraints={[maxOpenSidebarWidth, 0]}
              handle={(
                <Box sx={{
                  display: !upMd ? 'none' : undefined,
                  position: 'absolute',
                  top: 0,
                  right: '-5px',
                  width: '10px',
                  height: '100%',
                  cursor: 'ew-resize',
                }}></Box>
              )}
            >
              {content}
            </Resizable>
        }
      </Box>

      <CommonModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
      >
        <Settings onClose={() => setShowSettings(false)}/>
      </CommonModal>

      <CommonModal
        open={addTaskList}
        onClose={() => setAddTaskList(false)}
      >
        <AddTaskList onClose={() => setAddTaskList(false)}/>
      </CommonModal>
    </>
  )
}