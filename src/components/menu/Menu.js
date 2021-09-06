import { useRef } from 'react'
import { IconButton, makeStyles, MenuItem, MenuList, Typography } from "@material-ui/core"
import { AccountCircle, Dashboard, PeopleAltRounded, Settings, ViewList } from "@material-ui/icons"
import { useSelector } from "react-redux"
import { Link, NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  menu: {
    position: 'static',

    '& a.active svg' : {
      fill: 'blue'
    },

    '& a svg' : {
      fill: 'rgb(220, 220, 220)'
    },

    '&::before': {
      content: '""',
      width: props => props.width,
      height: '100%',
      position: 'absolute',
      top: 0,
      // left: 0,
      left: props => props.offsetLeft,
      background: props => props.width != 0 ? 'grey' : 'transparent'
    }
  }
})


const Menu = ({isMobile, widthCover, offsetLeft}) => {

  const styles = useStyles({offsetLeft: offsetLeft, width: widthCover})

  console.log(`styles`, styles)

  const photoURL = useSelector(state => state.user.data.photoURL)

  // useEffect(() => {
  //   if (ref.current)
  //   return () => {
  //     cleanup
  //   }
  // }, [input])


  return ( <MenuList className={styles.menu}>
    <NavLink to={`/profile`}>

      <MenuItem disableGutters={isMobile}>

        <IconButton size={isMobile ? 'small' : 'medium'}>
          {
            photoURL ?
              <img src={photoURL} alt="avatar" />
              :
              <AccountCircle/>
          }
        </IconButton>

        { !isMobile && <Typography noWrap> Profile</Typography> }

      </MenuItem>
    </NavLink>

      <NavLink to={`/lists`}>
    <MenuItem disableGutters={isMobile}>

        <IconButton size={isMobile ? 'small' : 'medium'}>
          <ViewList/>
        </IconButton>
        { !isMobile && <Typography noWrap> My Lists</Typography> }

    </MenuItem>
      </NavLink>
      <NavLink to={`/friends`}>
    <MenuItem disableGutters={isMobile}>

        <IconButton size={isMobile ? 'small' : 'medium'}>
          <PeopleAltRounded/>
        </IconButton>
        { !isMobile && <Typography noWrap> Friends</Typography> }

    </MenuItem>
      </NavLink>
      <NavLink to={`/recommendations`}>
    <MenuItem disableGutters={isMobile}>

        <IconButton size={isMobile ? 'small' : 'medium'}>
          <Dashboard/>
        </IconButton>
        { !isMobile && <Typography noWrap> Recommendations</Typography> }

    </MenuItem>
      </NavLink>
      <NavLink to={`/settings`}>
    <MenuItem disableGutters={isMobile}>

        <IconButton size={isMobile ? 'small' : 'medium'}>
          <Settings/>
        </IconButton>
        { !isMobile && <Typography noWrap> Settings</Typography> }

    </MenuItem>
      </NavLink>
  </MenuList>)
}

export default Menu;