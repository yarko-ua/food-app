import { useCallback, useEffect, useMemo, useState } from "react"
import { CircularProgress, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MyList from "../../../components/list/List";
import { FileUploader } from "../fileUploader/FileUploader"
import { uploadToStore } from "../fileUploader/fileUploaderSlice";
import { ListHandler } from "../listHandler/ListHandler";
import { addUserRecord, deleteUserRecord, removeRecord } from "../listHandler/listHandlerSlice";
import { clearList, getUserList } from "../userLists/userListsSlice";


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
    return () => {
      console.log(`unmount`)
      dispatch(clearList())
    }
  }, [])

  const data = currentList ? currentList.data : []

  console.log(`data`, data)

  const handleUpload = useCallback((file) => {
    dispatch(uploadToStore(file))
  }, []);

  const handleListSubmit = useCallback(data => {
    dispatch(addUserRecord(data))
  }, []);

  // const onRemove = useCallback(
  //   (id) => {
  //     console.log(`id`, id);
  //     dispatch(deleteUserRecord(id))
  //   },
  //   [dispatch],
  // )
  // if (!currentList) {
  //   return <CircularProgress />
  // }

  const attr = useMemo(() => {
    return [
      {
        id: 'productName',
        label: 'Product',
        name: 'name'
      },
      {
        id: 'productDescription',
        label: 'Describe product',
        name: 'description',
        multiline: true 
      },
      {
        type: 'raing',
        name: 'rating'
      },
      {
        type: 'fileUploader'
      }
    ]
  }, [])

  return (
    <Grid container spacing={1} justifyContent="space-between" >
      <Grid item xs={4}>
        <ListHandler 
          onSubmit={handleListSubmit} 
          handleUpload={handleUpload}
          label="Want to add a product?"
        />
      </Grid>
      <Grid item xs={7}>
        {
          !currentList ?
            <CircularProgress />
            :
            (<>
              <h3>{currentList.name}</h3>
              <MyList 
                list={data} 
                linked 
                location={props.location}
                type="product"
                path="/product"
                // onRemove={onRemove}   
              />
            </>)
        }
        
      </Grid>
      
    </Grid>
  )
}



// export const UserList = withRouter(productsList);