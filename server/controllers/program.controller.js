const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getAllPrograms(req, res, next) {
  try {
    const allPrograms = await prisma.program.findMany({
      include: { department: true },
    });
    allPrograms.sort((a, b) => a.programName.localeCompare(b.programName));

    const listOfPrograms = allPrograms.map((program) => {
      return {
        id: program.id,
        departmentId: program.departmentId,
        programName: program.programName,
        departmentName: program.department?.departmentName,
        userId: program.userId,
      };
    });

    res.json(listOfPrograms);
  } catch (err) {
    err.title = 'GET all programs';
    next(err);
  }
}

// Add Department
async function addProgram(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const foundProgram = await prisma.program.findFirst({
      where: {
        programName: req.body.programName,
      },
    });

    if (foundProgram !== null)
      return res.status(400).send('Program already exists');

    await prisma.program.create({
      data: {
        programName: req.body.programName,
        userId,
        departmentId: req.body.departmentId,
      },
    });

    res.status(200).send(`${req.body.programName} successfully added`);
  } catch (err) {
    err.title = 'POST Department';
    next(err);
  }
}

// Update Department
async function updateProgram(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const foundProgram = await prisma.program.findFirst({
      where: {
        AND: [{ programName: req.body.programName }, { id: req.body.id }],
      },
    });

    if (foundProgram !== null)
      return res.status(400).send('Program already exists');

    await prisma.program.update({
      where: {
        id: req.body.id,
      },
      data: {
        programName: req.body.programName,
        departmentId: req.body.departmentId,
      },
    });

    res.status(200).send(`${req.body.programName} successfully added`);
  } catch (err) {
    err.title = 'PATCH Program';
    next(err);
  }
}

// Delete Department
async function deleteProgram(req, res, next) {
  const { fullName } = req.user;

  try {
    const deletedProgram = await prisma.program.delete({
      where: {
        id: req.params.id,
      },
    });

    console.log(
      `${
        deletedProgram.programName
      } successfully deleted by ${fullName} :: ${new Date().toDateString()}`
    );

    res.status(200).send(`${deletedProgram.programName} successfully deleted`);
  } catch (err) {
    err.title = 'DELETE program';
    next(err);
  }
}

exports.getAllPrograms = getAllPrograms;
exports.addProgram = addProgram;
exports.updateProgram = updateProgram;
exports.deleteProgram = deleteProgram;
