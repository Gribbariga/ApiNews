const { News } = require("../models/models");
const ApiError = require("../error/ApiError");

const uuid = require("uuid");
const path = require("path");

class newsController {
  async getNews(req, res) {
    console.log("?/?");
    try {
      const { id } = req.query;
      const page = req.query.page || 1;
      const limit = 40;
      let offset = page * limit - limit;
      let news;
      if (!id) {
        news = await News.findAndCountAll({ offset, limit });
      }

      return res.json(news.rows);
    } catch (e) {
      res.json(e.message);
    }
  }

  async postNews(req, res, next) {
    try {
      const { text, title, img } = req.body;
      let fileName = uuid.v4() + ".jpg";
      // img.mv(path.resolve(__dirname, "..", "static", fileName));
      const date = new Date();
      const news = await News.create({
        img: img,
        text,
        date,
        title: title,
      });
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const news = await News.findOne({
        where: { id },
      });
      const viewingUp = news.viewing + 1;
      News.update({ viewing: viewingUp }, { where: { id } });
      const data = { ...news, viewing: viewingUp };
      return res.json(data.dataValues);
    } catch (e) {
      res.json(e.message);
    }
  }
  async deleteNews(req, res) {
    try {
      const { id } = req.params;
      const news = await News.destroy({
        where: { id },
      });
      News.update({ viewing: viewingUp }, { where: { id } });
      return res.json("123");
    } catch (e) {
      res.json(e.message);
    }
    // try {
    //   console.log(req.query);
    //   const { id } = req.query;
    //   console.log("id", id);
    //   News.destroy({
    //     where: { id },
    //   });
    //   console.log("?");
    //   return res.json("success");
    // } catch (e) {
    //   console.log("!");
    //   res.json(e.message);
    // }
  }
}

module.exports = new newsController();
