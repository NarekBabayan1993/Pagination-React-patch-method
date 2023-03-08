import { deepCopy } from "../utils";

const FULL_UPDATE = "FULL_UPDATE";
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_ADDRESS = "UPDATE_ADDRESS";
const UPDATE_COMPANY = "UPDATE_COMPANY";

export const fullUpdate = (data) => ({ type: FULL_UPDATE, payload: data })
export const updateName = (name) => ({ type: UPDATE_NAME, payload: name })
export const updateEmail = (email) => ({ type: UPDATE_EMAIL, payload: email })
export const updateAddress = (address) => ({ type: UPDATE_ADDRESS, payload: address })
export const updateCompany = (company) => ({ type: UPDATE_COMPANY, payload: company })

export function reducer(state, action) {
	switch (action.type) {
		case FULL_UPDATE:
			return deepCopy(action.payload)
		case UPDATE_NAME:
			return {
				...state,
				name: action.payload
			}
		case UPDATE_EMAIL:
			return {
				...state,
				email: action.payload
			}
		case UPDATE_ADDRESS:
			return {
				...state,
				address: {
					...state.address,
					street: action.payload
				}
			}
		case UPDATE_COMPANY:
			return {
				...state,
				company: {
					...state.company,
					name: action.payload
				}
			}
		default: return state;
	}
}