import { useCallback, useEffect, useState, useMemo, useContext } from 'react'
import { Button, Container, Divider, Grid, IconButton, Modal } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getUserFullInfo, testAction, updateEmail, updatePassword, updateProfilePhoto } from './profileSlice'
// import { ProfileForm } from 'components/forms/profileForm/ProfileForm'
import { CoverImg } from 'components/coverImg/CoverImg'
import { Edit } from '@material-ui/icons'
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
import { reauthUser, withdrawReauth } from 'features/auth/authSlice'


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
    [dispatch],
  )

  const handleEditImg = useCallback(
    () => {
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
    [modal, files, handleProfilePhotoUpdate],
  ) 

  const handleInfoUpdate = useCallback(
    () => {
      console.log('update profile info')
    },
    [],
  )

  const handleReauth = useCallback(
    ({password}) => {

      console.log(`password`, password)
      console.log('reauthUser', reauthUser)
      
      dispatch(reauthUser(
        {
          password,
          actionCreator: updateEmail,
          stateDataPath: 'user.tempData'
        }
      ))
    },
    []
  )

  // const modalRender = useCallback(
  //   () => {
  //     const onSubmit = () => {
  //       dispatch( withdrawReauth() )
  //     }

  //     return <ReauthPassword handleSubmit={onSubmit} />
  //   },
  //   [dispatch]
  // )

  const modalRenderReauth = useCallback(
    () => <ReauthPassword handleSubmit={handleReauth} />
    ,
    [handleReauth]
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

  useEffect(() => {
    dispatch(getUserFullInfo())
  }, [dispatch])

  useEffect(() => {
    setProfilePhoto(photoURL)
  }, [photoURL])

  useEffect(() => {
    if (reauth) {
      modal.setContentRender(modalRenderReauth)
      modal.setIsOpen(true)
    }
    // if (!reauth) {
    //   // const testFunc = () => {
    //   //   dispatch(withdrawReauth()) 
    //   // }

    //   modal.handleClose()
    //   dispatch(withdrawReauth())
    // }
  }, [reauth, modal, modalRenderReauth, dispatch])

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