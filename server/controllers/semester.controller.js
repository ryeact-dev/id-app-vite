const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getSemesterDates(req, res, next) {
  try {
    const foundSemesterDates = await prisma.$transaction(async (tx) => {
      const activeSchoolYear = await tx.schoolYear.findFirst({
        where: {
          isActive: true,
        },
      });

      const semesterDates = await tx.semester.findMany({
        where: {
          schoolYearId: activeSchoolYear.id,
        },
        orderBy: {
          semestralDateStart: 'asc',
        },
      });

      return semesterDates;
    });

    res.json(foundSemesterDates);
  } catch (err) {
    err.title = 'GET Semester Dates';
    next(err);
  }
}

// Add Department
async function addSemesterDates(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const { schoolYearId, ...rest } = req.body;

    const foundSemester = await prisma.semester.findFirst({
      where: {
        AND: [{ semester: req.body.semester }, { schoolYearId }],
      },
    });

    if (foundSemester !== null)
      return res.status(400).send(`${req.body.semester} already exists`);

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

// Update Semester Dates
async function updateSemesterDates(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    await prisma.semester.update({
      where: {
        id: req.body.id,
      },
      data: req.body,
    });

    res.status(200).send(`${req.body.semester} successfully updated`);
  } catch (err) {
    err.title = 'POST Semester Dates';
    next(err);
  }
}

async function toggleSemesterDates(req, res, next) {
  try {
    const [activeSemester, inActiveSemester] = await prisma.$transaction([
      prisma.semester.update({
        where: { id: req.body.id },
        data: { isActive: req.body.isActive },
      }),
      prisma.semester.updateMany({
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

    res.status(200).send(`${activeSemester.semester} - successfully activated`);
  } catch (err) {
    (err.title = 'PATCH Toggle Semester Dates'), next(err);
  }
}

exports.getSemesterDates = getSemesterDates;
exports.addSemesterDates = addSemesterDates;
exports.updateSemesterDates = updateSemesterDates;
exports.toggleSemesterDates = toggleSemesterDates;
