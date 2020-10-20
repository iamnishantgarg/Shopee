const router = require("express").Router();
const {
  authUser,
  getProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUserById,
} = require("../controllers/userController");
const { protect, ensureAdmin } = require("../middleware/authMiddleware");

router.get("/", protect, ensureAdmin, getUsers);
router.delete("/:id", protect, ensureAdmin, deleteUserById);

router.post("/login", authUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/", registerUser);

module.exports = router;
