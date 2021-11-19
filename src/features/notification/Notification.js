import { useCallback, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import "react-toastify/dist/ReactToastify.css"
import { resetToast } from "./notificationSlice"

const Notification = () => {
	const { type, show, message } = useSelector((state) => state.notification)
	const dispatch = useDispatch()

	const handleClose = useCallback(() => {
		dispatch(resetToast())
	}, [dispatch])

	useEffect(() => {
		if (show) {
			toast[type](message, {
				onClose: handleClose,
			})
		}
	}, [show, type, message, handleClose])

	return (
		<ToastContainer
			position="bottom-right"
			newestOnTop
			pauseOnHover={false}
			autoClose={5000}
			closeOnClick
			draggable
		/>
	)
}

export default Notification
