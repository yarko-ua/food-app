import { IconButton, makeStyles, MenuItem, MenuList } from "@material-ui/core"
import { AccountCircle, Dashboard, PeopleAltRounded, Settings, ViewList } from "@material-ui/icons"
import { Link, NavLink } from 'react-router-dom'


const Menu = ({uid}) => {
  return ( <MenuList>
    <NavLink to={`/app/${uid}/profile`}>

      <MenuItem>

        <IconButton>
          <AccountCircle/>
        </IconButton>

        Profile

      </MenuItem>
    </NavLink>

      <NavLink to={`/app/${uid}/list`}>
    <MenuItem>

        <IconButton>
          <ViewList/>
        </IconButton>

        My List

    </MenuItem>
      </NavLink>
      <NavLink to={`/app/${uid}/friends`}>
    <MenuItem>

        <IconButton>
          <PeopleAltRounded/>
        </IconButton>

        Friends

    </MenuItem>
      </NavLink>
      <NavLink to={`/app/${uid}/recommendations`}>
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