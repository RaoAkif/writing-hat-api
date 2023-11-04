const prisma = require("../services/prismaService");

const runTest = async (req, res, next) => {
  try {
    const id = 1;
    const prompt = await prisma.user.findUnique({
      // where: {
      //   id: parseInt(id),
      // },
      // select: {
      //   id: true,
      //   pseudonym: true,
      //   hat: true,
      //   _count: {
      //     select: {
      //       prompt: true,
      //       response: true,
      //     },
      //   },
      // },
      where: {
        id: Number(id),
      },
      include: {
        prompt: true,
        response: true,
      },
    });
    if (prompt) {
      res.json(prompt);
    } else {
      res.status(404).json({ error: "Prompt not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { runTest };
