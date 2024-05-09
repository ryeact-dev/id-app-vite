import axios from 'axios';

export async function getAllUsers({ fullName }) {
  return await axios.get(`/api/user/all?fullname=${fullName}`);
}

export async function addEditStudent({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/student/add', forAddingData);
  } else return await axios.patch('/api/student/update', forAddingData);
}

export async function deleteUser({ userId }) {
  return await axios.delete(`/api/student/delete/${userId}`);
}
