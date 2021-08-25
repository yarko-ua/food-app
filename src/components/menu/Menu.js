import { IconButton, makeStyles, MenuItem, MenuList } from "@material-ui/core"
import { AccountCircle, Dashboard, PeopleAltRounded, Settings, ViewList } from "@material-ui/icons"
import { useSelector } from "react-redux"
import { Link, NavLink } from 'react-router-dom'


const Menu = ({uid}) => {

  const photoURL = useSelector(state => state.user.userData.photoURL)

  return ( <MenuList>
    <NavLink to={`/app/${uid}/profile`}>

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
      <Link to={`/app/settings`}>
    <MenuItem>

        <IconButton>
          <Settings/>
        </IconButton>

        Settings

    </MenuItem>
      </Link>
  </MenuList>)
}

export default Menu;