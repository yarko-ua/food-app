import { useState, useEffect, useRef, Suspense } from "react"
import PropTypes from "prop-types"
import { Grid, makeStyles, useMediaQuery } from "@material-ui/core"
import Header from "components/header/Header"
import { Switch, Redirect } from "react-router-dom"
import Menu from "components/menu/Menu"
import NestedRoute from "routes/NestedRoute"

const useAppStyles = makeStyles({
	root: {
		// height: '100%'
	},
})

const AppWrapper = ({ routes }) => {
	const isMobile = useMediaQuery("(max-width: 960px)")
	const appStyles = useAppStyles()
	const menuWrapper = useRef()

	const [widthCover, setWidthCover] = useState(0)
	const [offsetLeft, setOffsetLeft] = useState(0)

	useEffect(() => {
		if (menuWrapper.current) {
			setWidthCover(menuWrapper.current.clientWidth)
			setOffsetLeft(menuWrapper.current.offsetLeft)
		}

		return () => {
			console.log("unmount app")
		}
	}, [isMobile])

	return (
		<Grid
			container
			className={appStyles.root}
			color="inherit"
			spacing={isMobile ? 2 : 3}
		>
			<Grid item xs="auto" ref={menuWrapper}>
				<Menu
					isMobile={isMobile}
					widthCover={widthCover}
					offsetLeft={offsetLeft}
				/>
			</Grid>
			<Grid item xs={9} sm={11} md>
				<Header />
				<Suspense fallback={<>Loading ...</>}>
					<Switch>
						{routes &&
							routes.map((route) => (
								<NestedRoute key={route.path} {...route} />
							))}
						<Redirect to="/lists" />
					</Switch>
				</Suspense>
				{/* <FileUploader />
        <MyList  /> */}
			</Grid>

			{/* <ListHandler /> */}
		</Grid>
	)
}

AppWrapper.propTypes = {
	routes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default AppWrapper
