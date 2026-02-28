const prisma = require("../utils/prisma");

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { idBlog: Number(req.params.id) },
      include: { comments: true },
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { blogTitle, blogPost, isPublished, idUser } = req.body;
    const post = await prisma.blogPost.create({
      data: { blogTitle, blogPost, isPublished: isPublished ?? false, idUser },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { blogTitle, blogPost, isPublished } = req.body;
    const data = {};
    if (blogTitle !== undefined) data.blogTitle = blogTitle;
    if (blogPost !== undefined) data.blogPost = blogPost;
    if (isPublished !== undefined) data.isPublished = isPublished;
    const post = await prisma.blogPost.update({
      where: { idBlog: Number(req.params.id) },
      data,
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { idBlog: Number(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
