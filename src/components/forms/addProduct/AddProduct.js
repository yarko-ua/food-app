import { useState, useCallback } from "react";
import { Button, TextField } from "@material-ui/core";
import PropTypes from 'prop-types'
import { FileUploader } from "../../../features/app/fileUploader/FileUploader";
import { Rating } from "@material-ui/lab";


export const AddProduct = ({onSubmit}) => {
  const [productName, setProductName]  = useState('')
  const [productDescription, setProductDescription]  = useState('')
  const [rating, setRating] = useState(0)

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

  const handleSubmit = useCallback(
    (e) => {
      onSubmit(e)
      setProductName('')
      setProductDescription('')
      setRating(0)
    },
    [onSubmit]
  )

  return (
    <form 
      onSubmit={handleSubmit} 
      // className={formStyles.form}
    >
      <TextField 
        size="medium"
        id="productName"
        name="name"
        label="Product" 
        fullWidth
        variant="outlined"
        value={productName}
        onChange={handleName}
        // className={formStyles.input}
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
        // className={formStyles.input}
      />
      <Rating 
        name="rating"
        value={rating}
        onChange={handleRating}
        size="large"
      />
      <FileUploader 
        fullWidth 
        // className={formStyles.file}
      />
      {/* <input type="file" multiple accept="image/jpg, image/jpeg, image/png" onChange={handleUpload} /> */}
      <Button 
        type="submit" 
        color="primary" 
        variant="contained" 
      >
        Add product
      </Button>
    </form>
  )
}

AddProduct.propTypes= {
  onSubmit: PropTypes.func.isRequired,
  // handleUpload: PropTypes.func.isRequired
}