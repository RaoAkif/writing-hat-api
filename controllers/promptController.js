const prisma = require("../services/prismaService");

// @desc Add a new Prompt
// @route POST /Prompts
// @access Private
const addPrompt = async (req, res, next) => {
  const { description, promptCategoryId, userId, title } = req.body;
  try {
    const newPrompt = await prisma.prompt.create({
      data: {
        title,
        description,
        promptCategoryId,
        userId,
      },
      select: {
        title: true,
      },
    });
    res.json(newPrompt);
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "A prompt with the same description already exists" });
    } else {
      next(error);
    }
  }
};

// @desc Get All Prompts
// @route GET /Prompts
// @access Private
const getAllPrompts = async (req, res, next) => {
  try {
    const prompts = await prisma.prompt.findMany();
    res.json(prompts);
  } catch (error) {
    next(error);
  }
};

// @desc Get a Prompt
// @route GET /Prompts/:id
// @access Private
const getPromptById = async (req, res, next) => {
  try {
    const { id } = req.params;
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
const getPromptsByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prompts = await prisma.prompt.findMany({
      where: {
        userId: parseInt(id),
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
    if (prompts) {
      res.json(prompts);
    } else {
      res.status(404).json({ error: "Prompts not found" });
    }
  } catch (error) {
    next(error);
  }
};

const getPromptsByResponseId = async (req, res, next) => {
  try {
    const { id } = req.params;
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

// @desc Update a Prompt
// @route PUT /Prompts/:id
// @access Private
const updatePrompt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, promptCategoryId, userId } = req.body;

    const prompt = await prisma.prompt.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    const updatedPrompt = await prisma.prompt.update({
      where: {
        id: Number(id),
      },
      data: {
        description,
        promptCategoryId,
        userId,
      },
    });
    res.json(updatedPrompt);
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("description")) {
      res.status(400).json({ error: "A prompt with the same description already exists" });
    } else {
      next(error);
    }
  }
};

// @desc Delete a Prompt
// @route DELETE /Prompts/1
// @access Private
const deletePrompt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prompt = await prisma.prompt.findUnique({
      where: { id: Number(id) },
    });

    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    await prisma.prompt.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Prompt deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPrompt,
  getAllPrompts,
  getPromptById,
  getPromptsByUserId,
  getPromptsByResponseId,
  updatePrompt,
  deletePrompt,
};
