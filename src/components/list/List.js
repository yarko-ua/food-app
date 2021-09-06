import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { 
  Avatar, 
  CircularProgress, 
  Grid, 
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
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
  list: {
    borderTop: '2px dashed grey'
  },
  li: {
    borderBottom: '1px solid black',

    '& h3': {
      margin: 0,
    },
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

const MyList = ({ list, type, linked, location, onRemove, path }) => {
  const styles = useStyles()
  const loading = useSelector(state => state.fbList.loading)

  if (loading)
    return <CircularProgress />

  if (!list || list.length < 1) {
    return <span></span>
  }

  return (
    <List className={styles.list}>
      {
        list.length > 0 && list.map( (listItem, i) => 
          <ListItem key={listItem.id || i} className={styles.li}>
              <ListItemAvatar>
                <Avatar>

                { 
                  linked && 
                  <Link 
                    to={ {
                      pathname: `${path}/${listItem.id}`,
                      state: {from:location.pathname}
                    } }
                  >   
                    {
                      listItem.thumb ? 
                        <img src={listItem.thumb} className={styles.img}  alt="" />
                        : listItem.name[0].toUpperCase()
                        // <InfoIcon />
                    }
          
                  </Link>
                }

                { !linked && <InfoIcon />}

                </Avatar>


              </ListItemAvatar>

              <ListItemText>
                <Grid container >
                  <Grid container item xs direction="column">
                    <Grid item xs>
                      <h3>{listItem.name}</h3>
                      { type === 'product' && <Rating value={+listItem.rating} readOnly size="small" /> }
                    </Grid>
                    <Grid item xs alignItems="center" container>
                      {
                        listItem.description && 
                        <p>{listItem.description}</p>
                      }
                    </Grid>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid container item xs justifyContent="flex-end" >
                  {/* <Grid item xs={3}> */}
                      Added: <br/> {listItem.createdAt && new Date(listItem.createdAt).toDateString()}
                    {/* </Grid> */}
                  </Grid>
                </Grid>
                
                
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

MyList.propTypes = {
  list: PropTypes.array.isRequired,
  linked: PropTypes.bool,
  path: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  type: PropTypes.string
}

MyList.defaultProps = {
  type: 'list',
  onRemove: () => {}
}

export default MyList