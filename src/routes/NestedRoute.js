import { Route } from "react-router-dom"
import PropTypes from "prop-types"
import PrivateRoute from "./PrivateRoute"

const NestedRoute = ({ isPrivate, component: Component, routes, ...props }) => {
	if (isPrivate) {
		return routes ? (
			<PrivateRoute {...props}>
				<Component routes={routes} />
			</PrivateRoute>
		) : (
			<PrivateRoute {...props} component={Component} />
		)
	}

	return routes ? (
		<Route {...props}>
			<Component routes={routes} />
		</Route>
	) : (
		<Route {...props} component={Component} />
	)
}

NestedRoute.propTypes = {
	isPrivate: PropTypes.bool,
	component: PropTypes.elementType.isRequired,
	routes: PropTypes.arrayOf(PropTypes.object),
}

NestedRoute.defaultProps = {
	isPrivate: false,
	routes: null,
}

export default NestedRoute
