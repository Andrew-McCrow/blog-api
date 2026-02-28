const { Router } = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/blogController");
const { verifyToken, requireAdmin } = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", verifyToken, requireAdmin, createPost);
router.put("/:id", verifyToken, requireAdmin, updatePost);
router.delete("/:id", verifyToken, requireAdmin, deletePost);

module.exports = router;
