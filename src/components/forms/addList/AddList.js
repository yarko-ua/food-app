import { useState, useCallback } from "react"
import { Button, TextField } from "@material-ui/core"
import PropTypes from "prop-types"

const AddList = ({ onSubmit }) => {
	const [productName, setProductName] = useState("")

	const handleName = useCallback((event) => {
		setProductName(event.target.value)
	}, [])

	const handleSubmit = useCallback(
		(e) => {
			onSubmit(e)
			setProductName("")
		},
		[onSubmit]
	)

	return (
		<form
			onSubmit={handleSubmit}
			// className={formStyles.form}
		>
			<TextField
				size="medium"
				id="listName"
				name="name"
				label="List Name"
				fullWidth
				variant="outlined"
				value={productName}
				onChange={handleName}
				// className={formStyles.input}
				// margin="dense"
				required
			/>

			{/* <input type="file" multiple accept="image/jpg, image/jpeg, image/png" onChange={handleUpload} /> */}
			<Button type="submit" color="primary" variant="contained">
				Add new list
			</Button>
		</form>
	)
}

AddList.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}

export default AddList
