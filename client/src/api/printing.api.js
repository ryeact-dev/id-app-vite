import axios from 'axios';

export async function getPaginatedPrintedIds({
  schoolYearId,
  semesterId,
  searchQuery = '',
  page = 0,
  limit = 10,
}) {
  return await axios.get(
    `/api/printing/all?searchQuery=${searchQuery}&schoolYearId=${schoolYearId}&semesterId=${semesterId}&page=${page}&limit=${limit}`
  );
}

export async function addUpdatePrintId({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/printing/add', forAddingData);
  } else return await axios.patch('/api/printing/update', forAddingData);
}

export async function releaseID({ printId }) {
  return await axios.patch(`/api/printing/release/${printId}`);
}

export async function deletePrintTransaction({ printId }) {
  return await axios.delete(`/api/printing/delete/${printId}`);
}
