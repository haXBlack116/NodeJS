const express = require("express")
const { optionalAuth, ensureAuth, ensureAdmin } = require("./middlewares/auth-middleware")
const authController = require("./controllers/auth-controller")
const welcomeController = require("./controllers/welcome-controller")
const usersController = require("./controllers/users-controller")

const router = express.Router()

// Rotas POST
router.post("/api/auth/register", authController.register)
router.post("/api/auth/login", authController.login);
router.post("/api/users", ensureAuth, ensureAdmin, usersController.save)

// Rotas GET 
router.get("/api/welcome", optionalAuth, welcomeController.welcome)
router.get("/api/users", ensureAuth, ensureAdmin, usersController.index)
router.get("/api/users/:id", ensureAuth, ensureAdmin, usersController.show)

// Rotas DELETE
router.delete("/api/users/:id", ensureAuth, ensureAdmin, usersController.delete)

module.exports = router;
