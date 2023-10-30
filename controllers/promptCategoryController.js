const prisma = require("../services/prismaService");

// @desc Add a new PromptCategory
// @route POST /PromptCategories
// @access Private
const addPromptCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newPromptCategory = await prisma.promptCategory.create({
      data: {
        name,
      },
      select: {
        name: true,
      },
    });
    return res.status(201).json(newPromptCategory);
  } catch (error) {
    return next(error);
  }
};

// @desc Get All PromptCategories
// @route GET /PromptCategories
// @access Private
const getAllPromptCategories = async (req, res, next) => {
  try {
    const promptCategories = await prisma.promptCategory.findMany();
    res.json(promptCategories);
  } catch (error) {
    next(error);
  }
};

// @desc Get a PromptCategory by ID
// @route GET /PromptCategories/:id
// @access Private
const getPromptCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const promptCategory = await prisma.promptCategory.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!promptCategory) {
      const error = new Error("Prompt category not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(promptCategory);
  } catch (error) {
    next(error);
  }
};

// @desc Update a PromptCategory
// @route PUT /PromptCategories/:id
// @access Private
const updatePromptCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      throw new Error("Name is required");
    }

    const promptCategory = await prisma.promptCategory.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!promptCategory) {
      return res.status(404).json({ message: "PromptCategory not found" });
    }

    const updatedPromptCategory = await prisma.promptCategory.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    res.json(updatedPromptCategory);
  } catch (error) {
    next(error);
  }
};

// @desc Delete a PromptCategory
// @route POST /PromptCategories/1
// @access Private
const deletePromptCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const promptCategory = await prisma.promptCategory.findUnique({ where: { id } });
    if (!promptCategory) {
      return res.status(404).json({ message: `PromptCategory with ID ${id} not found.` });
    }
    await prisma.promptCategory.delete({ where: { id } });
    res.json({ message: `PromptCategory with ID ${id} has been deleted.` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPromptCategory,
  getAllPromptCategories,
  getPromptCategoryById,
  updatePromptCategory,
  deletePromptCategory,
};
