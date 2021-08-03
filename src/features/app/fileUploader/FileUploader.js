import { useCallback, useRef, useState, useEffect } from 'react';
import { uploadFiles, removeFile } from './fileUploaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoCamera } from '@material-ui/icons';
import { CircularProgress, Grid, IconButton, makeStyles } from '@material-ui/core';

const useFileUploaderStyles = makeStyles({
  gridContainer: {
    maxWidth: 360,
    margin: '15px 0',
    backgroundColor: 'rgba(231, 231, 231, 0.75)',
    borderRadius: 12
  },
  label: {
    display: 'inline-block',
    margin: '0 0 0 15px'
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

export const FileUploader = ({onUpload, className}) => {
  const styles = useFileUploaderStyles();

  const dispatch = useDispatch()
  const files = useSelector(state => state.files.filesList)
  const loading = useSelector(state => state.files.loading)
  const uploadingStatus = useSelector(state => state.files.status)

  const handleUpload = useCallback((e) => {
    console.dir(e);
    console.log(`e.target.files`, e.target.files);

    const filesArray = e.target.files;

    dispatch(uploadFiles(filesArray));

  }, [dispatch]);


  const handleRemovePhoto = useCallback( (e) => {
    console.log(`traget`, e.target);
    console.log(`traget next`, e.target.nextElementSibling);
    console.log(`traget next alt`, e.target.nextElementSibling.alt);

    dispatch(removeFile(e.target.nextElementSibling.alt));
  }, [dispatch]);

  return (
    <span className={className}>

      <span className={styles.label}>Want to add photo?</span>

      <label htmlFor="productPhotos">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      <br/>

      {loading && <CircularProgress /> }

      {uploadingStatus === 400 && <span>Oops, something goes wrong</span>}

      {uploadingStatus === 200 && files.length && <span>Photos loaded ({files.length}) </span>}

      { 
        uploadingStatus === 200 && files.length && 

        <Grid container spacing={2} className={styles.gridContainer} >
          { 
            files.map((file, i) => {
              return (
                <Grid item xs={3} key={file.name}>
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
        id="productPhotos"
        name="productPhotos"
        multiple 
        accept="image/*"
        onChange={handleUpload} 
      />

    </span>
  )
}