import { useDispatch, useSelector } from "react-redux";
import { addUserRecord } from "./listHandlerSlice";

export const ListHandler = () => {

  const dispatch = useDispatch();
  const uid = useSelector(state => state.user.uid)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('e.target', e.target);
    console.dir('e.target', e.target);

    const form = new FormData(e.target);

    console.dir(form);

    const data = {};

    for (let pair of form.entries() ) {
      data[pair[0]] = pair[1];
    }

    dispatch(addUserRecord(uid,data));

    console.log(`send`, data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <input type="text" name="surname" />
      <input type="number" name="age" />
      <button type="submit">Send</button>
    </form>
  )
}