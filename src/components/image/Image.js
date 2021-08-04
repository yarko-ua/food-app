import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    position: props => (props.type === 'absolute' ? 'absolute' : 'static'),
    top: 0,
    left: 0,
    width: props => (props.type === 'absolute' ? '100%' : 'initial'),
    maxWidth: '100%',
    height: props => (props.type === 'absolute' ? '100%' : 'auto'),
    objectFit: props => (props.type === 'absolute' ? 'cover' : 'initial'),
  }
})

export const Image = props => {

  const styles = useStyles(props)

  return <img src={props.src} alt={props.alt} className={styles.root} />
}