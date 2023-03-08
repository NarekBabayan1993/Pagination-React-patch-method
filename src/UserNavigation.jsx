import useDispatcher from "./hooks/useDispatcher";
import useSelector from "./hooks/useSelector";
import { setUserCurrentId, previusButton, nextButton } from "./stores/main";

const UserNavigation = () => {
	const users = useSelector((state) => state.users);
	const currentUserId = useSelector((state) => state.currentUserId);
	const dispatch = useDispatcher();

	const disabledLeftbtn =  currentUserId <= users[0].id;
	const disabledRightbtn =  currentUserId >= users.length;

	return (
		<header className="header flex flex-row flex-justify-center flex-align-center mt-50">
			<nav className="header__navigation flex flex-row flex-justify-center flex-align-center flex-equal">
				<button
					className={
						"header__navigation__nav__button header__navigation__nav__button__prev"
						+ (disabledLeftbtn ? " header__navigation__nav__button__disabled" : "")
					}
					onClick={() => {
						!disabledLeftbtn && dispatch(previusButton())
					}}
				></button>
				<ul className="header__navigation__list flex flex-row flex-justify-center flex-align-center flex-equal">
					{
						users.map((user) => {
							return (
								<li
									key={user.id}
									className={
										"header__navigation__element" +
										(user.id === currentUserId
											? " header__navigation__element-active"
											: "")
									}
								>
									<button
										className="header__navigation__button pt-10 pb-10 pl-20 pr-20"
										onClick={() => dispatch(setUserCurrentId(user.id))}
									>
										{user.name}
									</button>
								</li>
							);
						})
					}
				</ul>
				<button
					className={
						"header__navigation__nav__button header__navigation__nav__button__next"
						+ (disabledRightbtn ? " header__navigation__nav__button__disabled" : "")
					}
					onClick={() => {
						!disabledRightbtn && dispatch(nextButton())
					}}
				></button>
			</nav>
		</header>
	);
};

export default UserNavigation;
