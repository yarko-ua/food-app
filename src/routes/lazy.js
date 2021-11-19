import { lazy } from "react"

export const Recommendations = lazy(() =>
	import("features/app/recommendations/Recommendations")
)
export const Settings = lazy(() => import("features/app/settings/Settings"))
export const Friends = lazy(() => import("features/app/friends/Friends"))
export const UserList = lazy(() => import("features/app/userList/UserList"))
export const UserLists = lazy(() => import("features/app/userLists/UserLists"))
export const Profile = lazy(() => import("features/app/profile/Profile"))
export const ProfilePublic = lazy(() =>
	import("features/app/profile/ProfilePublic")
)
export const Product = lazy(() => import("features/product/Product"))
