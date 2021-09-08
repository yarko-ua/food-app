import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BackToPrevious } from '../../../components/backTo/BackTo'
import { userPublicSelector } from '../../../selectors'
import { clearCurrentUser, getUserFullInfo } from './profileSlice'

export const ProfilePublic = (props) => {
  const dispatch = useDispatch()
  const { userID = null } = props.match.params

  const user = useSelector(userPublicSelector)

  console.log(`userID`, userID)

  useEffect(() => {
    dispatch(getUserFullInfo(userID))
    return () => {
      dispatch(clearCurrentUser())
    }
  }, [dispatch, userID])


  return <>
    <BackToPrevious />
    <div style={{width: '100%'}}>
      Public Profile for User ID: {userID}
    </div>
    <br/>
    <div>
      User Name : <b>{user.firstName}</b>
    </div>
  </>
}