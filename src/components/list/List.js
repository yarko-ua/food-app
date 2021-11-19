import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { CircularProgress, List, makeStyles } from "@material-ui/core"
import ListItemCustom from "./listItem/ListItem"

const useStyles = makeStyles({
	list: {
		borderTop: "2px dashed grey",
	},
})

const MyList = ({ list, ...props }) => {
	const styles = useStyles()
	const loading = useSelector((state) => state.fbList.loading)

	console.log("props", props)

	if (loading) return <CircularProgress />

	if (!list || list.length < 1) {
		return <span />
	}

	return (
		<List className={styles.list}>
			{list.length > 0 &&
				list.map((listItem) => (
					<ListItemCustom key={listItem.id} data={listItem} {...props} />
				))}
		</List>
	)
}

MyList.propTypes = {
	list: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MyList
