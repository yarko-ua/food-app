import { useSelector } from 'react-redux'
import { 
  Avatar, 
  CircularProgress, 
  IconButton, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemSecondaryAction, 
  ListItemText, 
  makeStyles
} from "@material-ui/core"
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    borderTop: '2px dashed grey'
  },
  li: {
    borderBottom: '1px solid black'
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})

const MyList = ({ list, linked, location, onRemove }) => {
  const styles = useStyles()
  const loading = useSelector(state => state.fbList.loading)

  if (loading)
    return <CircularProgress /> 

  return (
    <List className={styles.list}>
      {
        list.map( (listItem, i) => 
          <ListItem key={listItem.id || i} className={styles.li}>
              <ListItemAvatar>
                <Avatar>

                { 
                  linked && 
                  <Link 
                    to={ {
                      pathname: `/app/product/${listItem.productID}`,
                      state: location.pathname
                    } }
                  >   
                    {
                      listItem.thumb ? 
                        <img src={listItem.thumb} className={styles.img}  alt="" />
                        :
                        <InfoIcon />
                    }
          
                  </Link>
                }

                { !linked && <InfoIcon />}

                </Avatar>


              </ListItemAvatar>

              <ListItemText>
                {listItem.product}
              </ListItemText>

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={onRemove.bind(this, listItem.id)}>
                    <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
          </ListItem>
        )
        }
    </List>
  )
}

export default MyList