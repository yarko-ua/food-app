import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddListForm } from "../../../components/forms/addListForm/AddListForm";
import { AddProductForm } from "../../../components/forms/addProductForm/AddProductForm";
import MyList from "../../../components/list/List";
import { PATH_TO_LISTS } from "../../../constants";
import { retrieveFormData } from "../../../helpers/retrieveFormData";
import { ListHandler } from "../listHandler/ListHandler";
import { addNewList, getUserLists, removeList} from "./userListsSlice";


const useStyles = makeStyles({
  root: {
    // marginTop: `${48*1.1}px`
  }
})


export const UserLists = props => {
  const list = useSelector(state => state.lists.data)
  console.log(`list`, list)
  const userData = useSelector(state => state.auth.data)
  const dispatch = useDispatch()

  const styles = useStyles()


  useEffect(() => {
    dispatch(getUserLists(userData.uid))
    console.log(`mount`)
    console.log(`list`, list)
  }, [])

  const handleListSubmit = useCallback(e => {
    e.preventDefault();

    const data = retrieveFormData(e.target)

    console.log(`sended list data`, data)
    dispatch(addNewList(data))
  }, [dispatch])

  const onRemove = useCallback((id) => {
    dispatch(removeList(id))
  }, [dispatch])

  return (
    <Grid className={styles.root} container spacing={1} justifyContent="space-between">
      <Grid item xs={12} md={4}>
        <h2>Want to add a new list?</h2>
        <AddListForm onSubmit={handleListSubmit}/>
      </Grid>
      <Grid item xs={12} md={7} >
        <MyList 
          list={list || []} 
          linked
          location={props.location}
          path={PATH_TO_LISTS}
          onRemove={onRemove}
        />
      </Grid>
      
    </Grid>
  )
}