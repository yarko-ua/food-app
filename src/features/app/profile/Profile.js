import { useEffect } from 'react'
import { Container } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getUserFullInfo } from '../../auth/authSlice'


export const Profile = props => {

  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.userData)
  console.log(`userData`, userData)

  useEffect(() => {
    dispatch(getUserFullInfo())
    console.log(`mount`)
  }, [])

  return (
    <Container>
      <span>{userData.displayName}</span>
    </Container>
  )
}