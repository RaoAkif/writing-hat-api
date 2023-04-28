const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Add a new Prompt
// @route POST /Prompts
// @access Private
const addPrompt = async (req, res, next) => {
  const { title, description, promptCategoryId, userId } = req.body;
  try {
    const newPrompt = await prisma.prompt.create({
      data: {
        title,
        description,
        promptCategoryId,
        userId
      },
      select: {
        title: true,
        description: true
      }
    })
    res.json(newPrompt);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'A prompt with the same description already exists' });
    } else {
      next(error);
    }
  }
}

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
}

// @desc Get a Prompt
// @route GET /Prompts/:id
// @access Private
const getPromptById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (prompt) {
      res.json(prompt);
    } else {
      res.status(404).json({ error: 'Prompt not found' });
    }
  } catch (error) {
    next(error);
  }
}

// @desc Update a Prompt
// @route PUT /Prompts/:id
// @access Private
const updatePrompt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, promptCategoryId, userId } = req.body;

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
        title,
        description,
        promptCategoryId,
        userId,
      },
    });
    res.json(updatedPrompt);
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('description')) {
      res.status(400).json({ error: 'A prompt with the same description already exists' });
    } else {
      next(error);
    }
  }
}

// @desc Delete a Prompt
// @route DELETE /Prompts/1
// @access Private
const deletePrompt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prompt = await prisma.prompt.findUnique({
      where: { id: Number(id) },
    });
    console.log(prompt)
    
    if (!prompt) {
      console.log("Prompt Not Found BLOCK", prompt)
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
  updatePrompt,
  deletePrompt
}
