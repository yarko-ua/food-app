import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyList from "../../../components/list/List";
import { getUserLists } from "./userListsSlice";

export const UserLists = props => {
  const list = useSelector(state => state.lists.data)
  console.log(`list`, list)
  const userData = useSelector(state => state.user.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserLists(userData.uid))
    console.log(`mount`)
    console.log(`list`, list)
  }, [])

  return (
    <Container container spacing={1} justifyContent="space-between" >
      { list &&
          <MyList 
            list={list} 
            linked
            path="/app/lists"
            location={props.location}
          />
      }
    </Container>
  )
}