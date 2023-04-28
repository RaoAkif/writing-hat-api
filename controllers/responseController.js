const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Add a new Response
// @route POST /Responses
// @access Private
const addResponse = async (req, res, next) => {
  try {
    const { title, description, userId, promptId } = req.body;
    const newResponse = await prisma.response.create({
      data: {
        title,
        description,
        userId,
        promptId,
      },
      select: {
        title: true,
        description: true
      }
    })
    res.json(newResponse);
  } catch (error) {
    next(error);
  }
}

// @desc Get All Responses
// @route GET /Responses
// @access Private
const getAllResponses = async (req, res, next) => {
  try {
    const response = await prisma.response.findMany();
    res.json(response);
  } catch (error) {
    next(error)
  }
}

// @desc Get a Response
// @route GET /Responses
// @access Private
const getResponseById = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await prisma.response.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!response) {
      const error = new Error(`Response with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
    res.json(response)
  } catch (error) {
    next(error)
  }
}

// @desc Update a Response
// @route PUT /Responses/:id
// @access Private
const updateResponse = async (req, res, next) => {
  try {
    const { title, description, userId, promptId } = req.body;
    if (!title || !description || !userId || !promptId) {
      return res.status(400).json({ error: "Title, Description, userId, and promptId are required" });
    }

    const responseId = Number(req.params.id);
    if (!responseId) {
      return res.status(400).json({ error: "Invalid Response ID" });
    }

    const existingResponse = await prisma.response.findUnique({
      where: {
        id: responseId,
      },
    });

    if (!existingResponse) {
      return res.status(404).json({ error: "Response not found" });
    }

    const updatedResponse = await prisma.response.update({
      where: {
        id: responseId,
      },
      data: {
        title,
        description,
        userId,
        promptId,
      },
    });

    res.json(updatedResponse);
  } catch (error) {
    next(error);
  }
};

// @desc Delete a Response
// @route DELETE /Responses/:id
// @access Private
const deleteResponse = async (req, res, next) => {
  try {
    const responseId = Number(req.params.id);
    const response = await prisma.response.findUnique({
      where: {
        id: responseId,
      },
    });

    if (!response) {
      return res.status(404).json(`Response with ID ${responseId} not found`);
    }

    const deletedResponse = await prisma.response.delete({
      where: {
        id: responseId,
      },
    });

    if (!deletedResponse) {
      return res.status(404).json(`Response with ID ${responseId} not found`);
    }

    res.json(deletedResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addResponse,
  getAllResponses,
  getResponseById,
  updateResponse,
  deleteResponse
}
