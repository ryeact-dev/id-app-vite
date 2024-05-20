const { prisma } = require('../lib/utils/prismaClient');

const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

const currentDate = new Date();
const expirationDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  currentDate.getDate()
);

// Get All Users
async function getPaginatedPrintedIds(req, res, next) {
  const { searchQuery, page, limit } = req.query;

  try {
    const [students, totalStudents] = await prisma.$transaction([
      prisma.printing.findMany({
        where: {
          studentIdNumber: { contains: searchQuery },
        },

        skip: Number(page) * Number(limit),
        take: Number(limit),
        // Include the program name, user name, and updated user name
        include: {
          student: {
            include: {
              // Connect to student program
              program: {
                include: {
                  // Connect the program department
                  department: {
                    select: {
                      departmentName: true,
                    },
                  },
                },
              },
            },
          },
          printedBy: {
            select: {
              fullName: true,
            },
          },
          releasedBy: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          releasedDate: {
            sort: 'desc',
            nulls: 'first',
          },
        },
      }),
      prisma.student.count(),
    ]);

    const hasMore = students.length === Number(limit);

    const studentsCount = !hasMore
      ? students.length
      : Number(page) + Number(limit);

    res.json({
      paginatedStudents: students,
      studentsCount,
      totalStudents,
      hasMore,
    });
  } catch (err) {
    err.title = 'GET Paginated of Printed Ids';
    next(err);
  }
}

// Add User
async function printId(req, res, next) {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (foundUser !== null) return res.status(400).send('Email already exists');

    const hashedPassword = bcrypt.hashSync(defaultPassword, bcryptSalt);
    await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
        fullName: req.body.fullName.toLowerCase(),
        email: req.body.email.toLowerCase(),
      },
    });
    res.status(200).send('User successfully added');
  } catch (err) {
    if (err.code === 'P2002')
      return res.status(400).send('Username already exists');
    err.title = 'POST User';
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
    err.title = 'PATCH/PUT User';
    next(err);
  }
}

// Toggle User Status
async function toggleUserStatus(req, res, next) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        isActive: req.body.isActive,
      },
    });
    res
      .status(200)
      .send(`${updatedUser.fullName}'s status successfully updated`);
  } catch (err) {
    err.title = 'PATCH/PUT User Status';
    next(err);
  }
}

// Login User
async function loginUser(req, res, next) {
  const { password, username } = req.body;

  try {
    const foundUser = await prisma.user.findFirst({
      where: { username },
    });

    if (foundUser === null) return res.status(404).send('Username not found');

    if (foundUser.isActive === false)
      return res.status(404).send('This account was deactivated');

    const passOk = bcrypt.compareSync(password, foundUser.password);

    if (passOk) {
      const token = jwt.sign({ id: foundUser.id }, jwtSecret);

      res.cookie('umtcid_user', token, {
        maxAge: expirationDate,
        httpOnly: true,
      });
      res.json();
    } else return res.status(401).send('Wrong password');
  } catch (err) {
    err.title = 'POST Loggin-in User';
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
    err.title = 'DELETE User';
    next(err);
  }
}

exports.getPaginatedPrintedIds = getPaginatedPrintedIds;
exports.printId = printId;
exports.updateUser = updateUser;
exports.toggleUserStatus = toggleUserStatus;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
