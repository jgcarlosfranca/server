const { register, login } = require("../controllers/AuthController")
const { checkUser } = require("../middlewares/authMiddleware")

const router = require("express").Router();

router.post("/checkUser", checkUser)
router.post("/register", register)
router.post("/login", login)

module.exports = router