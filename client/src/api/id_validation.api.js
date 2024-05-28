import axios from 'axios';

export async function getPaginatedValidations({
  schoolYearId,
  semesterId,
  searchQuery = '',
  page = 0,
  limit = 10,
}) {
  return await axios.get(
    `/api/id-validation/all?searchQuery=${searchQuery}&schoolYearId=${schoolYearId}&semesterId=${semesterId}&page=${page}&limit=${limit}`
  );
}

export async function addValidatedID({ forAddingData }) {
  return await axios.post('/api/id-validation/add', forAddingData);
}

export async function deleteUser({ userId }) {
  return await axios.delete(`/api/user/delete/${userId}`);
}
