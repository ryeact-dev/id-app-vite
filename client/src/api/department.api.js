import axios from 'axios';

export async function getDepartments() {
  return await axios.get('/api/department/all');
}

export async function addDepartment({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/department/add', forAddingData);
  } else return await axios.patch('/api/department/update', forAddingData);
}
