import axios from 'axios';

export async function getAllPrograms() {
  return await axios.get('/api/program/all');
}

export async function addProgram({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/program/add', forAddingData);
  } else return await axios.patch('/api/program/update', forAddingData);
}

export async function deleteProgram({ id }) {
  return await axios.delete(`/api/program/delete/${id}`);
}
