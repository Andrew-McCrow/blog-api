const prisma = require("../utils/prisma");

const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { idComment: Number(req.params.id) },
    });
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { commentPost, idUser, idBlog } = req.body;
    const comment = await prisma.comment.create({
      data: { commentPost, idUser, idBlog },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentPost } = req.body;
    const comment = await prisma.comment.update({
      where: { idComment: Number(req.params.id) },
      data: { commentPost },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    await prisma.comment.delete({
      where: { idComment: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
