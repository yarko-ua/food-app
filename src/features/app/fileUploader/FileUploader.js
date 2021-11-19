import {
	CircularProgress,
	Grid,
	IconButton,
	makeStyles,
} from "@material-ui/core"
import { Close, PhotoCamera } from "@material-ui/icons"
import { useCallback, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import { clearFiles, removeFile, uploadFiles } from "./fileUploaderSlice"

const useFileUploaderStyles = makeStyles({
	root: {
		maxWidth: (props) => (props.fullWidth ? "100%" : 360),
		width: (props) => (props.fullWidth ? "100%" : "initial"),
	},
	gridContainer: {
		width: "100%",
		margin: "15px 0",
		backgroundColor: "rgba(231, 231, 231, 0.75)",
		borderRadius: 12,
	},
	label: {
		display: "inline-block",
	},
	imgContainer: {
		position: "relative",
		paddingBottom: "100%",
		height: 0,

		"&:hover > button": {
			display: "block",
		},
		"&:hover > div": {
			opacity: 0,
		},
	},
	img: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		objectFit: "cover",
		borderRadius: "50%",
	},
	imgOverlay: {
		position: "absolute",
		zIndex: 1,
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		color: "#FFF",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "rgba(25, 25, 25, 0.7)",
		fontSize: 24,
		borderRadius: "50%",
	},
	removeImgBtn: {
		position: "absolute",
		zIndex: 2,
		width: "100%",
		height: "100%",
		top: 0,
		right: 0,
		fontSize: 30,
		// transform: 'translate(25%, -25%)',
		borderRadius: "50%",
		border: "none",
		backgroundColor: "rgba(230, 10, 10, 0.9)",
		color: "#fff",
		cursor: "pointer",
		display: "none",

		"&:hover": {
			backgroundColor: "rgba(230, 10, 10, 0.9)",
		},

		"& .MuiIconButton-label": {
			position: "absolute",
			left: "50%",
			top: "50%",
			transform: "translate(-50%, -50%)",
			maxWidth: "100%",
		},
	},
})

const FileUploader = ({ className, fullWidth }) => {
	const styles = useFileUploaderStyles({ fullWidth })

	const dispatch = useDispatch()
	const files = useSelector((state) => state.files.data)
	const loading = useSelector((state) => state.files.loading)
	const uploadingStatus = useSelector((state) => state.files.status)

	const handleUpload = useCallback(
		(e) => {
			const filesArray = e.target.files
			dispatch(uploadFiles(filesArray))
		},
		[dispatch]
	)

	const handleRemovePhoto = useCallback(
		(e) => {
			dispatch(removeFile(e.currentTarget.nextElementSibling.alt))
		},
		[dispatch]
	)

	useEffect(() => () => dispatch(clearFiles()), [dispatch])

	const columnSize = useMemo(() => {
		if (files.length) {
			if (files.length >= 5) return 3

			return Math.round(Math.min(12 / files.length, 4))
		}

		return null
	}, [files])

	return (
		<Grid className={`${className}${styles.root}`}>
			<span className={styles.label}>Want to add photo?</span>

			<label htmlFor="filesUploader">
				<IconButton
					color="primary"
					aria-label="upload picture"
					component="span"
				>
					<PhotoCamera />
				</IconButton>
				<input
					hidden
					type="file"
					id="filesUploader"
					name="files"
					multiple
					accept="image/*"
					onChange={handleUpload}
				/>
			</label>

			{loading && <CircularProgress />}

			{uploadingStatus && uploadingStatus !== "ok" && (
				<span>Oops, something goes wrong</span>
			)}

			{uploadingStatus === "ok" && files.length > 0 && (
				<Grid container spacing={1} className={styles.gridContainer}>
					{files.map((file, i) => (
						<Grid item xs={columnSize} key={file.name}>
							<div className={styles.imgContainer}>
								<IconButton
									className={styles.removeImgBtn}
									onClick={handleRemovePhoto}
								>
									<Close />
								</IconButton>
								<img src={file.url} alt={file.name} className={styles.img} />
								<div className={styles.imgOverlay}>{i + 1}</div>
							</div>
						</Grid>
					))}
				</Grid>
			)}
		</Grid>
	)
}

FileUploader.propTypes = {
	className: PropTypes.string,
	fullWidth: PropTypes.bool,
}

FileUploader.defaultProps = {
	className: "",
	fullWidth: false,
}

export default FileUploader
