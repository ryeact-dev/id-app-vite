const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getAllDepartments(req, res, next) {
  try {
    const allDepartments = await prisma.department.findMany();
    allDepartments.sort((a, b) => a.department.localeCompare(b.department));

    res.json(allDepartments);
  } catch (err) {
    err.title = 'GET all departments';
    next(err);
  }
}

// Add Department
async function addDepartment(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const foundDepartment = await prisma.department.findFirst({
      where: {
        department: req.body.department,
      },
    });

    if (foundDepartment !== null)
      return res.status(400).send('Department already exists');

    await prisma.department.create({
      data: {
        department: req.body.department,
        userId,
      },
    });

    res.status(200).send(`${req.body.department} successfully added`);
  } catch (err) {
    err.title = 'POST Department';
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

exports.getAllDepartments = getAllDepartments;
exports.addDepartment = addDepartment;
exports.deleteDepartment = deleteDepartment;
