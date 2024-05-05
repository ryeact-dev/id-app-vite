const { prisma } = require('../lib/utils/prismaClient');

// Get All Users
async function getAllDepartments(req, res, next) {
  try {
    const allDepartments = await prisma.department.findMany();
    res.json(allDepartments);
  } catch (err) {
    err.tile = 'GET all departments';
    next(err);
  }
}

// Add Department
async function addDepartment(req, res, next) {
  const { role: userRole, id: userId } = req.user;

  if (userRole !== 'Admin' && userRole !== 'User')
    return res.status(400).send('Unauthorized');

  try {
    const foundDepartment = await prisma.user.findFirst({
      where: {
        email: req.body.department,
      },
    });

    if (foundDepartment !== null)
      return res.status(400).send('Department already exists');

    await prisma.department.create({
      data: {
        departmentName: req.body.department,
        userId,
      },
    });

    res.status(200).send(`${req.body.department} successfully added`);
  } catch (err) {
    err.tile = 'POST Department';
    next(err);
  }
}

// Update User
async function updateUser(req, res, next) {
  const { fullName } = req.user;
  try {
    const foundUserByUsername = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (foundUserByUsername !== null) {
      if (foundUserByUsername.id !== req.body.id)
        return res.status(400).send('Username already exists');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: req.body,
    });

    console.log(
      `${
        updatedUser.fullName
      }'s profile successfully updated by ${fullName} :: ${new Date().toDateString()}`
    );

    res
      .status(200)
      .send(`${updatedUser.fullName}'s profile successfully updated`);
  } catch (err) {
    err.tile = 'Updating User';
    next(err);
  }
}

// Delete User
async function deleteUser(req, res, next) {
  const { fullName } = req.user;

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    console.log(
      `${
        deletedUser.fullName
      }'s profile successfully deleted by ${fullName} :: ${new Date().toDateString()}`
    );

    res.status(200).send(`${deletedUser.fullName}'s data successfully deleted`);
  } catch (err) {
    err.tile = 'Toggling User Status';
    next(err);
  }
}

exports.getAllDepartments = getAllDepartments;
exports.addDepartment = addDepartment;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
