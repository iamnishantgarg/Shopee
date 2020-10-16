const router = require("express").Router();
const {
  authUser,
  getProfile,
  registerUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", authUser);
router.get("/profile", protect, getProfile);
router.post("/", registerUser);

module.exports = router;
