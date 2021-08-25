import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom'
import { CircularProgress, Grid, makeStyles, TextField } from '@material-ui/core';
import { getProduct } from './productSlice';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { Image } from '../../components/image/Image';
import { Rating } from '@material-ui/lab';
import { BackToPrevious } from '../../components/backTo/BackTo';

SwiperCore.use([Navigation, Pagination ]);

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    width: '100%'
  },
  slide: {
   position: 'relative',
   width: '100%',
   paddingBottom: '54%'
  }
})

export const Product = ({match, ...props}) => {

  const styles = useStyles();

  const loading = useSelector(state => state.product.loading)
  const product = useSelector(state => state.product.data)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getProduct(match.params.productID))  

    // return () => {
    //   cleanup
    // }
  }, [dispatch, match.params.productID])

  console.log(`product`, product)

  if (loading) return <CircularProgress />

  return (
    <div className={styles.root}>
      <BackToPrevious />
        { product ? 
            <Grid container spacing={2} >
              <Grid item xs={5} >
                  {
                    product.photos.length > 0 && 
                      <Swiper
                        slidesPerView='auto'
                        navigation
                        loop
                        loopedSlides={0}
                        pagination={{clickable: false}}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                      >
                        { product.photos.map( (photo, i) => {
                            return (
                              <SwiperSlide key={i} className={styles.slide} >
                                <Image src={photo} type="absolute" />
                              </SwiperSlide>
                            )
                          })
                        } 
                      </Swiper>
                  }
              </Grid>
              <Grid item xs={7} >
                  <h1>{product.name}</h1>
                  <Rating value={product.rating} readOnly size="large"/>
                  <TextField multiline value={product.description} />
                  Reviewer: {product.reviewer}
              </Grid>
            </Grid>
          :
          <div>Not found</div>
        }
    </div>
  )
}