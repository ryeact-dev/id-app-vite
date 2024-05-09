const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getSemesterDates(req, res, next) {
  try {
    const semesterDates = await prisma.semester.findMany({
      where: {
        schoolYearId: req.params.id,
      },
      orderBy: {
        semestralDateStart: 'asc',
      },
    });

    res.json(semesterDates);
  } catch (err) {
    err.title = 'GET all departments';
    next(err);
  }
}

// Add Department
async function addSemesterDates(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    // const foundStartDate = await prisma.semester.findFirst({
    //   where: {
    //    semestralDateStart: req.body.semestralDateStart,
    //   },
    // });

    // if (foundStartDate !== null)
    //   return res.status(400).send('Department already exists');

    const { schoolYearId, ...rest } = req.body;

    await prisma.semester.create({
      data: {
        ...rest,
        schoolYear: { connect: { id: schoolYearId } },
        user: { connect: { id: userId } },
      },
    });

    res.status(200).send(`${req.body.semester} successfully set`);
  } catch (err) {
    err.title = 'POST Semester Dates';
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

exports.getSemesterDates = getSemesterDates;
exports.addSemesterDates = addSemesterDates;
exports.deleteDepartment = deleteDepartment;
