import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import BackToPrevious from "components/backTo/BackTo"
import { userPublicSelector } from "selectors/user"
import { clearCurrentUser, getUserFullInfo } from "./profileSlice"

const ProfilePublic = ({ match }) => {
	const dispatch = useDispatch()
	const { userID = null } = match.params

	const user = useSelector(userPublicSelector)

	console.log(`userID`, userID)

	useEffect(() => {
		dispatch(getUserFullInfo(userID))
		return () => {
			dispatch(clearCurrentUser())
		}
	}, [dispatch, userID])

	return (
		<>
			<BackToPrevious />
			<div style={{ width: "100%" }}>Public Profile for User ID: {userID}</div>
			<br />
			<div>
				User Name : <b>{user.firstName}</b>
			</div>
		</>
	)
}

ProfilePublic.propTypes = {
	match: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ProfilePublic
