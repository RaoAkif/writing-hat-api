const { usersData, responseData, promptData } = require("../seedData");
const prisma = require("../services/prismaService");

const clearData = async (req, res, next) => {
  try {
    const deleteAllResponse = await prisma.response.deleteMany({});
    const deleteAllPrompts = await prisma.prompt.deleteMany({});
    const deleteAllUsers = await prisma.user.deleteMany({});
    res.json("data cleared");
  } catch (error) {
    next(error);
  }
};

const seedPrompt = async (req, res, next) => {
  try {
    const prompt = await prisma.prompt.createMany({
      data: promptData,
    });
    if (prompt) {
      res.json(prompt);
    } else {
      res.status(404).json({ error: "something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

const seedResponse = async (req, res, next) => {
  try {
    const prompt = await prisma.response.createMany({
      data: responseData,
    });
    if (prompt) {
      res.json(prompt);
    } else {
      res.status(404).json({ error: "something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

const seedUsers = async (req, res, next) => {
  try {
    const user = await prisma.User.createMany({
      data: usersData,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "something went wrong" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { seedPrompt, seedUsers, clearData, seedResponse };
