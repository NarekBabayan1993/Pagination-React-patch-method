import { useEffect, useMemo, useReducer } from "react"
import { GlobalContext } from "./Context"
import {
	initialState,
	reducer,
	setupUsers,
	loadingFalse,
	loadingTrue,
	setUserCurrentId,
	setError
} from "./stores/main"
import Loading from "./Loading"
import Error from "./Error"
import NoData from "./NoData"
import axios from "axios"
import UserNavigation from "./UserNavigation"
import EditUserHoc from "./hocs/editUserHoc"
import UserForm from "./UserForm"

const URL = "https://jsonplaceholder.typicode.com/users";



const WrappedByEditUserHoc = EditUserHoc(UserForm)

function Page() {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		dispatch(loadingTrue())
		axios.get(URL)
			.then(response => {
				dispatch(setupUsers(response.data))
				if (response.data.length > 0) {
					dispatch(setUserCurrentId(response.data[0].id))
				}
			})
			.catch(error => {
				dispatch(setError(error))
			})
			.finally(() => {
				dispatch(loadingFalse())
			})
	}, [dispatch])

	const store = { state, dispatch }

	return (
		<GlobalContext.Provider value={store}>
			{
				state.isLoading
					? <Loading />
					: state.error
						? <Error />
						: state.users.length === 0
							? <NoData />
							: (
								<>
									<UserNavigation/>
									<WrappedByEditUserHoc />
								</>
							)
			}
		</GlobalContext.Provider>
	)

}

export default Page