import axios from 'axios';

export async function getAllSchoolYear() {
  return await axios.get('/api/school-year/all');
}

export async function addSchoolYear({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/school-year/add', forAddingData);
  } else return await axios.patch('/api/school-year/update', forAddingData);
}

export async function schoolYearToggleStatus({ forUpdatingData }) {
  return await axios.patch('/api/school-year/toggle', forUpdatingData);
}

export async function deleteSchoolYear({ id }) {
  return await axios.delete(`/api/school-year/delete/${id}`);
}
