import { Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../../routes/routes'
import { friendsSelector } from '../../../selectors'
import { getFriends, getSuggestedPeople } from './friendsSlice'

export const Friends = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  console.log(`history`, history)

  const friendsList = useSelector(friendsSelector)
  const suggestions = useSelector(st => st.friends.suggestion)
  const [friends, setFriends] = useState(friendsList)
  const [recommendations, setRecommendations] = useState(suggestions)

  console.log(`friendsList`, friendsList)
  console.log(`friends`, friends)

  useEffect(() => {
    dispatch(getFriends())
    setFriends(friendsList)
    // setRecommendations(suggestions)
  }, [dispatch])

  useEffect(() => {
    setRecommendations(suggestions)
  }, [suggestions])

  // useEffect(()=>{
  //   dispatch(getSuggestedPeople())
  // }, [dispatch])


  return <> 
    Friends
    <Grid container>
      <Grid item xs>
      <ul>
        {
          friends && 
          friends.map(friend => (
            <li>
              {friend.firstName}
            </li>
          ))
        }
        { !friends || friends.length < 1 && 'You have no friends :c'}
      </ul>
      </Grid>
      <Grid item xs>
        You can know them: 
        <ul>
          { 
            recommendations && 
            recommendations.length > 0 && 
            recommendations.map(human => (
              <li key={human.id}>
                <Link to={{
                  pathname: `${routes.PROFILE}/${human.id}`,
                  state: {
                    from: history.location.pathname
                  }
                }}>
                  {human.firstName}
                </Link>
              </li>
            ))
          }
        </ul>
      </Grid>
    </Grid>
    
  </>
}