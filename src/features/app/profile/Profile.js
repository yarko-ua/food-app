import { useCallback, useEffect, useState, useMemo, useContext } from 'react'
import { Box, Button, Container, Divider, Grid, IconButton, Modal } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getUserFullInfo, testAction, updateEmail, updatePassword, updateProfilePhoto } from './profileSlice'
// import { ProfileForm } from 'components/forms/profileForm/ProfileForm'
import { CoverImg } from 'components/coverImg/CoverImg'
import { Close, Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { FileUploader } from '../fileUploader/FileUploader'
import { userSelector } from 'selectors/user'
import { filesSelector } from 'selectors/files'
import { ModalContext } from 'features/modal/Modal'
// import { filesSelector, userSelector } from 'selectors/user'
import ProfileInfo from 'components/forms/profileInfo/ProfileInfo'
import UpdateEmail from 'components/forms/updateEmail/UpdateEmail'
import UpdatePassword from 'components/forms/updatePassword/UpdatePassword'
import ReauthPassword from 'components/forms/reauthPassword/ReauthPassword'
import { reauthUser } from 'features/auth/authSlice'


const useStyles = makeStyles({
  editImgContainer: {
    position: 'relative'
  },
  editImgBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(-25%, 25%)'
  },
  closeModalBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: '50%',
    width: 30,
    height: 30,
    backgroundColor: 'rgba(200, 50, 50, 1)',
    transform: 'translate(50%, -50%)',

    '&:hover': {
      backgroundColor: 'rgba(240, 70, 70, 1)',
    },

    '& svg': {
      fill: '#FFFFFF'
    }
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
  const { reauth } = useSelector(state => state.auth)
  const styles = useStyles()

  const modal = useContext(ModalContext)

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
  
  const handleProfilePhotoUpdate = useCallback(
    () => {
      dispatch(updateProfilePhoto())
    },
    [dispatch]
  )

  const handleEditImg = useCallback(
    () => {
      // setEditProfileImg(true)
      modal.setContentRender(() => (
        <Grid container justifyContent="center">
          <Grid item xs='auto'>
            <FileUploader />
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Button disabled={files.filesCount < 1} onClick={handleProfilePhotoUpdate} variant="contained" color="primary">Update photo</Button>
          </Grid>
        </Grid>
      ))
      modal.setIsOpen(true)
    },
    [files, handleProfilePhotoUpdate, modal],
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

  const handleReauth = useCallback(
    ({password}) => {
      dispatch(reauthUser(
        {
          password,
          actionCreator: updateEmail,
          stateDataPath: 'user.tempData'
        }
      ))
    },
    [dispatch]
  )

  const modalRenderReauth = useCallback(
    () => <ReauthPassword handleSubmit={handleReauth} />,
    [handleReauth]
  )

  useEffect(() => {
    if (reauth) {
      modal.setContentRender(modalRenderReauth)
      modal.setIsOpen(true)
    }
  }, [reauth, modal, modalRenderReauth])

  useEffect(() => {
    dispatch(getUserFullInfo())
  }, [dispatch])

  useEffect(() => {
    setProfilePhoto(photoURL)
  }, [photoURL])

  return (
    // <Container disableGutters={true}>
      <Grid container>
        <Grid item container>
          <Grid item container xs={4} justifyContent="center" alignItems="center">
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
          <Grid item xs={5}>
            {/* <ProfileForm formik={formik} /> */}
            <ProfileInfo initialValues={initialValues} handleSubmit={handleInfoUpdate} />
            <Divider light />
            <UpdateEmail email={user.email} handleSubmit={handleEmailUpdate} />
            <Divider light />
            <UpdatePassword handleSubmit={handlePasswordUpdate} />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        {/* <Modal 
          open={editProfileImg}
          onClose={() => setEditProfileImg(false)}
        >
          <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#FFFFFF',
            padding: '15px 10px',
            borderRadius: '4.5px'
          }}>
            <IconButton onClick={() => setEditProfileImg(false)} className={styles.closeModalBtn}>
              <Close />
            </IconButton>
            <Grid container justifyContent="center">
              <Grid item xs='auto'>
                <FileUploader />
              </Grid>
              <Grid item container xs={12} justifyContent="center">
                <Button disabled={files.filesCount < 1} onClick={handleProfilePhotoUpdate} variant="contained" color="primary">Update photo</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal> */}
      </Grid>
    // </Container>
  )
}


export default Profile