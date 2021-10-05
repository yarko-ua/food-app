import { useCallback, useEffect, useState, useMemo } from 'react'
import { Button, Container, Divider, Grid, IconButton, Modal } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getUserFullInfo, updateEmail, updatePassword, updateProfilePhoto } from './profileSlice'
// import { ProfileForm } from 'components/forms/profileForm/ProfileForm'
import { CoverImg } from 'components/coverImg/CoverImg'
import { Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { FileUploader } from '../fileUploader/FileUploader'
import { userSelector } from 'selectors/user'
import { filesSelector } from 'selectors/files'
// import { filesSelector, userSelector } from 'selectors/user'
import ProfileInfo from 'components/forms/profileInfo/ProfileInfo'
import UpdateEmail from 'components/forms/updateEmail/UpdateEmail'
import UpdatePassword from 'components/forms/updatePassword/UpdatePassword'


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

  useEffect(() => {
    dispatch(getUserFullInfo())
  }, [dispatch])

  useEffect(() => {
    setProfilePhoto(photoURL)
  }, [photoURL])

  const initialValues = useMemo(() => {
    const { firstName, lastName, address, city } = user
    return {
      firstName,
      lastName,
      address,
      city,
    }
  }, [user])

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
    [dispatch],
  ) 

  const handleInfoUpdate = useCallback(
    () => {
      console.log('update profile info')
    },
    [],
  )
  const handleEmailUpdate = useCallback(
    (newEmail) => {
      console.log('update profile email')
      dispatch(updateEmail(newEmail))
    },
    [dispatch],
  )
  const handlePasswordUpdate = useCallback(
    ({password}) => {
      dispatch(updatePassword(password))
    },
    [dispatch],
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
            {/* <ProfileForm formik={formik} /> */}
            <ProfileInfo initialValues={initialValues} handleSubmit={handleInfoUpdate} />
            <Divider light />
            <UpdateEmail email={user.email} handleSubmit={handleEmailUpdate} />
            <Divider light />
            <UpdatePassword handleSubmit={handlePasswordUpdate} />
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