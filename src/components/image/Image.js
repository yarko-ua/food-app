import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

const useStyles = makeStyles({
	root: {
		position: (props) => (props.type === "absolute" ? "absolute" : "static"),
		top: 0,
		left: 0,
		width: (props) => (props.type === "absolute" ? "100%" : "initial"),
		maxWidth: "100%",
		height: (props) => (props.type === "absolute" ? "100%" : "auto"),
		objectFit: (props) => (props.type === "absolute" ? "cover" : "initial"),
	},
})

const Image = ({ src, alt, ...props }) => {
	const styles = useStyles(props)

	return <img src={src} alt={alt} className={styles.root} />
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
}

export default Image
