import { Link, useLocation } from "react-router-dom"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

const BackToPrevious = () => {
	const { state } = useLocation()
	return (
		<Link to={state?.from || "/"}>
			<ArrowBackIcon />
		</Link>
	)
}

export default BackToPrevious
