import axios from 'axios';

export async function getPaginatedPrintedIdsReport({ forQueryingData }) {
  return await axios.post('/api/reports/all-printed-ids', forQueryingData);
}

export async function getPaginatedValidatedIdsReport({ forQueryingData }) {
  return await axios.post('/api/reports/all-validated-ids', forQueryingData);
}
