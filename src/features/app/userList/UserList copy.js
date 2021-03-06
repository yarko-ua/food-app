import { CircularProgress, Grid } from "@material-ui/core";
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import MyList from "../../../components/list/List";
import { FileUploader } from "../fileUploader/FileUploader"
import { uploadToStore } from "../fileUploader/fileUploaderSlice";
import { ListHandler } from "../listHandler/ListHandler";
import { addUserRecord, deleteUserRecord, removeRecord } from "../listHandler/listHandlerSlice";


export const UserList = props => {
  const filesLoading = useSelector(state => state.files.loading)
  const testData = useSelector(state => state.fbList.myList)

  const dispatch = useDispatch();

  const handleUpload = useCallback((file) => {
    dispatch(uploadToStore(file))
  }, []);

  const handleListSubmit = useCallback((uid, data) => {
    dispatch(addUserRecord(uid, data))
  }, []);

  const onRemove = useCallback(
    (id) => {
      console.log(`id`, id);
      dispatch(deleteUserRecord(id))
    },
    [dispatch],
  )

  return (
    <Grid container spacing={1} justifyContent="space-between" >
      <Grid item xs={4}>
        <ListHandler onSubmit={handleListSubmit} handleUpload={handleUpload} />
      </Grid>
      <Grid item xs={7}>
        <MyList 
          list={testData} 
          linked 
          location={props.location}
          onRemove={onRemove}   
        />
      </Grid>
      
    </Grid>
  )
}