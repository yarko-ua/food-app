import { IconButton } from "@material-ui/core"
import { Edit } from "@material-ui/icons"
import { useCallback } from "react"
import { useHistory, useLocation } from "react-router-dom"
import PropTypes from "prop-types"

const UrlSearchParamToggler = ({ param, value, icon: Icon }) => {
	const { search } = useLocation()
	const history = useHistory()

	const toggler = useCallback(() => {
		const URLSearch = new URLSearchParams(search)

		if (!search || !URLSearch.has(param)) {
			URLSearch.append(param, value)

			history.replace({
				search: URLSearch.toString(),
			})
		} else {
			URLSearch.delete(param)

			history.replace({
				search: URLSearch.toString(),
			})
		}
	}, [history, search, param, value])

	return <IconButton onClick={toggler}>{Icon ? <Icon /> : <Edit />}</IconButton>
}

UrlSearchParamToggler.propTypes = {
	param: PropTypes.string.isRequired,
	value: PropTypes.string,
	icon: PropTypes.elementType,
}

UrlSearchParamToggler.defaultProps = {
	value: "",
	icon: null,
}

export default UrlSearchParamToggler
