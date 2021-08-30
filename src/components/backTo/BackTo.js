import { withRouter, Link } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const BackTo = (props) => {
  return (
    <Link to={props.history.location.state || '/' } >
          <ArrowBackIcon/>
    </Link>
  )
}

export const BackToPrevious = withRouter(BackTo)