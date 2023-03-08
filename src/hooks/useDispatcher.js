import { GlobalContext } from "../Context";
import { useContext } from "react";

function useDispatcher() {
	const contextValue = useContext(GlobalContext)
	return contextValue.dispatch
}

export default useDispatcher;