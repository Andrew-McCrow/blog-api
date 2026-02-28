const { Router } = require("express");
const verifyToken = require("../middlewares/authMiddleware");
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
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

module.exports = router;
