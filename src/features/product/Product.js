import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import {Link, useHistory} from 'react-router-dom'
import {
	CircularProgress,
	Grid,
	makeStyles,
	TextField,
} from "@material-ui/core"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination } from "swiper"

import "swiper/swiper.scss"
import "swiper/components/navigation/navigation.scss"
import "swiper/components/pagination/pagination.scss"
import Image from "components/image/Image"
import { Rating } from "@material-ui/lab"
import BackToPrevious from "components/backTo/BackTo"
import UrlSearchParamToggler from "components/urlSearchParamToggler/UrlSearchParamToggler"
import { getProduct } from "./productSlice"

SwiperCore.use([Navigation, Pagination])

const useStyles = makeStyles({
	root: {
		maxWidth: "100%",
		width: "100%",
	},
	slide: {
		position: "relative",
		width: "100%",
		paddingBottom: "54%",
	},
})

const Product = ({
	match: {
		params: { productID },
	},
	location: { search },
	...props
}) => {
	const styles = useStyles()

	const loading = useSelector((state) => state.product.loading)
	const product = useSelector((state) => state.product.current)
	const dispatch = useDispatch()
	const [description, setDescription] = useState("")

	console.log(`props`, props)

	console.log(`search`, search)
	console.log(`search.match(/edit/)`, search.match(/edit/))

	const isEdit = search.match(/edit/)

	const handleDescription = useCallback((e) => {
		setDescription(e.target.value)
	}, [])

	useEffect(() => {
		if (!product) dispatch(getProduct(productID))

		if (product) setDescription(product.description)

		// return () => {
		//   cleanup
		// }
	}, [dispatch, productID, product])

	console.log(`product`, product)

	if (loading) return <CircularProgress />

	return (
		<div className={styles.root}>
			<BackToPrevious />
			{product ? (
				<Grid container spacing={2}>
					<Grid item xs={5}>
						{product.photos && product.photos.length > 0 && (
							<Swiper
								slidesPerView="auto"
								navigation
								loop
								loopedSlides={0}
								pagination={{ clickable: false }}
								onSlideChange={() => console.log("slide change")}
								onSwiper={(swiper) => console.log(swiper)}
							>
								{product.photos.map((photo) => (
									<SwiperSlide key={photo} className={styles.slide}>
										<Image src={photo} type="absolute" />
									</SwiperSlide>
								))}
							</Swiper>
						)}
					</Grid>
					<Grid item xs={7}>
						<div>
							<h1 style={{ display: "inline-block" }}>{product.name}</h1>
							<UrlSearchParamToggler param="edit" />
						</div>
						<div>Reviewer: {product.reviewer}</div>
						<div>
							<Rating
								value={+product.rating}
								name="rating"
								readOnly={!isEdit}
								size="large"
							/>
						</div>
						<TextField
							disabled={!isEdit}
							multiline
							value={description}
							onChange={handleDescription}
						/>
					</Grid>
				</Grid>
			) : (
				<div>Not found</div>
			)}
		</div>
	)
}

Product.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			productID: PropTypes.string.isRequired,
		}),
	}).isRequired,
	location: PropTypes.shape({
		search: PropTypes.string,
	}).isRequired,
}

export default Product
