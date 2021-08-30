import {Grid, makeStyles } from "@material-ui/core"
import { useSelector } from "react-redux"
import Header from "../../components/header/Header"
import { Link, Switch, Route, Redirect  } from 'react-router-dom'
import Menu from "../../components/menu/Menu"
import { UserLists } from "./userLists/UserLists"
import { Profile } from "./profile/Profile"
import { UserList } from "./userList/UserList"
// import { ListHandler } from "./listHandler/ListHandler"


const useAppStyles =  makeStyles({
  root: {
    // height: '100%'
  },
  leftCol: {
    borderRight: '1px solid gray'
  }
})


export const AppWrapper = ({match, ...props}) => {
  const appStyles = useAppStyles();

  const uid = useSelector(state => state.user.data.uid);

  console.log(`match`, match)

  return (
    <Grid container className={appStyles.root} color="inherit" spacing={4}>

      <Grid item xs={2} className={appStyles.leftCol}>
        <Menu uid={uid} />
      </Grid>
      <Grid item xs={9}>
        <Switch>
            <Route 
              exact 
              path={`/profile`}
              component={Profile}
            />
            <Route 
              exact 
              path={`/lists`}
              component={UserLists}
            />
            <Route 
              exact 
              path={`/lists/:listID`}
              component={UserList}
            />
            <Route 
              exact 
              path={`/friends`} 
              render={props => <> Friends </>}
            />
            <Route 
              exact path={`/recommendations`}
              render={props => <> recommendations </>}
            />
            <Route exact path={`/settings`}
              render={props => <> settings </>}
            />

            <Redirect to={`/lists`}/>
        </Switch>
        {/* <FileUploader />
        <MyList  /> */}
      </Grid>
      
      {/* <ListHandler /> */}
    </Grid>
  )
}