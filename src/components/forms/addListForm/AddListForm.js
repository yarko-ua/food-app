import { useState, useCallback } from "react";
import { Button, TextField } from "@material-ui/core";
import PropTypes from 'prop-types'


export const AddListForm = props => {
  const [productName, setProductName]  = useState('')

  const handleName = useCallback(
    (event) => {
      setProductName(event.target.value);
    },
    [],
  )

  const handleSubmit = useCallback((e) => {
    props.onSubmit(e)
    setProductName('')
  }, [props])

  return (
    <form 
      onSubmit={handleSubmit} 
      // className={formStyles.form}
    >
      <TextField 
        size="medium"
        id="listName"
        name="name"
        label="List Name" 
        fullWidth
        variant="outlined"
        value={productName}
        onChange={handleName}
        // className={formStyles.input}
        // margin="dense"
        required
      />
    
      {/* <input type="file" multiple accept="image/jpg, image/jpeg, image/png" onChange={handleUpload} /> */}
      <Button 
        type="submit" 
        color="primary" 
        variant="contained" 
      >
        Add new list
      </Button>
    </form>
  )
}

AddListForm.propTypes= {
  onSubmit: PropTypes.func.isRequired,
}