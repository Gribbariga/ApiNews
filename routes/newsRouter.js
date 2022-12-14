const Router = require("express");
const router = new Router();
const newsController = require("../controllers/newsController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), newsController.postNews);
router.get("/", newsController.getNews);
router.get("/:id", newsController.getById);

module.exports = router;
