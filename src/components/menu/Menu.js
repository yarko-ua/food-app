import { IconButton, makeStyles, MenuItem, MenuList } from "@material-ui/core"
import { AccountCircle, Dashboard, PeopleAltRounded, Settings, ViewList } from "@material-ui/icons"
import { useSelector } from "react-redux"
import { Link, NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    '& a.active svg' : {
      fill: 'red'
    }
  }
})


const Menu = ({uid}) => {
  const styles = useStyles()
  const photoURL = useSelector(state => state.user.data.photoURL)

  return ( <MenuList className={styles.root}>
    <NavLink to={`/app/profile`}>

      <MenuItem>

        <IconButton>
          {
            photoURL ?
              <img src={photoURL} alt="avatar" />
              :
              <AccountCircle/>
          }
        </IconButton>

        Profile

      </MenuItem>
    </NavLink>

      <NavLink to={`/app/lists`}>
    <MenuItem>

        <IconButton>
          <ViewList/>
        </IconButton>

        My Lists

    </MenuItem>
      </NavLink>
      <NavLink to={`/app/friends`}>
    <MenuItem>

        <IconButton>
          <PeopleAltRounded/>
        </IconButton>

        Friends

    </MenuItem>
      </NavLink>
      <NavLink to={`/app/recommendations`}>
    <MenuItem>

        <IconButton>
          <Dashboard/>
        </IconButton>

        Recommendations

    </MenuItem>
      </NavLink>
      <NavLink to={`/app/settings`}>
    <MenuItem>

        <IconButton>
          <Settings/>
        </IconButton>

        Settings

    </MenuItem>
      </NavLink>
  </MenuList>)
}

export default Menu;