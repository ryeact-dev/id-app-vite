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

// Get Current User
async function getCurrentUser(req, res, next) {
  const { password, isActive, createdAt, ...rest } = req.user;

  const activeSemster = await prisma.semester.findFirst({
    where: {
      isActive: true,
    },
    include: {
      schoolYear: true,
    },
  });

  const currentData = {
    userInfo: rest,
    activeSem: activeSemster,
  };

  res.json(currentData);
}

// Get All Users
async function getAllUsers(req, res, next) {
  const { fullname, page, limit } = req.query;

  try {
    let query = {
      skip: Number(page) * Number(limit),
      take: Number(limit),
      orderBy: {
        fullName: 'asc',
      },
    };

    if (fullname !== '') {
      query = {
        skip: Number(page) * Number(limit),
        take: Number(limit),
        orderBy: {
          fullName: 'asc',
        },
        where: {
          fullName: {
            contains: fullname,
            mode: 'insensitive',
          },
        },
      };
    }

    const [users, totalUsers] = await prisma.$transaction([
      prisma.user.findMany(query),
      prisma.user.count(query),
    ]);

    const paginatedUsers = users.map((user) => {
      const { password, createdAt, ...rest } = user;
      return rest;
    });

    const usersCount = Number(page + 1) * users.length;
    const hasMore = usersCount < totalUsers && users.length > 0;

    res.json({ paginatedUsers, usersCount, totalUsers, hasMore });
  } catch (err) {
    err.title = 'GET All Users';
    next(err);
  }
}

// Add User
async function addUser(req, res, next) {
  const defaultPassword = 'UMTC@77';
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

// Update User Password
async function updateUserPassword(req, res, next) {
  const { currentPassword, newPassword, userPassword, userId } = req.body;
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    const passOk = bcrypt.compareSync(currentPassword, foundUser.password);

    if (!passOk)
      return res.status(401).send('Current Password submitted is wrong');

    const hashedPassword = bcrypt.hashSync(newPassword, bcryptSalt);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.json();
  } catch (err) {
    err.title = 'PATCH Update User Password';
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

async function logoutUser(req, res, next) {
  try {
    res.clearCookie('umtcid_user');
    res.status(200).send('User logged out successfully.');
  } catch (err) {
    err.title = 'POST Logout User';
    next(err);
  }
}

exports.getCurrentUser = getCurrentUser;
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.toggleUserStatus = toggleUserStatus;
exports.loginUser = loginUser;
exports.updateUserPassword = updateUserPassword;
exports.deleteUser = deleteUser;
exports.logoutUser = logoutUser;
