import {
  addEditStudent,
  getPaginatedStudents,
  getStudentInfo,
} from '@/api/student.api';
import { ToastNotification } from '@/common/toastNotification/ToastNotification';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const mappedStudentInfo = (studentInfo) => {
  const mappedData = studentInfo.map((student) => {
    console.log(studentInfo);

    return {
      studentIdNumber: student.ID_No,
      lastName: student.LName,
      firstName: student.FName,
      middleName: student.MName,
      program: student.Course,
      birthDate: student.BDate,
      gender: student.Gender,
      guardian: student.ConName,
      guardianContact: student.ContactNo,
      address: student.Address,
    };
  });

  return mappedData;
};

// Queries
export function useGetPaginatedStudents(searchQuery, page, limit) {
  return useQuery({
    queryKey: ['list-of-students', searchQuery, limit, page],
    placeholderData: keepPreviousData,
    queryFn: () => getPaginatedStudents({ searchQuery, limit, page }),
    select: ({ data }) => {
      return data;
    },
  });
}

// export function useGetMySqlStudentInfo(studentId) {
//   const query = () => getStudentInfo({ studentId });

//   console.log(query);

// return useQuery({
//   queryKey: ['mysql-student-info'],
//   queryFn: () => getStudentInfo({ studentId }),
//   select: ({ data }) => {
//     if (!data.message) {
//       const studentInfo = mappedStudentInfo(data.studentInfo);
//       return studentInfo;
//     } else {
//       ToastNotification('error', data.message);
//       return {};
//     }
//   },
//   enabled: false,
//   refetchOnWindowFocus: false,
// });
// }

// Mutations
export function useAddStudent(closeModal) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEditStudent,
    onError: ({ response }) => ToastNotification('error', response.data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['list-of-students'] });
      queryClient.invalidateQueries({ queryKey: ['list-of-printed-ids'] });
      ToastNotification('success', data);
      closeModal();
    },
  });
}

// export function useSemesterToggleStatus() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: toggleSemesterStatus,
//     onError: ({ response }) => ToastNotification('error', response.data),
//     onSuccess: ({ data }) => {
//       queryClient.invalidateQueries({ queryKey: ['list-of-semester'] });
//       ToastNotification('success', data);
//     },
//   });
// }
