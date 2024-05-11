const { prisma } = require('../lib/utils/prismaClient');
const { connect } = require('../routes/student.route');

// Get All Users
async function getPaginatedStudents(req, res, next) {
  const { searchQuery, page, limit } = req.query;

  try {
    const listOfStudents = await prisma.student.findMany({
      where: {
        OR: [
          { firstName: { contains: searchQuery } },
          { lastName: { contains: searchQuery } },
          { idNumber: { contains: searchQuery } },
        ],
      },
      skip: Number(page) * Number(limit),
      take: Number(limit),
      include: {
        program: {
          program: true,
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
        },
      },
      orderBy: { idNumber: 'asc' },
    });

    console.log(listOfStudents);

    res.json(listOfStudents);
  } catch (err) {
    err.title = 'GET all departments';
    next(err);
  }
}

// Add Student
async function addStudent(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const foundStudentIdNumber = await prisma.student.findFirst({
      where: {
        idNumber: req.body.idNumber,
      },
    });

    if (foundStudentIdNumber !== null)
      return res.status(400).send('Student ID Number already exists');

    const foundStudentName = await prisma.student.findFirst({
      where: {
        AND: [
          { firstName: req.body.firstName },
          { middleInitial: req.body.middleInitial },
          { lastName: req.body.lastName },
        ],
      },
    });

    if (foundStudentName !== null)
      return res.status(400).send('Student Name already exists');

    await prisma.student.create({
      data: {
        ...req.body,
        userId,
      },
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

// Add Department
async function updateDepartment(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const foundDepartment = await prisma.department.findFirst({
      where: {
        AND: [{ department: req.body.department, id: { not: req.body.id } }],
      },
    });

    if (foundDepartment !== null)
      return res.status(400).send('Department already exists');

    await prisma.department.update({
      where: {
        id: req.body.id,
      },
      data: {
        department: req.body.department,
      },
    });

    res.status(200).send(`${req.body.department} successfully updated`);
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
exports.updateDepartment = updateDepartment;
exports.deleteDepartment = deleteDepartment;
