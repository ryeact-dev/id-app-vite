const { prisma } = require('../utils/prismaClient');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

function verifyToken(req, res, next) {
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
