import Header from "../../components/header/Header"
import MyList from "../../components/list/List"
import { FileUploader } from "./fileUploader/FileUploader"
// import { ListHandler } from "./listHandler/ListHandler"


const testData = [
  {
    id: 'list56',
    text: 'list lorem',
  },
  {
    id: 'list59',
    text: 'list lorem + 56 wer',
  },
  {
    id: 'list6',
    text: 'list lorem ipsum dolor',
  },
  {
    id: 'list5',
    text: 'lorem',
  },
  {
    id: 'list5645',
    text: 'list',
  },
  {
    id: 'list546',
    text: 'lsdf fffsd',
  },
]


export const AppWrapper = (props) => {
  return(
    <>
      <h1>APP</h1>
      <FileUploader />
      <MyList list={testData} linked location={props.location} />
      {/* <ListHandler /> */}
    </>
  )
}