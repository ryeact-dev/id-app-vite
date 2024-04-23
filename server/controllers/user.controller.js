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
  const { password, username } = req.body;

  try {
    const foundUser = await prisma.user.findFirst({
      where: { username },
    });

    if (foundUser === null) return res.status(404).send('Username not found');

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
    err.tile = 'Loggin-in User';
    next(err);
  }
}

exports.addUser = addUser;
exports.loginUser = loginUser;
