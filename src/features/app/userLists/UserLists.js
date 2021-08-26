import { Container, Grid } from "@material-ui/core";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyList from "../../../components/list/List";
import { ListHandler } from "../listHandler/ListHandler";
import { getUserLists } from "./userListsSlice";

export const UserLists = props => {
  const list = useSelector(state => state.lists.data)
  console.log(`list`, list)
  const userData = useSelector(state => state.user.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserLists(userData.uid))
    console.log(`mount`)
    console.log(`list`, list)
  }, [])

  const handleListSubmit = useCallback(() => {
    console.log('submit')
  }, [])

  return (
    <Grid container spacing={1} justifyConten="space-between">
      <Grid item xs={4}>
        <ListHandler 
          onSubmit={handleListSubmit} 
          label="Want to add a new list?" 
        />
      </Grid>
      <Grid item xs={7} >
        <MyList 
          list={list || []} 
          linked
          path="/app/lists"
          location={props.location}
        />
      </Grid>
      
    </Grid>
  )
}