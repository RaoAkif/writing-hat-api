const prisma = require("../services/prismaService");

const runTest = async (req, res, next) => {
  try {
    const id = 2;
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
        response: {
          select: {
            id: true,
            description: true,
            User: {
              select: {
                id: true,
                pseudonym: true,
                hat: true,
              },
            },
          },
        },
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
