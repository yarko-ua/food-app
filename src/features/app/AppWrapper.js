import { useState, useEffect, useRef } from 'react'
import {Grid, makeStyles, useMediaQuery } from "@material-ui/core"
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
})


export const AppWrapper = ({match, ...props}) => {
  const isMobile = useMediaQuery('(max-width: 960px)')
  const appStyles = useAppStyles()
  const menuWrapper = useRef()

  const uid = useSelector(state => state.auth.data.uid);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 960)

  const [widthCover, setWidthCover] = useState(0)
  const [offsetLeft, setOffsetLeft] = useState(0)

  useEffect(() => {
    console.log(`11`, 11)
    if (menuWrapper.current) {
      setWidthCover(menuWrapper.current.clientWidth);
      setOffsetLeft(menuWrapper.current.offsetLeft)
    }
  }, [isMobile])

  console.log(`match`, match)

  return (
    <Grid container className={appStyles.root} color="inherit" spacing={isMobile ? 2 : 3} >

      <Grid item xs="auto" ref={menuWrapper} >
        <Menu isMobile={isMobile} widthCover={widthCover} offsetLeft={offsetLeft} />
      </Grid>
      <Grid item xs={9} sm={11} md >
        <Header />
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