const prisma = require("../utils/prisma");

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: { idUser: true, email: true, isAdmin: true },
  });
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { idUser: Number(req.params.id) },
    select: { idUser: true, email: true, isAdmin: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

const createUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const user = await prisma.user.create({
    data: { email, password, isAdmin: isAdmin ?? false },
    select: { idUser: true, email: true, isAdmin: true },
  });
  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const user = await prisma.user.update({
    where: { idUser: Number(req.params.id) },
    data: { email, password, isAdmin },
    select: { idUser: true, email: true, isAdmin: true },
  });
  res.json(user);
};

const deleteUser = async (req, res) => {
  await prisma.user.delete({ where: { idUser: Number(req.params.id) } });
  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
