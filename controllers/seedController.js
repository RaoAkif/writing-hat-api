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

const test = async (req, res, next) => {
  try {
    const { id } = req.body;
    const userSpecificResponses = await prisma.response.findMany({
      where: {
        userId: parseInt(id),
      },
      select: {
        promptId: true,
        // userId: true,
      },
    });

    const promptIds = userSpecificResponses.map((response) => response.promptId);

    const promptsWithUserResponses = await prisma.prompt.findMany({
      where: {
        id: {
          in: promptIds,
        },
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

    if (promptsWithUserResponses) {
      res.json(promptsWithUserResponses);
    } else {
      res.status(404).json({ error: "Prompt not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { seedPrompt, seedUsers, clearData, seedResponse, test };
