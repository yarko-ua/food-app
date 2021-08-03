import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom'
import { CircularProgress, Grid } from '@material-ui/core';
import { getProduct } from './productSlice';
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination ]);

export const Product = ({match, ...props}) => {

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
    <>
      <Link to={props.history.location.state || '/app' } >
          <ArrowBackIcon/>
      </Link>
        { product ? 
          <div>
            <h1>{product.product}</h1>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{clickable: true}}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {product.photos && product.photos.map( (photo, i) => {
                return (
                  <SwiperSlide key={i} >
                    <img src={photo} alt="" />
                  </SwiperSlide>
                )
              })} 
            </Swiper>

          </div>
          :
          <div>Not found</div>
        }
    </>
  )
}