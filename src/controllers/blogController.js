const prisma = require("../utils/prisma");

const getAllPosts = async (req, res) => {
  const posts = await prisma.blogPost.findMany();
  res.json(posts);
};

const getPostById = async (req, res) => {
  const post = await prisma.blogPost.findUnique({
    where: { idBlog: Number(req.params.id) },
    include: { comments: true },
  });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

const createPost = async (req, res) => {
  const { blogTitle, blogPost, isPublished, idUser } = req.body;
  const post = await prisma.blogPost.create({
    data: { blogTitle, blogPost, isPublished: isPublished ?? false, idUser },
  });
  res.status(201).json(post);
};

const updatePost = async (req, res) => {
  const { blogTitle, blogPost, isPublished } = req.body;
  const post = await prisma.blogPost.update({
    where: { idBlog: Number(req.params.id) },
    data: { blogTitle, blogPost, isPublished },
  });
  res.json(post);
};

const deletePost = async (req, res) => {
  await prisma.blogPost.delete({ where: { idBlog: Number(req.params.id) } });
  res.status(204).send();
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
