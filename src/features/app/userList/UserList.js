import { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { CircularProgress, Grid } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
// import { withRouter } from "react-router-dom";
import MyList from "components/list/List"
// import { FileUploader } from "../fileUploader/FileUploader"
// import { uploadToStore } from "../fileUploader/fileUploaderSlice";
// import { ListHandler } from "../listHandler/ListHandler";
// import { addUserRecord, deleteUserRecord, removeRecord } from "../listHandler/listHandlerSlice";
import {
	addProductToList,
	clearList,
	getUserList,
	removeProductFromList,
} from "features/app/userLists/userListsSlice"
import AddProduct from "components/forms/addProduct/AddProduct"
import retrieveFormData from "helpers/retrieveFormData"
import { PATH_TO_PRODUCT } from "constants/constants"
import { clearFiles } from "features/app/fileUploader/fileUploaderSlice"
// import { addProduct } from "../../product/productSlice";
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
	root: {
		// marginTop: 48*1.5
	},
})

const UserList = ({
	match: {
		params: { listID },
	},
	location,
}) => {
	const currentList = useSelector((state) => state.lists.currentList)
	console.log(`currentList`, currentList)

	const styles = useStyles()

	const dispatch = useDispatch()

	useEffect(() => {
		if (!currentList) {
			dispatch(getUserList(listID))
		}
		return () => {
			console.log(`unmount`)
			dispatch(clearList())
		}
	}, [dispatch, listID, currentList])

	const list = currentList ? currentList.data : []

	console.log(`list`, list)

	const handleListSubmit = useCallback(
		(e) => {
			e.preventDefault()

			const data = retrieveFormData(e.target)

			console.log(`sended product data`, data)

			dispatch(addProductToList(data))
			dispatch(clearFiles())
		},
		[dispatch]
	)

	const onRemove = useCallback(
		(id) => {
			console.log(`id`, id)
			dispatch(removeProductFromList(id))
		},
		[dispatch]
	)

	// if (!currentList) {
	//   return <CircularProgress />
	// }

	return (
		<Grid className={styles.root} container spacing={1}>
			<Grid item xs={12} md={4}>
				<h2>Want to add a product?</h2>
				<AddProduct onSubmit={handleListSubmit} />
			</Grid>
			<Grid item xs={12} md={1} />
			<Grid item xs>
				{!currentList ? (
					<CircularProgress />
				) : (
					<>
						<h3>{currentList.name}</h3>
						<MyList
							list={list}
							linked
							location={location}
							path={PATH_TO_PRODUCT}
							type="product"
							onRemove={onRemove}
						/>
					</>
				)}
			</Grid>
		</Grid>
	)
}

UserList.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			listID: PropTypes.string.isRequired,
		}),
	}).isRequired,
	location: PropTypes.string.isRequired,
}

export default UserList
