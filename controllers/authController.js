const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Login a new user
// @route POST /auth/
// @access Public
const login = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        pseudonym: req.body.pseudonym
      }
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "pseudonym": user.pseudonym
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '7d' }
    )

    const refreshToken = jwt.sign(
      { "pseudonym": user.pseudonym },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '28d' }
    )

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ accessToken })
  } catch (error) {
    next(error);
  }
}

// @desc Refresh access token
// @route POST /auth/refresh
// @access Public
const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.jwt

    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await prisma.user.findUnique({
      where: {
        pseudonym: decoded.pseudonym
      }
    })

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "pseudonym": user.pseudonym
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    )

    res.json({ accessToken })
  } catch (error) {
    next(error);
  }
}

// @desc Logout user and clear cookies
// @route POST /auth/logout
// @access Public
const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  res.status(204).json({ message: 'Logout successful' })
}

module.exports = {
  login,
  refresh,
  logout
}
