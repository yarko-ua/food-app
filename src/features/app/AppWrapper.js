import loadable from '@loadable/component'
import { useState, useEffect, useRef, Suspense } from 'react'
import {Grid, makeStyles, useMediaQuery } from "@material-ui/core"
import { useSelector } from "react-redux"
import Header from "components/header/Header"
import { Link, Switch, Route, Redirect  } from 'react-router-dom'
import Menu from "components/menu/Menu"
import { UserLists } from "./userLists/UserLists"
// import { Profile } from "./profile/Profile"
// import { UserList } from "./userList/UserList"
// import { Friends } from './friends/Friends'
import { authDataSelector } from 'selectors/auth'
import { routeComponent, ROUTES } from 'routes/routes'
import { ComponentsPath, lazyRouteComponent } from 'routes/lazy'
// import { ListHandler } from "./listHandler/ListHandler"

// const MyLists = loadable(() => import('./userLists/UserLists'))

const useAppStyles =  makeStyles({
  root: {
    // height: '100%'
  },
})


export const AppWrapper = ({match, ...props}) => {
  const isMobile = useMediaQuery('(max-width: 960px)')
  const appStyles = useAppStyles()
  const menuWrapper = useRef()

  const { uid } = useSelector(authDataSelector);
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
              exact path={ROUTES.LISTS}
              component={ routeComponent( ROUTES.LISTS ) }
            />
            <Route 
              exact path={ROUTES.PROFILE}
              component={ routeComponent( ROUTES.PROFILE ) }
            />
            
            <Route 
              exact path={ROUTES.PRODUCTS_LISTS}
              component={ routeComponent( ROUTES.PRODUCTS_LISTS ) }
            />
            <Route 
              exact path={ROUTES.FRIENDS}
              component={ routeComponent( ROUTES.FRIENDS ) }
            />
            <Route
              exact path={ROUTES.RECOMMENDATIONS}
              render={props => <> recommendations </>}
            />
            <Route exact path={ROUTES.SETTINGS}
              render={props => <> settings </>}
            />

            <Redirect to={ROUTES.LISTS} />
        </Switch>
        {/* <FileUploader />
        <MyList  /> */}
      </Grid>
      
      {/* <ListHandler /> */}
    </Grid>
  )
}