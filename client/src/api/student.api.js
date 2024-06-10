import axios from 'axios';

export async function getPaginatedStudents({
  searchQuery = '',
  page = 0,
  limit = 10,
}) {
  return await axios.get(
    `/api/student/all?searchQuery=${searchQuery}&page=${page}&limit=${limit}`
  );
}

export async function addEditStudent({ forAddingData, isNew }) {
  if (isNew) {
    return await axios.post('/api/student/add', forAddingData);
  } else return await axios.patch('/api/student/update', forAddingData);
}

export async function deleteUser({ userId }) {
  return await axios.delete(`/api/student/delete/${userId}`);
}

// FETCH STUDENT INFO FROM MYSQL DATABASE
export async function getStudentInfo({ studentId }) {
  return await axios.get(`/api/mysql/student-info/${studentId}`);
}
