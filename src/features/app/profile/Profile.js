import { useCallback, useEffect, useState } from 'react'
import { Button, Container, Grid, IconButton } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getUserFullInfo } from '../../auth/authSlice'
import { ProfileForm } from '../../../components/forms/profileForm/ProfileForm'
import { useFormik } from 'formik'
import { profileFormValidation } from '../../../validation/profile'
import avatarDefault from '../../../images/avatar-default.png'
import { CoverImg } from '../../../components/coverImg/CoverImg'
import { Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  editImgContainer: {
    position: 'relative'
  },
  editImgBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(-25%, 25%)'
  }
})


export const Profile = props => {

  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.data)
  const [changeProfileImg, setChangeProfileImg] = useState(false)
  const styles = useStyles()

  const formik = useFormik({
    initialValues: {
      firstName: userData.displayName,
      lastName: '',
      email: '',
      address: '',
      photoURL: ''
    },
    validationSchema: profileFormValidation,
    onSubmit: async values => {
      console.log(`values`, values)
    }
  })

  useEffect(() => {
    dispatch(getUserFullInfo())
  }, [dispatch])

  const handleHover = useCallback(
    () => {
      setChangeProfileImg(prev => !prev)
    },
    [],
  )

  const handleEditImg = useCallback(
    () => {
      alert('ok')
    },
    [],
  ) 

  return (
    <Container disableGutters={true}>
      <Grid container>
        <Grid item container>
          <Grid item container xs justifyContent="center" alignItems="center">
            {/* <img src={userData.photoURL ||avatarDefault } alt="user profile" /> */}
            <div 
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              className={styles.editImgContainer}
              // onMouseLeave={handleHover}
            >
              { changeProfileImg && <IconButton 
                size="small" 
                color="primary"
                className={styles.editImgBtn}
                onClick={handleEditImg}
                >
                  <Edit />
                </IconButton> 
              }
              <CoverImg
                cover
                src={ userData.photoURL } 
                alt="user profile" 
                rounded={10} 
                innerGap={15}
                outerGap={`0 10px 0 0`}
              />
            </div>
            
          </Grid>
          <Grid item xs>
            <ProfileForm formik={formik} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}