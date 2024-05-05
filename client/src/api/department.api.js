import axios from 'axios';

export async function getAllDepartments() {
  return await axios.get('/api/department/all');
}

export async function addDepartment({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/department/add', forAddingData);
  } else return await axios.patch('/api/department/update', forAddingData);
}

export async function deleteDepartment({ id }) {
  return await axios.delete(`/api/department/delete/${id}`);
}
