export const INITIAL_USER_OBJ = {
  username: "",
  fullName: "",
  email: "",
  role: "",
};

export const PASSWORD_REQUIREMENTS = [
  {
    id: 1,
    text: "• At least 8 characters & no special characters",
    regex: /.{8,}/,
  },
  { id: 2, text: "• At least 1 uppercase letter", regex: /[A-Z]/ },
  {
    id: 3,
    text: "• At least 4 numbers",
    regex: /^(?=(?:\D*\d){4})[a-zA-Z0-9]*$/,
  },
];

export const INITIAL_UPDATE_PASSWORD_OBJ = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const INITIAL_LOGIN_OBJ = {
  username: "",
  password: "",
};

export const INITIAL_STUDENT_OBJ = {
  studentIdNumber: "",
  lastName: "",
  firstName: "",
  middleInitial: "N/A",
  programId: "",
  birthDate: "",
  guardian: "",
  guardianContact: "",
  address: "",
};

export const INITIAL_SCHOOL_YEAR_OBJ = {
  schoolYearFrom: "",
  schoolYearTo: "",
};

export const INITIAL_DEPARTMENT_OBJ = {
  departmentName: "",
};

export const INITIAL_PROGRAM_OBJ = {
  programName: "",
  departmentId: "",
};

export const SEMESTERS_LIST = ["First Semester", "Second Semester", "Summer"];
