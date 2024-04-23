import axios from 'axios';

export async function loginUser({ forLoginData }) {
  return await axios.post('/api/user/login', forLoginData);
}

export async function addUser({ forAddingData }) {
  return await axios.post('/api/user/add', forAddingData);
}
