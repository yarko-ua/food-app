import { createContext, useCallback, useMemo, useState } from 'react'
import { Box, ClickAwayListener, Grid, makeStyles, Modal } from "@material-ui/core"
import { useSelector } from 'react-redux'
import { Switch } from 'react-router'
import ReauthPassword from 'components/forms/reauthPassword/ReauthPassword'

const boxStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.333)',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const useStyles = makeStyles({
  contentContainer: {
    borderRadius: '4.5px',
    backgroundColor: '#FFFFFF',
    padding: '15px 10px'
  }
})

export const ModalContext = createContext();

const ModalContainer = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contentRender, setContentRender] = useState(null)
  const [closeCallback, setCloseCallback] = useState(()=>{})

  const styles = useStyles()

  const handleClose = useCallback(
    () => {
      console.log('tra ta ta');
      setIsOpen(false)
      setContentRender(null)
      closeCallback()
    },
    [closeCallback],
  )
  const handleClickAway = useCallback(
    () => {
      console.log(`click away`)
      setIsOpen(false)
      setContentRender(null)
    },
    [],
  )

  const context = useMemo(() => ({
    setContentRender,
    handleClose,
    setIsOpen,
    setCloseCallback
  }), [handleClose, setContentRender])

  return (
    <ModalContext.Provider value={context}>
      {children}

      {
        contentRender && <Modal
          open={isOpen}
          onClose={handleClose}
        >
          <Box sx={boxStyles}>
            <Grid container justifyContent="center">
                <ClickAwayListener 
                  onClickAway={handleClickAway} 
                >
              <Grid item xs="auto" className={styles.contentContainer}>
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

export default ModalContainer