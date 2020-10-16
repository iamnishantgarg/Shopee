const router = require("express").Router();
const { authUser, getProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", authUser);
router.get("/profile", protect, getProfile);

module.exports = router;
