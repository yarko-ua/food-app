import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom'

export const Product = props => {
  return (
    <>
      <h1>Product</h1>
      <Link to={props.history.location.state} >
        <ArrowBackIcon/>
      </Link>
    </>
  )
}
