import { createContext, useCallback, useMemo, useState } from "react"
import PropTypes from "prop-types"
import {
	Box,
	ClickAwayListener,
	Grid,
	IconButton,
	makeStyles,
	Modal,
} from "@material-ui/core"
import { Close } from "@material-ui/icons"

const boxStyles = {
	backgroundColor: "rgba(255, 255, 255, 0.333)",
	width: "100vw",
	height: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}

const useStyles = makeStyles({
	contentContainer: {
		borderRadius: "4.5px",
		backgroundColor: "#FFFFFF",
		padding: "15px 10px",
		position: "relative",
	},
	closeModalBtn: {
		position: "absolute",
		top: 0,
		right: 0,
		borderRadius: "50%",
		width: 30,
		height: 30,
		backgroundColor: "rgba(200, 50, 50, 1)",
		transform: "translate(50%, -50%)",

		"&:hover": {
			backgroundColor: "rgba(240, 70, 70, 1)",
		},

		"& svg": {
			fill: "#FFFFFF",
		},
	},
})

export const ModalContext = createContext()

const ModalContainer = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [contentRender, setContentRender] = useState(null)
	const [closeCallback, setCloseCallback] = useState(() => {})

	const styles = useStyles()

	const handleClose = useCallback(() => {
		console.log("tra ta ta")
		setIsOpen(false)
		setContentRender(null)
		if (closeCallback) closeCallback()
		setCloseCallback(null)
	}, [closeCallback])

	const handleClickAway = useCallback(() => {
		console.log(`click away`)
		setIsOpen(false)
		setContentRender(null)
	}, [])

	const context = useMemo(
		() => ({
			setContentRender,
			handleClose,
			setIsOpen,
			setCloseCallback,
		}),
		[handleClose, setContentRender]
	)

	return (
		<ModalContext.Provider value={context}>
			{children}

			{
				<Modal open={isOpen} onClose={handleClose}>
					<Box sx={boxStyles}>
						<Grid container justifyContent="center">
							<ClickAwayListener onClickAway={handleClickAway}>
								<Grid item xs="auto" className={styles.contentContainer}>
									<IconButton
										onClick={handleClose}
										className={styles.closeModalBtn}
									>
										<Close />
									</IconButton>
									<>
										{/* <ReauthPassword /> */}
										{contentRender}
									</>
								</Grid>
							</ClickAwayListener>
						</Grid>
					</Box>
				</Modal>
			}
		</ModalContext.Provider>
	)
}

ModalContainer.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ModalContainer
