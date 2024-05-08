const { prisma } = require('../lib/utils/prismaClient');

// Get List of School Year
async function getAllSchoolYear(req, res, next) {
  try {
    const listOfSchoolYear = await prisma.schoolYear.findMany({
      orderBy: {
        schoolYearTo: 'desc',
      },
    });

    res.json(listOfSchoolYear);
  } catch (err) {
    err.title = 'GET List of School Year';
    next(err);
  }
}

// Add School Year
async function addSchoolYear(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const foundDepartment = await prisma.schoolYear.findFirst({
      where: {
        schoolYearFrom: req.body.schoolYearFrom,
      },
    });

    if (foundDepartment !== null)
      return res.status(400).send('School Year already exists');

    await prisma.schoolYear.create({
      data: {
        ...req.body,
        userId,
      },
    });

    res
      .status(200)
      .send(
        `SY ${req.body.schoolYearFrom}-${req.body.schoolYearTo} successfully added`
      );
  } catch (err) {
    err.title = 'POST New School Year';
    next(err);
  }
}

async function schoolYearToggleStatus(req, res, next) {
  try {
    const [activeSchoolYear, inActiveSchoolYear] = await prisma.$transaction([
      prisma.schoolYear.update({
        where: { id: req.body.id },
        data: { isActive: req.body.isActive },
      }),
      prisma.schoolYear.updateMany({
        where: {
          id: {
            not: req.body.id,
          },
        },
        data: {
          isActive: req.body.isActive ? false : true,
        },
      }),
    ]);

    res
      .status(200)
      .send(
        `${activeSchoolYear.schoolYearFrom} -  ${activeSchoolYear.schoolYearTo} successfully activated`
      );
  } catch (err) {
    err.title = 'PATCH School Year Toggle Status';
    next(err);
  }
}

// Delete School Year
async function deleteSchoolYear(req, res, next) {
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

exports.getAllSchoolYear = getAllSchoolYear;
exports.addSchoolYear = addSchoolYear;
exports.schoolYearToggleStatus = schoolYearToggleStatus;
exports.deleteSchoolYear = deleteSchoolYear;
