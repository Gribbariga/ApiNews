const Router = require("express");
const router = new Router();
const commentsController = require("../controllers/commentsController");

router.post("/", commentsController.postComments);
router.get("/", commentsController.getComments);

module.exports = router;
