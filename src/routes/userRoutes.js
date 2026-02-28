const { Router } = require("express");
const { verifyToken, requireAdmin } = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const router = Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken, requireAdmin, createUser);
router.put("/:id", verifyToken, requireAdmin, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/login", loginUser);

module.exports = router;
