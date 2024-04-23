import axios from 'axios';

export async function getCurrentUser() {
  try {
    return await axios.get('/api/user/current');
  } catch (err) {
    console.log(err);
  }
}

export async function loginUser({ forLoginData }) {
  return await axios.post('/api/user/login', forLoginData);
}

export async function addUser({ forAddingData }) {
  return await axios.post('/api/user/add', forAddingData);
}
