import axios from 'axios';

export async function getPaginatedPrintedIds({
  searchQuery = '',
  page = 0,
  limit = 10,
}) {
  return await axios.get(
    `/api/printing/all?searchQuery=${searchQuery}&page=${page}&limit=${limit}`
  );
}

export async function addUpdatePrintId({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/printing/add', forAddingData);
  } else return await axios.patch('/api/printing/update', forAddingData);
}

export async function deleteUser({ userId }) {
  return await axios.delete(`/api/printing/delete/${userId}`);
}
