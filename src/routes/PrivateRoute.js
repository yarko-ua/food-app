import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import { isAuthSelector } from "selectors/auth"
import PropTypes from "prop-types"
import ROUTES from "./routes-path"

const PrivateRoute = ({ component: Component, children, ...props }) => {
	const isAuth = useSelector(isAuthSelector)

	return (
		<Route
			{...props}
			render={({ location, ...subprops }) =>
				isAuth ? (
					(Component && <Component {...subprops} />) || children
				) : (
					<Redirect
						to={{
							pathname: ROUTES.SIGN_IN,
							state: {
								from: location,
							},
						}}
					/>
				)
			}
		/>
	)
}

PrivateRoute.propTypes = {
	component: PropTypes.elementType,
	children: PropTypes.node,
	props: PropTypes.arrayOf(PropTypes.object),
}

PrivateRoute.defaultProps = {
	component: null,
	children: null,
	props: {},
}

export default PrivateRoute
