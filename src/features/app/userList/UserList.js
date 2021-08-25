import { CircularProgress, Grid } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MyList from "../../../components/list/List";
import { FileUploader } from "../fileUploader/FileUploader"
import { uploadToStore } from "../fileUploader/fileUploaderSlice";
import { ListHandler } from "../listHandler/ListHandler";
import { addUserRecord, deleteUserRecord, removeRecord } from "../listHandler/listHandlerSlice";
import { getUserList } from "../userLists/userListsSlice";


export const UserList = props => {
  const { listID } = props.match.params

  const filesLoading = useSelector(state => state.files.loading)
  // const lists = useSelector(state => state.lists.data).filter(list => list.id === )
  const currentList = useSelector(state => state.lists.currentList)

  console.log(`currentList`, currentList)

  const dispatch = useDispatch()

  // const [lists, setLists] = useState(listsData)

  useEffect(() => {
    if (!currentList) {
      dispatch(getUserList(listID))
    }
  }, [])

  const data = currentList ? currentList.products : []

  console.log(`data`, data)

  const handleUpload = useCallback((file) => {
    dispatch(uploadToStore(file))
  }, []);

  const handleListSubmit = useCallback((uid, data) => {
    dispatch(addUserRecord(uid, data))
  }, []);

  // const onRemove = useCallback(
  //   (id) => {
  //     console.log(`id`, id);
  //     dispatch(deleteUserRecord(id))
  //   },
  //   [dispatch],
  // )

  return (
    <Grid container spacing={1} justifyContent="space-between" >
      <Grid item xs={4}>
        <ListHandler onSubmit={handleListSubmit} handleUpload={handleUpload} />
      </Grid>
      <Grid item xs={7}>
        <MyList 
          list={data} 
          linked 
          location={props.location}
          path="/product"
          // onRemove={onRemove}   
        />
      </Grid>
      
    </Grid>
  )
}

// export const UserList = withRouter(productsList);