const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Register a new user
// @route POST /users
// @access Private
const registerUser = async (req, res, next) => {
  try {
    const { pseudonym, email, password, city, country, profileImage } = req.body;

    // Check if all required fields are present
    const requiredFields = [pseudonym, email, password, city, country, profileImage];
    if (requiredFields.some(field => !field)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if pseudonym or email already exist
    const duplicate = await prisma.user.findFirst({
      where: {
        OR: [
          { pseudonym },
          { email },
        ],
      },
    });
    if (duplicate) {
      return res.status(409).json({ message: 'A user with this pseudonym or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        pseudonym,
        email,
        password: hashedPassword,
        city,
        country,
        profileImage,
      },
      select: {
        pseudonym: true,
        email: true,
      },
    });

    return res.status(201).json({ message: `The new user ${newUser.pseudonym} has been created` });
  } catch (error) {
    next(error);
  }
};

// @desc Get All Users
// @route GET /users
// @access Private
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        prompt: true,
        response: true
      }
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};


// @desc Get a user by id
// @route GET /users/:id
// @access Private
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        prompt: true,
        response: true
      }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc Update a user
// @route PUT /users/:id
// @access Private
const updateUser = async (req, res, next) => {
  try {
    const { pseudonym, email, password, city, country, profileImage } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        pseudonym,
        email,
        password: hashedPassword,
        city,
        country,
        profileImage,
      },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};


// @desc Delete a user
// @route DELETE /users/:id
// @access Private
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    if (!deletedUser) {
      return res.status(404).json({ message: `User with ID ${req.params.id} not found` })
    }
    res.json({ message: `User with ID ${req.params.id} has been deleted` })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
