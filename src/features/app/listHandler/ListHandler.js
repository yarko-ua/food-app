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

export const ListHandler = ({label, onSubmit, form: Form }) => {

  console.log(`Form`, Form)

  const dispatch = useDispatch()
  const uid = useSelector(state => state.user.data.uid)
  const submitting = useSelector(state => state.fbList.submitting)
  // const formStyles = useFormStyles()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    // console.dir(form);

    const data = {};

    for (let key of form.keys() ) {
      if (form.getAll(key).length > 1) {
        if (data[key]) continue;

        data[key] = form.getAll(key);
      } else {
        data[key] = form.get(key);
      }
    }

    console.log(`send`, data)

    onSubmit(data)
  }

  if (submitting) return <CircularProgress />

  return (
    <>
      <h2>{label}</h2>

      <Form onSubmit={handleSubmit}/>
    </>
  )
}

ListHandler.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.elementType.isRequired,
}

ListHandler.defaultProps = {
  onSubmit: () => {}
}