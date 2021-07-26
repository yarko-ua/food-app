import { 
  Avatar, 
  IconButton, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemSecondaryAction, 
  ListItemText 
} from "@material-ui/core"
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const MyList = ({ list, linked, location }) => {
  return (
    <List>
      {
        list.map( (listItem, i) => 
          <ListItem key={listItem.id || i}>
              <ListItemAvatar>
                <Avatar>

                { 
                  linked && 
                  <Link 
                    to={ {
                      pathname: `/app/product/${listItem.id}`,
                      state: location.pathname
                    } }
                  >   
                    <InfoIcon />
                  </Link> 
                }

                { !linked && <InfoIcon />}

                </Avatar>


              </ListItemAvatar>

              <ListItemText>
                {listItem.text}
              </ListItemText>

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
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