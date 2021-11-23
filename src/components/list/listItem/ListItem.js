import { useCallback } from "react"
import PropTypes from "prop-types"
import {
	Avatar,
	Grid,
	IconButton,
	ListItem as MuiListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
} from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"
import DeleteIcon from "@material-ui/icons/Delete"
import { Link, useLocation } from "react-router-dom"
import { Rating } from "@material-ui/lab"

const useStyles = makeStyles({
	li: {
		borderBottom: "1px solid black",

		"& h3": {
			margin: 0,
		},
	},
	img: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
})

const ListItemCustom = ({ data, type, linked, onRemove, path }) => {
	const styles = useStyles()

	const location = useLocation()

	const handleClick = useCallback(() => {
		onRemove(data.id)
	}, [onRemove, data.id])

	return (
		<MuiListItem className={styles.li}>
			<ListItemAvatar>
				<Avatar>
					{linked && (
						<Link
							to={{
								pathname: `${path}/${data.id}`,
								state: { from: location.pathname },
							}}
						>
							{
								data.thumb ? (
									<img src={data.thumb || ""} className={styles.img} alt="" />
								) : (
									data.name[0].toUpperCase()
								)
								// <InfoIcon />
							}
						</Link>
					)}

					{!linked && <InfoIcon />}
				</Avatar>
			</ListItemAvatar>

			<ListItemText>
				<Grid container>
					<Grid container item xs direction="column">
						<Grid item xs>
							<h3>{data.name}</h3>
							{type === "product" && (
								<Rating value={+data.rating} readOnly size="small" />
							)}
						</Grid>
						<Grid item xs alignItems="center" container>
							{data.description && <p>{data.description}</p>}
						</Grid>
					</Grid>
					<Grid item xs={1} />
					<Grid container item xs justifyContent="flex-end">
						{/* <Grid item xs={3}> */}
						Added: <br />{" "}
						{data.createdAt && new Date(data.createdAt).toDateString()}
						{/* </Grid> */}
					</Grid>
				</Grid>
			</ListItemText>

			<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete" onClick={handleClick}>
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</MuiListItem>
	)
}

ListItemCustom.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string.isRequired,
		thumb: PropTypes.string,
		name: PropTypes.string.isRequired,
		rating: PropTypes.string, // TODO: change to number
		description: PropTypes.string,
		createdAt: PropTypes.number.isRequired,
	}).isRequired,
	linked: PropTypes.bool,
	path: PropTypes.string.isRequired,
	onRemove: PropTypes.func,
	type: PropTypes.string,
}

ListItemCustom.defaultProps = {
	type: "list",
	linked: false,
	onRemove: () => {},
}

export default ListItemCustom
