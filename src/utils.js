export const deepCopy = obj => {
	if (obj === null || obj === undefined) {
		return obj
	}
	const copyObj = {};
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === 'object') {
			copyObj[key] = deepCopy(obj[key])
		} else {
			copyObj[key] = obj[key]
		}
	})
	return copyObj;
}