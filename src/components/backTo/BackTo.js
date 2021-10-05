import { Link, useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export const BackToPrevious = () => {
  const history = useHistory()
  console.log(`history`, history)
  return (
    <Link to={history.location.state?.from || '/' } >
          <ArrowBackIcon/>
    </Link>
  )
}