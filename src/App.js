import React, { Suspense } from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import { Box, Container, Paper, useMediaQuery } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import store from "store/store"
import Notification from "features/notification/Notification"
import ROUTER from "routes/router"
import NestedRoute from "routes/NestedRoute"
import AuthWrapper from "features/auth/AuthWrapper"
import "./App.css"
import ModalContainer from "features/modal/Modal"

const useStyles = makeStyles({
	root: {
		width: "100vw",
		height: "100vh",
		padding: (props) => (props.isMobile ? 25 : 50),
		boxSizing: "border-box",
		backgroundColor: "rgba(200, 200, 200, .7)",

		"& *": {
			boxSizing: "border-box",
		},

		"& > div:not(.Toastify)": {
			width: "100%",
			height: "100%",
			padding: (props) => (props.isMobile ? 10 : 20),
		},
	},
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		// height: '100%'
	},
	paper: {
		position: "relative",
	},
	version: {
		position: "fixed",
		top: 10,
		left: 10,
		margin: 0,
	},
})

const App = () => {
	const isMobile = useMediaQuery("(max-width: 960px)")
	const classes = useStyles({ isMobile })

	return (
		<BrowserRouter>
			<Provider store={store}>
				<Box component="main" className={classes.root}>
					<h6 className={classes.version}>
						App v.{process.env.REACT_APP_VERSION}{" "}
					</h6>
					<Paper elevation={5} className={classes.paper}>
						<ModalContainer>
							<AuthWrapper>
								<Container
									maxWidth={false}
									disableGutters
									className={classes.container}
								>
									<Suspense fallback={<>Loading ...</>}>
										<Switch>
											{ROUTER.map((route) => (
												<NestedRoute key={route.path} {...route} />
											))}
										</Switch>
									</Suspense>
								</Container>
							</AuthWrapper>
						</ModalContainer>
					</Paper>
					<Notification />
				</Box>
			</Provider>
		</BrowserRouter>
	)
}

export default App
