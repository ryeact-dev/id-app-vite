const { prisma } = require('../utils/prismaClient');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

function verifyToken(req, res, next) {
  // Show the IP address of the client
  //   console.log(req.ip);
  //  if (req.ip === '127.0.0.1')
  //     return res.status(400).send('Unauthorized Network');

  const token = req.cookies.umtcid_user;

  try {
    if (!token) return res.json(null);
    jwt.verify(token, jwtSecret, async (err, { id }) => {
      if (err) next(err);

      const userInfo = await prisma.user.findUnique({
        where: { id },
      });

      if (!userInfo) return res.json(null);
      req.user = userInfo;
      next();
    });
  } catch (err) {
    return res.status(500).send('Verifying User');
  }
}

exports.verifyToken = verifyToken;
