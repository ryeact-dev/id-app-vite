const { prisma } = require('../lib/utils/prismaClient');

const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

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
      },
    });
    res.status(200).send('User successfully added');
  } catch (err) {
    if (err.code === 'P2002')
      return res.status(400).send('Username already exists');
    err.tile = 'Adding User';
    next(err);
  }
}

// Login User
async function loginUser(req, res, next) {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!foundUser) return res.status(400).send('Username does not exist');

    console.log(foundUser);
    res.json();
  } catch (err) {
    err.tile = 'Loggin-in User';
    next(err);
  }
}

exports.addUser = addUser;
exports.loginUser = loginUser;
