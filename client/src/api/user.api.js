import axios from 'axios';

export async function getCurrentUser() {
  return await axios.get('/api/user/current');
}

export async function getAllUsers({ fullName, page, limit }) {
  return await axios.get(
    `/api/user/all?fullname=${fullName}&page=${page}&limit=${limit}`
  );
}

export async function loginUser({ forLoginData }) {
  return await axios.post('/api/user/login', forLoginData);
}

export async function logoutUser() {
  return await axios.post('/api/user/logout');
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
