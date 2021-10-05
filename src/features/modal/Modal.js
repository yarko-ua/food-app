import { useCallback, useState } from 'react'
import { Box, Modal } from "@material-ui/core"
import { useSelector } from 'react-redux'
import { Switch } from 'react-router'

const ModalContainer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { renderPath } = useSelector(state => state.modal)

  const handleClose = useCallback(
    () => {
      console.log('tra ta ta');
      setIsOpen(false)
    },
    [],
  )

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Box>
        Test test modal
      </Box>
    </Modal>
  )
}

export default ModalContainer