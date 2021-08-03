import { Button, makeStyles, TextareaAutosize, TextField } from "@material-ui/core";
import { useState, useCallback, useEffect } from "react";
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

export const ListHandler = ({onSubmit, handleUpload}) => {

  const [productName, setProductName]  = useState('');
  const [productDescription, setProductDescription]  = useState('');
  const dispatch = useDispatch();
  const uid = useSelector(state => state.user.userData.uid)
  const formStyles = useFormStyles();

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

    dispatch(addUserRecord( {user: uid, data: {...data, productPhotos: null}} ))

    // dispatch(uploadToStore(data['productPhotos']));

    console.log(`send`, data);
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

  useEffect(() => {
    dispatch(getUserRecords(uid))

    return () => {
      dispatch(clearFiles())
    }
  }, [dispatch, uid])

  return (
    <form onSubmit={handleSubmit} className={formStyles.form}>
      <TextField 
        size="medium"
        id="product"
        name="product"
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
        name="productDescription"
        label="Describe product" 
        // margin="dense"
        required
        // fullWidth 
        multiline 
        minRows={2}
        maxRows={5} 
        variant="outlined"
        value={productDescription}
        onChange={handleDescription}
        className={`${formStyles.w50} ${formStyles.input}`}
      />
      <FileUploader onUpload={handleUpload} className={`${formStyles.file} ${formStyles.w50} `}/>

      {/* <input type="file" multiple accept="image/jpg, image/jpeg, image/png" onChange={handleUpload} /> */}

      <Button type="submit" color="primary" variant="contained" >
        Add product
      </Button>
    </form>
  )
}