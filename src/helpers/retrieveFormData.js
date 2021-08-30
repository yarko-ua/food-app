export const retrieveFormData = form => {
  const formData = new FormData(form);
  const data = {};

  for (let key of formData.keys() ) {
    if (formData.getAll(key).length > 1) {
      if (data[key]) continue;
      data[key] = formData.getAll(key);
    } else {
      data[key] = formData.get(key);
    }
  }

  return data
}