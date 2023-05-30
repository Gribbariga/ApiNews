const Router = require("express");
const router = new Router();
const newsController = require("../controllers/newsController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", newsController.postNews);
router.get("/", newsController.getNews);
router.get("/add:id", newsController.getById);
router.post("/delete:id", newsController.deleteNews);

module.exports = router;
