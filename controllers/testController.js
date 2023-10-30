const prisma = require("../services/prismaService");

const runTest = async (req, res, next) => {
  try {
    const response = await prisma.response.findMany();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { runTest };
