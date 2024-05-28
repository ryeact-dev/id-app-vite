const { uploadedPhoto } = require('../lib/helpers/photos');
const { prisma } = require('../lib/utils/prismaClient');
const { connect } = require('../routes/student.route');

// Get All Users
async function getPaginatedStudents(req, res, next) {
  const { searchQuery, page, limit } = req.query;

  try {
    const [paginatedStudents, totalStudents] = await prisma.$transaction([
      prisma.student.findMany({
        where: {
          OR: [
            { firstName: { contains: searchQuery } },
            { lastName: { contains: searchQuery } },
            { studentIdNumber: { contains: searchQuery } },
          ],
        },
        skip: Number(page) * Number(limit),
        take: Number(limit),
        // Include the program name, user name, and updated user name
        include: {
          program: {
            select: {
              programName: true,
            },
          },
          user: {
            select: {
              fullName: true,
              createdAt: true,
            },
          },
          studentUpdate: {
            include: {
              user: {
                select: {
                  fullName: true,
                },
              },
            },
            // Sort the updated records in descending order
            orderBy: { updatedDate: 'desc' },
          },
        },
        // Sort Student ID Numbers in ascending order
        orderBy: { studentIdNumber: 'asc' },
      }),
      prisma.student.count({
        where: {
          OR: [
            { firstName: { contains: searchQuery } },
            { lastName: { contains: searchQuery } },
            { studentIdNumber: { contains: searchQuery } },
          ],
        },
      }),
    ]);

    const studentsCount = Number(page + 1) * paginatedStudents.length;
    const hasMore =
      studentsCount < totalStudents && paginatedStudents.length > 0;

    res.json({ paginatedStudents, studentsCount, totalStudents, hasMore });
  } catch (err) {
    err.title = 'GET Paginated Students';
    next(err);
  }
}

// Add Student
async function addStudent(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const {
      photoUrl,
      esignUrl,
      studentIdNumber,
      firstName,
      middleInitial,
      lastName,
    } = req.body;

    const foundStudentIdNumber = await prisma.student.findFirst({
      where: {
        studentIdNumber,
      },
    });

    if (foundStudentIdNumber !== null)
      return res.status(400).send('Student ID Number already exists');

    const foundStudentName = await prisma.student.findFirst({
      where: {
        AND: [{ firstName }, { middleInitial }, { lastName }],
      },
    });

    if (foundStudentName !== null)
      return res.status(400).send('Student Name already exists');

    const multerPhoto = req.files['photoUrl']
      ? await uploadedPhoto(
          req.files['photoUrl'][0],
          photoUrl,
          studentIdNumber,
          false
        )
      : photoUrl;

    const multerEsign = req.files['esignUrl']
      ? await uploadedPhoto(
          req.files['esignUrl'][0],
          esignUrl,
          studentIdNumber,
          true
        )
      : esignUrl;

    const { schoolYearId, semesterId, ...rest } = req.body;

    await prisma.$transaction(async (tx) => {
      const addStudent = await tx.student.create({
        data: {
          ...rest,
          birthDate: new Date(req.body.birthDate),
          esignUrl: multerEsign,
          photoUrl: multerPhoto,
          userId,
        },
      });

      // Add the new student to the printing table
      await tx.printing.create({
        data: {
          studentIdNumber: addStudent.studentIdNumber,
          student: {
            connect: { id: addStudent.id },
          },
          schoolYear: {
            connect: { id: schoolYearId },
          },
          semester: {
            connect: {
              id: semesterId,
            },
          },
        },
      });
    });

    res
      .status(200)
      .send(
        `${req.body.firstName} ${req.body.middleInitial} ${req.body.lastName} successfully added`
      );
  } catch (err) {
    err.title = 'POST Student';
    next(err);
  }
}

// Update Student Info
async function updateStudent(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const {
      id,
      photoUrl,
      esignUrl,
      studentIdNumber,
      firstName,
      middleInitial,
      lastName,
    } = req.body;

    const foundStudentIdNumber = await prisma.student.findFirst({
      where: {
        AND: [{ studentIdNumber }, { id: { not: id } }],
      },
    });

    if (foundStudentIdNumber !== null)
      return res.status(400).send('Student ID Number already exists');

    const foundStudentName = await prisma.student.findFirst({
      where: {
        AND: [
          { firstName },
          { middleInitial },
          { lastName },
          { id: { not: id } },
        ],
      },
    });

    if (foundStudentName !== null)
      return res.status(400).send('Student Name already exists');

    const multerPhoto = req.files['photoUrl']
      ? await uploadedPhoto(
          req.files['photoUrl'][0],
          photoUrl,
          studentIdNumber,
          false
        )
      : photoUrl;

    const multerEsign = req.files['esignUrl']
      ? await uploadedPhoto(
          req.files['esignUrl'][0],
          esignUrl,
          studentIdNumber,
          true
        )
      : esignUrl;

    const [updatedStudent, studentUpdates] = await prisma.$transaction([
      prisma.student.update({
        where: { id },
        data: {
          ...req.body,
          birthDate: new Date(req.body.birthDate),
          esignUrl: multerEsign,
          photoUrl: multerPhoto,
        },
      }),
      prisma.studentUpdate.create({
        data: {
          student: {
            connect: {
              id,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      }),
    ]);

    res
      .status(200)
      .send(
        `${updatedStudent.firstName} ${updatedStudent.middleInitial} ${updatedStudent.lastName}' info successfully updated`
      );
  } catch (err) {
    err.title = 'PATCH Department';
    next(err);
  }
}

// Delete Department
async function deleteDepartment(req, res, next) {
  const { fullName } = req.user;

  try {
    const deletedDepartment = await prisma.department.delete({
      where: {
        id: req.params.id,
      },
    });

    console.log(
      `${
        deletedDepartment.department
      } successfully deleted by ${fullName} :: ${new Date().toDateString()}`
    );

    res
      .status(200)
      .send(`${deletedDepartment.department} successfully deleted`);
  } catch (err) {
    err.title = 'DELETE department';
    next(err);
  }
}

exports.getPaginatedStudents = getPaginatedStudents;
exports.addStudent = addStudent;
exports.updateStudent = updateStudent;
exports.deleteDepartment = deleteDepartment;
