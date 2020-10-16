const router = require("express").Router();
const {
  authUser,
  getProfile,
  registerUser,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", authUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/", registerUser);

module.exports = router;
