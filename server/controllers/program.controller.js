const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getAllPrograms(req, res, next) {
  try {
    const allPrograms = await prisma.program.findMany({
      include: { department: true },
    });
    allPrograms.sort((a, b) => a.program.localeCompare(b.program));

    res.json(allPrograms);
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
        program: req.body.program,
      },
    });

    if (foundProgram !== null)
      return res.status(400).send('Program already exists');

    await prisma.program.create({
      data: {
        program: req.body.program,
        userId,
        departmentId: req.body.department,
      },
    });

    res.status(200).send(`${req.body.program} successfully added`);
  } catch (err) {
    err.title = 'POST Department';
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
        deletedProgram.program
      } successfully deleted by ${fullName} :: ${new Date().toDateString()}`
    );

    res.status(200).send(`${deletedProgram.program} successfully deleted`);
  } catch (err) {
    err.title = 'DELETE program';
    next(err);
  }
}

exports.getAllPrograms = getAllPrograms;
exports.addProgram = addProgram;
exports.deleteProgram = deleteProgram;
