import { useCallback, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css'
import { resetToast } from './notificationSlice'

export const Notification = () => {
  const type = useSelector(state => state.notification.type)
  const show = useSelector(state => state.notification.show)
  const message = useSelector(state => state.notification.message)
  const dispatch = useDispatch()

  const handleClose = useCallback(() => {
    dispatch(resetToast())
  }, [])

  useEffect(() => {
    if (show) {
      toast[type](message, {
        onClose: handleClose
      })
    }
  }, [show, type, message, handleClose])

  return <ToastContainer
    position="bottom-right"
    newestOnTop={true}
    pauseOnHover={true}
    autoClose={5000}
    closeOnClick
    draggable
  />
}