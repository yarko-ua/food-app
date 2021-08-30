import { useCallback, useEffect, useMemo, useState } from "react"
import { CircularProgress, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MyList from "../../../components/list/List";
import { FileUploader } from "../fileUploader/FileUploader"
// import { uploadToStore } from "../fileUploader/fileUploaderSlice";
import { ListHandler } from "../listHandler/ListHandler";
import { addUserRecord, deleteUserRecord, removeRecord } from "../listHandler/listHandlerSlice";
import { addProductToList, clearList, getUserList, removeProductFromList } from "../userLists/userListsSlice";
import { AddProductForm } from "../../../components/forms/addProductForm/AddProductForm";
import { retrieveFormData } from "../../../helpers/retrieveFormData";
import { PATH_TO_PRODUCT } from "../../../constants";
import { clearFiles, uploadToStore } from "../fileUploader/fileUploaderSlice";
import { addProduct } from "../../product/productSlice";


export const UserList = props => {
  const { listID } = props.match.params
  const currentList = useSelector(state => state.lists.currentList)
  console.log(`currentList`, currentList)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!currentList) {
      dispatch(getUserList(listID))
    }
    return () => {
      console.log(`unmount`)
      dispatch(clearList())
    }
  }, [dispatch, listID])

  const list = currentList ? currentList.data : []

  console.log(`list`, list)

  const handleListSubmit = useCallback( e => {
    e.preventDefault();

    const data = retrieveFormData(e.target)

    console.log(`sended product data`, data)

    dispatch(addProductToList(data))
    dispatch(clearFiles())
  }, [dispatch]);

  const onRemove = useCallback(
    (id) => {
      console.log(`id`, id);
      dispatch(removeProductFromList(id))
    },
    [dispatch],
  )

  // if (!currentList) {
  //   return <CircularProgress />
  // }



  return (
    <Grid container spacing={1} justifyContent="space-between" >
      <Grid item xs={4}>
        <h2>Want to add a product?</h2>
        <AddProductForm onSubmit={handleListSubmit} />
      </Grid>
      <Grid item xs={7}>
        {
          !currentList ?
            <CircularProgress />
            :
            (<>
              <h3>{currentList.name}</h3>
              <MyList 
                list={list} 
                linked 
                location={props.location}
                path={PATH_TO_PRODUCT}
                type="product"
                onRemove={onRemove}   
              />
            </>)
        }
        
      </Grid>
      
    </Grid>
  )
}



// export const UserList = withRouter(productsList);