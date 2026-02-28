const prisma = require("../utils/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      isAdmin: isAdmin ?? false,
    },
    select: { idUser: true, email: true, isAdmin: true },
  });

  res.status(201).json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { idUser: user.idUser, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({
    token,
    user: {
      idUser: user.idUser,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
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
  loginUser,
};
