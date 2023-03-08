import useSelector from "../hooks/useSelector";
import useDispatcher from "../hooks/useDispatcher";
import {
	useEffect,
	useReducer,
	useState
} from "react";
import {
	updateUser
} from "../stores/main";
import {
	reducer,
	fullUpdate,
	updateName,
	updateEmail,
	updateCompany,
	updateAddress,
} from "../stores/editUseStor";
import ModalYesNo from "../modals/ModalYesNo";
import axios from "axios";

const HTTP_STATUSES = {
	SUCCESS: 200,
	BAD_REQUEST: 400,
	NO_AUTH: 401,
	NO_DATA: 404,
	FORBIDDEN: 403
}

const EditUserHoc = (Component) => {
	const WrappedByEditUserHoc = () => {
		const currentUserId = useSelector((state) => state.currentUserId);
		const users = useSelector((state) => state.users);
		const currentUser = users.find((user) => user.id === currentUserId);
		const mainDispatcher = useDispatcher();
		const [editUser, dispatch] = useReducer(reducer, null);
		const [modalConfig, setModalConfig] = useState(null);
		const [otherModalConfig, setOtherModalConfig] = useState(null)


		const updateAllUsers = async () => {
			try {
				const response = await axios.patch(`https://jsonplaceholder.typicode.com/users/${currentUserId}`, editUser)
				if(response.status === HTTP_STATUSES.SUCCESS && typeof callback === 'function') {
					return true
				}
			} catch (error) {
				console.log(error);
			}
			return false
		}

		const onReset = (e) => {
			e.stopPropagation();
			e.preventDefault();
			setModalConfig({
				text: "Դուք ցանկանում եք չեղարկել?",
				onNo: () => setModalConfig(null),
				onYes: () => {
					dispatch(fullUpdate(currentUser));
					setModalConfig(null)
				}
			})
		};

		const onSubmit = (e) => {
			e.stopPropagation();
			e.preventDefault();
			setModalConfig({
				text: "Դուք ցանկանում եք ուղարկել?",
				onNo: () => setModalConfig(null),
				onYes: () => {
					setOtherModalConfig({
						text: "Hastat?",
						onNo: () => {
							setOtherModalConfig(null)
						},
						onYes: () => {
							updateAllUsers()
							.then(retVal => {
								if (retVal) {
									mainDispatcher(updateUser(editUser))
								}
							})
							.finally(() => {
								setModalConfig(null)
								setOtherModalConfig(null)
							})
						}
					})
				}
			})
		};


		useEffect(() => {
			dispatch(fullUpdate(currentUser));
		}, [currentUser]);

		if (!editUser) {
			return null;
		}

		const inputConfigList = [{
			name: "name",
			text: "Name",
			type: "text",
			value: editUser.name,
			handlers: {
				onChange: (e) => {
					dispatch(updateName(e.target.value));
				},
			},
		},
		{
			name: "email",
			text: "Email",
			type: "email",
			value: editUser.email,
			handlers: {
				onChange: (e) => {
					dispatch(updateEmail(e.target.value));
				},
			},
		},
		{
			name: "addressStreet",
			text: "Address Street",
			type: "text",
			value: editUser.address.street,
			handlers: {
				onChange: (e) => {
					dispatch(updateAddress(e.target.value));
				},
			},
		},
		{
			name: "companyName",
			text: "Company Name",
			type: "text",
			value: editUser.company.name,
			handlers: {
				onChange: (e) => {
					dispatch(updateCompany(e.target.value));
				},
			},
		},
		];

		return (
			<>
				<Component
					inputConfigList={inputConfigList}
					onSubmitText="Submit"
					onSubmit={onSubmit}
					onResetText="Reset"
					onReset={onReset}
				>
					{
						otherModalConfig ? <ModalYesNo num={true} {...otherModalConfig} /> : null
					}
				</Component>
				{
					modalConfig ? <ModalYesNo {...modalConfig} /> : null
				}
			</>
		);
	};

	return WrappedByEditUserHoc;
};

export default EditUserHoc;
