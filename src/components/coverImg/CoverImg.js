import { CircularProgress, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useState, useEffect } from 'react'
import notFound from '../../images/image-not-found.jpg'


const useStyles = makeStyles({
  wrapper: {
    // overflow: 'hidden',
    // bor
    background: 'rgba(220,220,220,0.05)',
    padding: props => props.innerGap,
    margin: props => props.outerGap,
    borderRadius: props => props.rounded,
    width: props => props.cover ? '100%' : 'initial',
    height: props => props.cover ? '100%' : 'initial',
  },
  img: {
    maxWidth: '100%',
    width: props => props.cover ? '100%' : 'initial',
    height: props => props.cover ? '100%' : 'auto',
    objectFit: props => props.cover ? 'cover' : 'initial',
    borderRadius: props => props.rounded,
    
  }
})

export const CoverImg = ({
  src, 
  alt = '', 
  width, 
  height, 
  rounded = false, 
  innerGap = 0, 
  outerGap = 0, 
  cover = false
}) => {
  const styles = useStyles({rounded, innerGap, outerGap, cover})
  const [source, setSource] = useState(false)

  useEffect(() => {
    if (!source || source !== src) {
      const image = new Image()
      image.src = src
      image.addEventListener('load', _ => {
        console.log(`load _`, _)
        setSource(src)
      })
      image.addEventListener('error', _ => {
        console.log(`error _`, _)
        setSource(notFound)
      })
    }
  }, [source, src])

  return (
    <>
      { 
        source ?
          <Container disableGutters={true} className={styles.wrapper}>
            <img src={source} alt={alt} className={styles.img} /> 
          </Container> 
          : <CircularProgress />  
      }
    </>
  )
}