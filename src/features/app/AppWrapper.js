import { FileUploader } from "./fileUploader/FileUploader"
import { ListHandler } from "./listHandler/ListHandler"

export const AppWrapper = () => {
  return(
    <>
      <FileUploader />
      <ListHandler />
    </>
  )
}