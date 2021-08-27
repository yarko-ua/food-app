import { useCallback, useRef, useState, useEffect } from 'react';
import { uploadFiles, removeFile, clearFiles } from './fileUploaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoCamera } from '@material-ui/icons';
import { CircularProgress, Grid, IconButton, makeStyles } from '@material-ui/core';

const useFileUploaderStyles = makeStyles({
  root: {
    maxWidth: props => props.fullWidth ? '100%' : 360,
    width: props => props.fullWidth ? '100%' : 'initial',
  },
  gridContainer: {
    width: '100%',
    margin: '15px 0',
    backgroundColor: 'rgba(231, 231, 231, 0.75)',
    borderRadius: 12
  },
  label: {
    display: 'inline-block',
  },
  imgContainer: {
    position: 'relative',
    paddingBottom: '100%',
    height: 0,

    '&:hover > button' : {
      display: 'block'
    },
    '&:hover > div' : {
      opacity: 0
    }
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%'
  },
  imgOverlay: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: '#FFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(25, 25, 25, 0.7)',
    fontSize: 24,
    borderRadius: '50%'
  },
  removeImgBtn: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    fontSize: 30,
    // transform: 'translate(25%, -25%)',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(230, 10, 10, 0.9)',
    color: '#fff',
    cursor: 'pointer',
    display: 'none',
  }
})

export const FileUploader = ({onUpload, className, fullWidth}) => {
  const styles = useFileUploaderStyles({fullWidth});

  const dispatch = useDispatch()
  const files = useSelector(state => state.files.filesList)
  const loading = useSelector(state => state.files.loading)
  const uploadingStatus = useSelector(state => state.files.status)

  const handleUpload = useCallback((e) => {

    const filesArray = e.target.files;
    dispatch(uploadFiles(filesArray));

  }, [dispatch]);


  const handleRemovePhoto = useCallback( (e) => {
    dispatch(removeFile(e.target.nextElementSibling.alt));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearFiles())
    }
  }, [dispatch])

  return (
    <Grid className={`${className}${styles.root}`}>

      <span className={styles.label}>Want to add photo?</span>

      <label htmlFor="productPhotos">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      {loading && <CircularProgress /> }

      {uploadingStatus === 400 && <span>Oops, something goes wrong</span>}

      { 
        uploadingStatus === 200 && files.length > 0 && 

        <Grid container spacing={1} className={styles.gridContainer} >
          { 
            files.map((file, i) => {
              return (
                <Grid item xs={2} key={file.name}>
                  <div className={styles.imgContainer}  >
                    <button type="button" className={styles.removeImgBtn} onClick={handleRemovePhoto}>X</button>
                    <img src={file.url} alt={file.name} className={styles.img} />
                    <div className={styles.imgOverlay}>{i + 1}</div>
                  </div>
                  
                </Grid >
              )
            })
          }
        </Grid>
      }

      <input 
        hidden 
        type="file" 
        id="filesUploader"
        name="files"
        multiple 
        accept="image/*"
        onChange={handleUpload} 
      />

    </Grid>
  )
}