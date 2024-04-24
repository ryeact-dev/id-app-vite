import axios from 'axios';

export async function getCurrentUser() {
  try {
    return await axios.get('/api/user/current');
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUsers({ fullName }) {
  return await axios.get(`/api/user/all?fullname=${fullName}`);
}

export async function loginUser({ forLoginData }) {
  return await axios.post('/api/user/login', forLoginData);
}

export async function addUser({ forAddingData, isNew }) {
  if (!isNew) {
    return await axios.patch('/api/user/update', forAddingData);
  } else {
    return await axios.post('/api/user/add', forAddingData);
  }
}

export async function toggleUserStatus({ forUpdatingData }) {
  return await axios.patch('/api/user/toggle-status', forUpdatingData);
}

export async function deleteUser({ userId }) {
  return await axios.delete(`/api/user/delete/${userId}`);
}
