import axios from 'axios';

export async function addUser({ forAddingData }) {
  return await axios.post('/api/user/add-user', forAddingData);
}
