const router = require("express").Router();
const {
  authUser,
  getProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUserById,
  updateUser,
  getUserById,
} = require("../controllers/userController");
const { protect, ensureAdmin } = require("../middleware/authMiddleware");

router.post("/login", authUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/", registerUser);

router.get("/", protect, ensureAdmin, getUsers);
router.delete("/:id", protect, ensureAdmin, deleteUserById);
router.put("/:id", protect, ensureAdmin, updateUser);
router.get("/:id", protect, ensureAdmin, getUserById);

module.exports = router;
