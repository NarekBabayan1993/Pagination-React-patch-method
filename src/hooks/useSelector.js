import { GlobalContext } from "../Context";
import { useContext } from "react";

function useSelector(callback) {
	const contextValue = useContext(GlobalContext)
	return callback ? callback(contextValue.state) : contextValue.state
}

export default useSelector;