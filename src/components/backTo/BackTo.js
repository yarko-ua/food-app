import { Link, useHistory } from "react-router-dom"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

const BackToPrevious = () => {
	const history = useHistory()
	console.log(`btp history`, history)
	return (
		<Link to={history.location.state.from || "/"}>
			<ArrowBackIcon />
		</Link>
	)
}

export default BackToPrevious
