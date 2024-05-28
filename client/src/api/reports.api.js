import axios from 'axios';

export async function getPaginatedPrintedIdsReport({ forQueryingData }) {
  return await axios.post('/api/reports/all', forQueryingData);
}

export async function releaseID({ printId }) {
  return await axios.patch(`/api/printing/release/${printId}`);
}

export async function deletePrintTransaction({ printId }) {
  return await axios.delete(`/api/printing/delete/${printId}`);
}
