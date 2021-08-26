import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types"
import { Button, CircularProgress, makeStyles, TextareaAutosize, TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { FileUploader } from "../fileUploader/FileUploader";
import { clearFiles, uploadToStore } from "../fileUploader/fileUploaderSlice";
import { addUserRecord, getUserRecords } from "./listHandlerSlice";

const useFormStyles = makeStyles({
  form: {
    marginBottom: 40,
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: '15px 0',
  },
  w50: {
    width: '50%'
  },
  file: {
    display: 'inline-block',
    marginTop: 15,
  },
})

export const ListHandler = ({label, onSubmit, handleUpload}) => {

  const [productName, setProductName]  = useState('')
  const [rating, setRating] = useState(0)
  const [productDescription, setProductDescription]  = useState('')
  const dispatch = useDispatch()
  const uid = useSelector(state => state.user.data.uid)
  const submitting = useSelector(state => state.fbList.submitting)
  const formStyles = useFormStyles()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('e.target', e.target);
    console.dir('e.target', e.target);

    const form = new FormData(e.target);

    console.dir(form);

    const data = {};

    console.log(`form.keys()`, form.keys());

    for (let key of form.keys() ) {
      console.log(`key`, key);

      if (form.getAll(key).length > 1) {
        if (data[key]) continue;

        data[key] = form.getAll(key);
      } else {
        data[key] = form.get(key);
      }
    }

    console.log(`send`, data)

    if (!data.hasOwnProperty('rating')) {
      data.productRating = 0
    }

    console.log(`send`, data)

    // dispatch(addUserRecord( {...data, photos: null} ))

    onSubmit(data)

    // dispatch(uploadToStore(data['productPhotos']));

  }

  const handleName = useCallback(
    (event) => {
      setProductName(event.target.value);
    },
    [],
  )

  const handleDescription = useCallback(
    (event) => {
      setProductDescription(event.target.value);
    },
    [],
  )

  const handleRating = useCallback(
    (ev, newValue) => {
      setRating(newValue)
    },
    []
  )

  useEffect(() => {
    // dispatch(getUserRecords(uid))
    // dispatch(getUserLists(uid))

    return () => {
      dispatch(clearFiles())
    }
  }, [dispatch, uid])

  if (submitting) return <CircularProgress />

  return (
    <>
      <h2>{label}</h2>

      <form onSubmit={handleSubmit} className={formStyles.form}>
        <TextField 
          size="medium"
          id="productName"
          name="name"
          label="Product" 
          fullWidth
          variant="outlined"
          value={productName}
          onChange={handleName}
          className={formStyles.input}
          // margin="dense"
          required
        />
        <TextField 
          size="medium"
          id="productDescription"
          name="description"
          label="Describe product" 
          // margin="dense"
          required
          fullWidth 
          multiline 
          minRows={2}
          maxRows={5} 
          variant="outlined"
          value={productDescription}
          onChange={handleDescription}
          className={formStyles.input}
        />
        <Rating 
          name="rating"
          value={rating}
          onChange={handleRating}
          size="large"
        />
        <FileUploader fullWidth onUpload={handleUpload} className={formStyles.file}/>

        {/* <input type="file" multiple accept="image/jpg, image/jpeg, image/png" onChange={handleUpload} /> */}

        <Button type="submit" color="primary" variant="contained" >
          Add product
        </Button>
      </form>
    </>
  )
}

ListHandler.propTypes = {
  handleUpload: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

ListHandler.defaultProps = {
  onSubmit: () => {}
}