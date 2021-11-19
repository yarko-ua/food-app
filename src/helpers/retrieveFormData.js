const retrieveFormData = (form) => {
	const formData = new FormData(form)
	const data = {}

	const keys = formData.keys()

	if (keys && keys.length) {
		keys.forEach((key) => {
			if (formData.getAll(key).length > 1) {
				if (!data[key]) data[key] = formData.getAll(key)
			} else {
				data[key] = formData.get(key)
			}
		})
	}

	// for (const key of formData.keys()) {
	// 	if (formData.getAll(key).length > 1) {
	// 		if (data[key]) continue
	// 		data[key] = formData.getAll(key)
	// 	} else {
	// 		data[key] = formData.get(key)
	// 	}
	// }

	return data
}

export default retrieveFormData
