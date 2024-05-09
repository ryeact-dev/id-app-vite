import axios from 'axios';

export async function getAllSemesterDates() {
  return await axios.get(`/api/semester/all`);
}

export async function setSemesterDates({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/semester/add', forAddingData);
  } else return await axios.patch('/api/semester/update', forAddingData);
}

export async function toggleSemesterStatus({ forUpdatingData }) {
  return await axios.patch('/api/semester/toggle', forUpdatingData);
}
