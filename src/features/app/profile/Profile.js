import { Suspense, useCallback, useEffect, useState } from 'react'
import { Button, Container, Grid, IconButton, Modal } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getUserFullInfo, updateProfilePhoto } from './profileSlice'
import { ProfileForm } from 'components/forms/profileForm/ProfileForm'
import { useFormik } from 'formik'
import { profileFormValidation } from 'validation/profile'
import avatarDefault from 'images/avatar-default.png'
import { CoverImg } from 'components/coverImg/CoverImg'
import { Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { FileUploader } from '../fileUploader/FileUploader'
import { userSelector } from 'selectors/user'
import { filesSelector } from 'selectors/files'
// import { filesSelector, userSelector } from 'selectors/user'

import { lazy } from 'react'


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


const Profile = props => {

  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  const { photoURL } = user
  const files = useSelector(filesSelector)
  const [changeProfileImg, setChangeProfileImg] = useState(false)
  const [editProfileImg, setEditProfileImg] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(photoURL)
  const styles = useStyles()

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
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

  useEffect(() => {
    setProfilePhoto(photoURL)
  }, [photoURL])

  const handleHover = useCallback(
    () => {
      setChangeProfileImg(prev => !prev)
    },
    [],
  )

  const handleEditImg = useCallback(
    () => {
      setEditProfileImg(true)
    },
    [],
  ) 

  const handleProfilePhotoUpdate = useCallback(
    () => {
      dispatch(updateProfilePhoto())
    },
    [],
  ) 

  return (
    // <Container disableGutters={true}>
      <Grid container>
        <Grid item container>
          <Grid item container xs={3} justifyContent="center" alignItems="center">
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
                src={ profilePhoto } 
                alt="user profile" 
                rounded={10} 
                innerGap={15}
                outerGap={`0 10px 0 0`}
              />
            </div>

            <Container>
              <h5>Private files: </h5>

              <div>

              </div>
            </Container>
            
          </Grid>
          <Grid item xs></Grid>
          <Grid item xs={4}>
            <ProfileForm formik={formik} />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Modal 
          open={editProfileImg}
          onClose={() => setEditProfileImg(false)}
        >
          <Grid container justifyContent="center" alignItems="center">
            <FileUploader />
            <Button disabled={files.filesCount < 1} onClick={handleProfilePhotoUpdate} variant="contained" color="primary">Update photo</Button>
          </Grid>
        </Modal>
      </Grid>
    // </Container>
  )
}


export default Profile