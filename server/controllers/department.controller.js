const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getAllDepartments(req, res, next) {
  try {
    const allDepartments = await prisma.department.findMany();
    allDepartments.sort((a, b) =>
      a.departmentName.localeCompare(b.departmentName)
    );

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
        departmentName: req.body.departmentName,
      },
    });

    if (foundDepartment !== null)
      return res.status(400).send('Department already exists');

    await prisma.department.create({
      data: {
        departmentName: req.body.departmentName,
        userId,
      },
    });

    res.status(200).send(`${req.body.departmentName} successfully added`);
  } catch (err) {
    err.title = 'POST Department';
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
        AND: [
          { departmentName: req.body.departmentName, id: { not: req.body.id } },
        ],
      },
    });

    if (foundDepartment !== null)
      return res.status(400).send('Department already exists');

    await prisma.department.update({
      where: {
        id: req.body.id,
      },
      data: {
        departmentName: req.body.departmentName,
      },
    });

    res.status(200).send(`${req.body.departmentName} successfully updated`);
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
        deletedDepartment.departmentName
      } successfully deleted by ${fullName} :: ${new Date().toDateString()}`
    );

    res
      .status(200)
      .send(`${deletedDepartment.departmentName} successfully deleted`);
  } catch (err) {
    if (err.code === 'P2003') {
      return res.status(400).send('Please remove the connected programs first');
    }
    err.title = 'DELETE department';
    next(err);
  }
}

exports.getAllDepartments = getAllDepartments;
exports.addDepartment = addDepartment;
exports.updateDepartment = updateDepartment;
exports.deleteDepartment = deleteDepartment;
